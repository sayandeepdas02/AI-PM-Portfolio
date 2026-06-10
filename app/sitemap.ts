import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map((p) => ({
    url: `https://ai.sayandeep.space/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: p.type === 'tech' ? 0.8 : 0.7,
  }))

  return [
    {
      url: 'https://ai.sayandeep.space',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://ai.sayandeep.space/resume',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...projectUrls,
  ]
}
