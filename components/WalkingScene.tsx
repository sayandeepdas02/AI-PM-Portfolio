"use client";

import { useRef, type ReactNode } from "react";
import {
    motion,
    useAnimationFrame,
    useInView,
    useMotionValue,
    useReducedMotion,
    useTransform,
    type MotionValue,
} from "framer-motion";

// Scene is drawn on a 320×320 canvas; background layers tile every W px.
const W = 320;

// ── Walk cycle ─────────────────────────────────────────────────────────
const STRIDE_MS = 1150; // one full cycle = two steps
const LEG = 56; // hip → ankle, in scene px
const SWING = 20; // max thigh swing, degrees
const SCALE = 1.15; // character is drawn at 1× and scaled up around the feet
const FEET = { x: 153, y: 294 };
// Ground scrolls at the speed a planted foot travels, so the feet don't skate
const GROUND_SPEED = (SCALE * 2 * LEG * Math.sin((SWING * Math.PI) / 180)) / (STRIDE_MS / 2);
// Two full strides in: mid-stride pose with the thought-bubble chart drawn. Used as the still frame for reduced motion.
const START_MS = STRIDE_MS * 2;

const HIP = { x: 150, y: 232 };
const KNEE_Y = 263;

/** Rotate an SVG group around a point given in scene coordinates. */
const pivot = (x: number, y: number) =>
    ({ originX: `${x}px`, originY: `${y}px`, transformBox: "view-box" }) as const;

const easeOutCubic = (x: number) => 1 - (1 - x) ** 3;

// ── Palette ────────────────────────────────────────────────────────────
const C = {
    skyTop: "#76B6E4",
    skyMid: "#B9DDEE",
    skyWarm: "#F7DCB2",
    skyHorizon: "#F4BF8F",
    sun: "#FFE6A6",
    sunCore: "#FFF5D8",
    cloud: "#FFFFFF",
    cloudShade: "#E4EEF6",
    buildingFar: "#C9D2E8",
    buildingNear: "#9FAECD",
    window: "#BCC8E0",
    windowLit: "#FBE3A6",
    hedge: "#7FA25F",
    hedgeDark: "#668B4C",
    trunk: "#6E4C3A",
    leafDark: "#3F6E43",
    leaf: "#5A9150",
    leafLight: "#74AB5F",
    blossom: "#E4553A",
    blossomLight: "#F28C4A",
    lamp: "#3B4656",
    lampGlow: "#FFE7A8",
    sidewalk: "#E7C89C",
    sidewalkShade: "#D8B586",
    joint: "#D2AE80",
    curb: "#F3DFBE",
    road: "#8B909B",
    roadDash: "#E9E4DA",
    skin: "#C98E6B",
    skinShade: "#B67A58",
    hair: "#1E1A19",
    shirt: "#7A2433",
    shirtLight: "#8B2C3C",
    shirtDark: "#5E1B27",
    jeans: "#3D5F8F",
    jeansDark: "#2C4467",
    shoe: "#F6F3EC",
    shoeDark: "#DCD6CC",
    sole: "#BDB6AA",
    pack: "#5B7A62",
    packDark: "#4A6651",
    strap: "#3E5444",
    frames: "#ECE6DD",
    cup: "#F4EFE7",
    cupBand: "#B9793F",
    chart: "#2F8F5B",
};

// ── Static scenery data ────────────────────────────────────────────────
// [x, top, width] — each row spans 0..W exactly so it tiles seamlessly
const FAR_BUILDINGS = [
    [0, 198, 22], [22, 186, 18], [40, 206, 26], [66, 178, 16], [82, 200, 24], [106, 190, 20],
    [126, 208, 30], [156, 184, 18], [174, 198, 22], [196, 182, 16], [212, 204, 28], [240, 192, 20],
    [260, 174, 14], [274, 200, 24], [298, 190, 22],
] as const;
const NEAR_BUILDINGS = [
    [4, 214, 28], [36, 202, 20], [60, 220, 32], [150, 212, 26], [180, 224, 18], [206, 196, 24],
    [234, 216, 30], [270, 206, 22], [296, 218, 20],
] as const;
const NEAR_BASE = 242;

const BLOSSOMS = [
    [-24, 176], [-16, 168], [-6, 178], [4, 164], [12, 172], [20, 180], [26, 187],
    [-18, 188], [2, 186], [14, 191], [-29, 186], [8, 178], [-10, 162], [-2, 170],
] as const;

const PETAL_X = [130, 190, 250, 305];

// ── Pieces ─────────────────────────────────────────────────────────────

/** Renders children twice, side by side, and scrolls them left for an endless loop. */
function Loop({ x, children }: { x: MotionValue<number>; children: ReactNode }) {
    return (
        <motion.g style={{ x }}>
            {children}
            <g transform={`translate(${W} 0)`}>{children}</g>
        </motion.g>
    );
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
    return (
        <g transform={`translate(${x} ${y}) scale(${s})`}>
            <ellipse cx="2" cy="10" rx="27" ry="7" fill={C.cloudShade} />
            <circle cx="-13" cy="4" r="11" fill={C.cloud} />
            <circle cx="2" cy="-3" r="15" fill={C.cloud} />
            <circle cx="17" cy="4" r="10" fill={C.cloud} />
            <ellipse cx="2" cy="7" rx="26" ry="6" fill={C.cloud} />
        </g>
    );
}

function Skyline() {
    return (
        <>
            {FAR_BUILDINGS.map(([x, top, w]) => (
                <rect key={`f${x}`} x={x} y={top} width={w} height={240 - top} fill={C.buildingFar} />
            ))}
        </>
    );
}

function NearSkyline() {
    return (
        <g>
            {NEAR_BUILDINGS.map(([x, top, w], i) => (
                <g key={`n${x}`}>
                    <rect x={x} y={top} width={w} height={NEAR_BASE - top} fill={C.buildingNear} />
                    {Array.from({ length: Math.floor((NEAR_BASE - top - 8) / 7) }).flatMap((_, row) =>
                        Array.from({ length: Math.floor((w - 4) / 6) }).map((__, col) => (
                            <rect
                                key={`${row}-${col}`}
                                x={x + 4 + col * 6}
                                y={top + 5 + row * 7}
                                width={2.5}
                                height={3}
                                fill={(row + col + i) % 5 === 0 ? C.windowLit : C.window}
                            />
                        ))
                    )}
                </g>
            ))}
            {/* A domed civic building — a quiet nod to Bengaluru's Vidhana Soudha */}
            <g fill={C.buildingNear}>
                <rect x="100" y="216" width="46" height={NEAR_BASE - 216} />
                <rect x="96" y="213" width="54" height="4" />
                <rect x="114" y="206" width="18" height="8" />
                <path d="M112 207 a11 11 0 0 1 22 0 z" />
                <rect x="122.4" y="190" width="1.2" height="7" />
                <circle cx="123" cy="190" r="1.6" />
            </g>
            {[104, 110, 116, 122, 128, 134, 140].map((x) => (
                <rect key={x} x={x} y="220" width="2" height="18" fill={C.window} />
            ))}
        </g>
    );
}

function Gulmohar({ cx }: { cx: number }) {
    return (
        <g>
            <path
                d={`M${cx - 3.5} 256 C${cx - 3} 230 ${cx - 2} 214 ${cx - 1} 198 L${cx + 1.5} 198 C${cx + 2.5} 214 ${cx + 3} 232 ${cx + 3.5} 256 Z`}
                fill={C.trunk}
            />
            <path d={`M${cx} 214 Q${cx - 10} 204 ${cx - 18} 196 M${cx} 208 Q${cx + 10} 198 ${cx + 17} 192`} stroke={C.trunk} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <g fill={C.leafDark}>
                <circle cx={cx - 20} cy="190" r="15" />
                <circle cx={cx} cy="192" r="18" />
                <circle cx={cx + 20} cy="190" r="15" />
            </g>
            <g fill={C.leaf}>
                <circle cx={cx - 22} cy="182" r="16" />
                <circle cx={cx - 4} cy="174" r="20" />
                <circle cx={cx + 16} cy="178" r="18" />
                <circle cx={cx + 26} cy="188" r="11" />
            </g>
            <g fill={C.leafLight}>
                <circle cx={cx - 12} cy="168" r="11" />
                <circle cx={cx + 8} cy="165" r="12" />
                <circle cx={cx - 27} cy="178" r="7" />
            </g>
            {BLOSSOMS.map(([dx, y], i) => (
                <circle key={i} cx={cx + dx} cy={y} r={i % 3 === 0 ? 3.2 : 2.5} fill={i % 2 ? C.blossom : C.blossomLight} />
            ))}
        </g>
    );
}

function StreetLamp({ x }: { x: number }) {
    return (
        <g>
            <circle cx={x + 12} cy="183" r="7" fill={C.lampGlow} opacity="0.5" />
            <path d={`M${x} 257 V184 q0 -6 8 -6 h3`} stroke={C.lamp} strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d={`M${x + 7.5} 177 h9 l-1.6 4.4 h-5.8 z`} fill={C.lamp} />
            <circle cx={x + 12} cy="182.6" r="1.7" fill="#FFF6DA" />
        </g>
    );
}

function Hedge() {
    return (
        <g>
            <rect x="0" y="246" width={W} height="12" fill={C.hedgeDark} />
            {Array.from({ length: W / 12 }).map((_, i) => (
                <circle key={i} cx={6 + i * 12} cy="247" r="7.5" fill={i % 2 ? C.hedge : C.hedgeDark} />
            ))}
            <rect x="0" y="247" width={W} height="9" fill={C.hedge} />
        </g>
    );
}

function Streetscape() {
    return (
        <>
            <Hedge />
            <Gulmohar cx={46} />
            <StreetLamp x={128} />
            <Gulmohar cx={214} />
            <StreetLamp x={290} />
        </>
    );
}

function GroundMarks() {
    return (
        <>
            {Array.from({ length: W / 32 }).map((_, i) => (
                <path key={`j${i}`} d={`M${i * 32 + 6} 259 L${i * 32} 305`} stroke={C.joint} strokeWidth="1.2" />
            ))}
            {Array.from({ length: W / 40 }).map((_, i) => (
                <rect key={`d${i}`} x={i * 40 + 10} y="314.5" width="16" height="2" rx="1" fill={C.roadDash} />
            ))}
        </>
    );
}

function Leg({ thigh, shin, fill, shoe }: { thigh: MotionValue<number>; shin: MotionValue<number>; fill: string; shoe: string }) {
    return (
        <motion.g style={{ rotate: thigh, ...pivot(HIP.x, HIP.y) }}>
            <rect x="143.5" y="227" width="13" height="38" rx="6.5" fill={fill} />
            <motion.g style={{ rotate: shin, ...pivot(HIP.x, KNEE_Y) }}>
                <rect x="144" y="259" width="12" height="31" rx="6" fill={fill} />
                <path d="M142.5 287.5 q0 -4.5 5 -4.5 h6.5 q3.5 0 6 2.5 l3.5 3 q2 1.7 2 3.8 v1.2 h-23 z" fill={shoe} />
                <path d="M142.5 292.6 h23" stroke={C.sole} strokeWidth="1.4" />
            </motion.g>
        </motion.g>
    );
}

function Steam({ clock, x, offset }: { clock: MotionValue<number>; x: number; offset: number }) {
    const s = useTransform(clock, (t) => (t / 1800 + offset) % 1);
    const y = useTransform(s, (v) => -v * 9);
    const opacity = useTransform(s, (v) => Math.sin(v * Math.PI) * 0.9);
    return (
        <motion.path
            d={`M${x} 180 q-2.2 -3 0 -6 q2.2 -3 0 -6`}
            stroke="#FFFFFF"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            style={{ y, opacity }}
        />
    );
}

function Petal({ clock, i }: { clock: MotionValue<number>; i: number }) {
    const s = useTransform(clock, (t) => (t / 7000 + i / PETAL_X.length) % 1);
    const x = useTransform(s, (v) => PETAL_X[i] - v * 110 + 6 * Math.sin(v * 4 * Math.PI));
    const y = useTransform(s, (v) => 150 + v * 150);
    const rotate = useTransform(s, (v) => v * 540 + i * 40);
    const opacity = useTransform(s, (v) => Math.max(0, Math.min(1, v / 0.1, (1 - v) / 0.12)));
    return (
        <motion.ellipse
            cx="0"
            cy="0"
            rx="2.6"
            ry="1.4"
            fill={i % 2 ? C.blossom : C.blossomLight}
            style={{ x, y, rotate, opacity }}
        />
    );
}

// ── Scene ──────────────────────────────────────────────────────────────

export function WalkingScene({ className }: { className?: string }) {
    const ref = useRef<SVGSVGElement>(null);
    const inView = useInView(ref, { margin: "200px 0px" });
    const reduceMotion = useReducedMotion();
    const running = inView && !reduceMotion;

    // A single clock drives every layer so the stride, ground and parallax stay in sync.
    // It only advances while the scene is on screen.
    const clock = useMotionValue(START_MS);
    useAnimationFrame((_, delta) => {
        if (running) clock.set(clock.get() + Math.min(delta, 64));
    });

    const phase = useTransform(clock, (t) => (t / STRIDE_MS) * 2 * Math.PI);
    const thighNear = useTransform(phase, (p) => -SWING * Math.cos(p));
    const thighFar = useTransform(phase, (p) => SWING * Math.cos(p));
    // Knee bends only while that leg swings forward
    const shinNear = useTransform(phase, (p) => 4 + 38 * Math.max(0, -Math.sin(p)) ** 1.4);
    const shinFar = useTransform(phase, (p) => 4 + 38 * Math.max(0, Math.sin(p)) ** 1.4);
    // Drop the body as the legs spread so the planted foot stays on the pavement
    const bodyY = useTransform(phase, (p) => LEG * (1 - Math.cos(((SWING * Math.cos(p)) * Math.PI) / 180)));
    const farArm = useTransform(phase, (p) => -16 * Math.cos(p));
    const nearArm = useTransform(phase, (p) => 2.5 * Math.cos(2 * p));
    const headNod = useTransform(phase, (p) => 1.2 * Math.sin(2 * p));

    const groundX = useTransform(clock, (t) => -((t * GROUND_SPEED) % W));
    const streetX = useTransform(clock, (t) => -((t * GROUND_SPEED * 0.55) % W));
    const nearCityX = useTransform(clock, (t) => -((t * 0.01) % W));
    const farCityX = useTransform(clock, (t) => -((t * 0.005) % W));
    const cloudX = useTransform(clock, (t) => -((t * 0.003) % W));

    const sunScale = useTransform(clock, (t) => 1 + 0.05 * Math.sin(t / 1400));
    const bubbleY = useTransform(clock, (t) => 2.2 * Math.sin(t / 700));
    const chartT = useTransform(clock, (t) => (t % 3600) / 3600);
    const chartLength = useTransform(chartT, (s) => easeOutCubic(Math.min(1, s / 0.45)));
    const chartOpacity = useTransform(chartT, (s) => (s > 0.85 ? (1 - s) / 0.15 : 1));
    const arrowOpacity = useTransform(chartT, (s) => (s < 0.42 ? 0 : s > 0.85 ? (1 - s) / 0.15 : 1));

    return (
        <svg
            ref={ref}
            viewBox={`0 0 ${W} ${W}`}
            className={className}
            role="img"
            aria-label="Illustration of Sayandeep walking down a tree-lined Bengaluru street with a coffee, thinking about growth charts"
        >
            <defs>
                <linearGradient id="gis-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={C.skyTop} />
                    <stop offset="0.5" stopColor={C.skyMid} />
                    <stop offset="0.8" stopColor={C.skyWarm} />
                    <stop offset="1" stopColor={C.skyHorizon} />
                </linearGradient>
                <radialGradient id="gis-sun">
                    <stop offset="0" stopColor={C.sunCore} />
                    <stop offset="0.35" stopColor={C.sun} />
                    <stop offset="1" stopColor={C.sun} stopOpacity="0" />
                </radialGradient>
                <radialGradient id="gis-vignette" cx="0.5" cy="0.45" r="0.75">
                    <stop offset="0.6" stopColor="#5A3418" stopOpacity="0" />
                    <stop offset="1" stopColor="#5A3418" stopOpacity="0.22" />
                </radialGradient>
                <filter id="gis-grain" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
            </defs>

            {/* Sky + sun */}
            <rect width={W} height="262" fill="url(#gis-sky)" />
            <motion.circle cx="70" cy="170" r="64" fill="url(#gis-sun)" style={{ scale: sunScale, ...pivot(70, 170) }} />
            <circle cx="70" cy="170" r="20" fill={C.sunCore} />

            <Loop x={cloudX}>
                <Cloud x={52} y={58} />
                <Cloud x={150} y={30} s={0.75} />
                <Cloud x={268} y={78} s={0.9} />
            </Loop>

            <Loop x={farCityX}>
                <Skyline />
            </Loop>
            <Loop x={nearCityX}>
                <NearSkyline />
            </Loop>

            <Loop x={streetX}>
                <Streetscape />
            </Loop>

            {/* Pavement + road */}
            <rect y="256" width={W} height="52" fill={C.sidewalk} />
            <rect y="256" width={W} height="4" fill={C.sidewalkShade} />
            <rect y="305" width={W} height="5" fill={C.curb} />
            <rect y="310" width={W} height="10" fill={C.road} />
            <Loop x={groundX}>
                <GroundMarks />
            </Loop>

            {/* Thought bubble */}
            <g transform="translate(4 -24)">
                <motion.g style={{ y: bubbleY }}>
                    <circle cx="173" cy="118" r="2.6" fill="#FFFFFF" stroke={C.cloudShade} strokeWidth="1" />
                    <circle cx="182" cy="107" r="4" fill="#FFFFFF" stroke={C.cloudShade} strokeWidth="1" />
                    <path
                        d="M198 102 A13 13 0 0 1 194 77 A17 17 0 0 1 218 62 A16 16 0 0 1 247 68 A16 16 0 0 1 252 98 Q225 108 198 102 Z"
                        fill="#FFFFFF"
                        stroke={C.cloudShade}
                        strokeWidth="1.2"
                    />
                    <path d="M206 97 H243" stroke="#E2DAD0" strokeWidth="1" />
                    <motion.path
                        d="M207 93 L216 86 L224 89 L238 75"
                        stroke={C.chart}
                        strokeWidth="2.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ pathLength: chartLength, opacity: chartOpacity }}
                    />
                    <motion.path
                        d="M232.5 74.6 L238.4 74.7 L238.2 80.6"
                        stroke={C.chart}
                        strokeWidth="2.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: arrowOpacity }}
                    />
                </motion.g>
            </g>

            {/* Sayandeep */}
            <g transform={`translate(${FEET.x} ${FEET.y}) scale(${SCALE}) translate(${-FEET.x} ${-FEET.y})`}>
                <ellipse cx={FEET.x} cy={FEET.y + 0.5} rx="25" ry="3.6" fill="#7A5532" opacity="0.22" />
                <motion.g style={{ y: bodyY }}>
                    <Leg thigh={thighFar} shin={shinFar} fill={C.jeansDark} shoe={C.shoeDark} />
                    <Leg thigh={thighNear} shin={shinNear} fill={C.jeans} shoe={C.shoe} />

                    {/* Upper body leans slightly into the walk */}
                    <g transform={`rotate(3 ${HIP.x} ${HIP.y})`}>
                        <motion.g style={{ rotate: farArm, ...pivot(150, 176) }}>
                            <rect x="144.5" y="171" width="11" height="21" rx="5" fill={C.shirtDark} />
                            <rect x="146" y="188" width="8" height="26" rx="4" fill={C.skinShade} />
                            <circle cx="150" cy="216" r="4.2" fill={C.skinShade} />
                        </motion.g>

                        {/* Backpack */}
                        <rect x="123" y="171" width="19" height="50" rx="7" fill={C.pack} />
                        <path d="M128 171 q4.5 -5 9 0" stroke={C.packDark} strokeWidth="2" fill="none" />
                        <rect x="121" y="195" width="15" height="21" rx="5" fill={C.packDark} />
                        <path d="M124.5 199.5 h8" stroke={C.strap} strokeWidth="1" strokeLinecap="round" />

                        {/* Neck + polo */}
                        <rect x="147" y="155" width="9" height="14" rx="3" fill={C.skinShade} />
                        <path d="M138 177 Q139 167 151 166 Q163 166 165 177 L166 231 Q166 238 159 238 H142 Q136 238 136 231 Z" fill={C.shirt} />
                        <path d="M138 177 Q139 170 144 168 L142 238 Q136 238 136 231 Z" fill={C.shirtDark} opacity="0.85" />
                        <path d="M151 166 L161.5 166 L158 172.5 Z" fill={C.shirtLight} />
                        <path d="M160 172 V185" stroke={C.shirtDark} strokeWidth="1" />
                        <circle cx="160.7" cy="176.5" r="0.9" fill="#EFE6DA" />
                        <circle cx="160.7" cy="181" r="0.9" fill="#EFE6DA" />
                        <path d="M141 170 Q149 167 154 172 Q152 186 149 200" stroke={C.strap} strokeWidth="3.4" fill="none" strokeLinecap="round" />

                        {/* Head */}
                        <motion.g style={{ rotate: headNod, ...pivot(152, 156) }}>
                            <ellipse cx="153" cy="142" rx="14.5" ry="16" fill={C.skin} />
                            <path d="M166.5 139.5 q4.4 4 0.6 6.8" fill={C.skin} stroke={C.skinShade} strokeWidth="0.8" />
                            <path d="M146 151.5 Q152 160 163 156" stroke="#3A2A24" strokeOpacity="0.16" strokeWidth="3" fill="none" strokeLinecap="round" />
                            <path
                                d="M139 147 Q135.5 128 151 125 Q166 123.5 168.5 136 Q163.5 131.5 157 133 Q151.5 134.2 149 139.5 Q147.5 143 146.8 148 Q143 146.5 139 147 Z"
                                fill={C.hair}
                            />
                            <path d="M150 125.8 Q158 121 165.5 127.5" stroke={C.hair} strokeWidth="3" fill="none" strokeLinecap="round" />
                            <ellipse cx="148.5" cy="145" rx="3" ry="4.3" fill={C.skinShade} />
                            <circle cx="162" cy="148.5" r="2.4" fill="#E08C7A" opacity="0.3" />
                            {/* Clear-frame glasses */}
                            <path d="M159 142 H149.8" stroke={C.frames} strokeWidth="1.3" />
                            <rect x="159" y="139.2" width="9" height="6.6" rx="2.2" fill="#FFFFFF" fillOpacity="0.18" stroke={C.frames} strokeWidth="1.2" />
                            <circle cx="164.6" cy="142.6" r="1.35" fill={C.hair} />
                            <path d="M160.5 136.4 Q164.5 134.8 168.4 136.2" stroke={C.hair} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            <path d="M163.2 150.6 Q165.8 152.6 168.2 150.6" stroke="#7A4636" strokeWidth="1.25" fill="none" strokeLinecap="round" />
                        </motion.g>

                        {/* Near arm, holding a filter coffee */}
                        <motion.g style={{ rotate: nearArm, ...pivot(152, 177) }}>
                            <rect x="146" y="171" width="12.5" height="22" rx="5.5" fill={C.shirtLight} />
                            <rect x="148.5" y="189" width="9" height="16" rx="4.5" fill={C.skin} />
                            <path d="M153 203.5 L168.5 197" stroke={C.skin} strokeWidth="8.6" strokeLinecap="round" />
                            <Steam clock={clock} x={170} offset={0} />
                            <Steam clock={clock} x={174.5} offset={0.5} />
                            <rect x="165.6" y="181.6" width="12.8" height="3.2" rx="1.4" fill="#E3DCD1" />
                            <path d="M166.4 184.6 H177.6 L176.2 197.6 Q176 199 174.6 199 H169.4 Q168 199 167.8 197.6 Z" fill={C.cup} />
                            <path d="M166.9 189 H177.1 L176.7 193.5 H167.3 Z" fill={C.cupBand} />
                            <circle cx="169.8" cy="195.2" r="4.6" fill={C.skin} />
                        </motion.g>
                    </g>
                </motion.g>
            </g>

            {PETAL_X.map((_, i) => (
                <Petal key={i} clock={clock} i={i} />
            ))}

            {/* Painterly finish: warm vignette + film grain */}
            <rect width={W} height={W} fill="url(#gis-vignette)" />
            <rect width={W} height={W} filter="url(#gis-grain)" opacity="0.07" />
        </svg>
    );
}
