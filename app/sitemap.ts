import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { blogs, getBlogPageCount } from '@/data/blogs'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map((p) => ({
    url: `https://ai.sayandeep.space/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: p.type === 'tech' ? 0.8 : 0.7,
  }))

  const blogListingUrls = [
    {
      url: 'https://ai.sayandeep.space/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    ...Array.from({ length: Math.max(0, getBlogPageCount() - 1) }, (_, index) => ({
      url: `https://ai.sayandeep.space/blog/page/${index + 2}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
  ]

  const blogPostUrls = blogs.map((blog) => ({
    url: `https://ai.sayandeep.space/blog/${blog.slug}`,
    lastModified: new Date(blog.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.72,
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
    ...blogListingUrls,
    ...blogPostUrls,
    ...projectUrls,
  ]
}
