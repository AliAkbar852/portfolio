import { MetadataRoute } from 'next'
import { SITE_DATA } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://aliakbar.dev'

    // Base routes
    const routes = [
        '',
        '/about',
        '/projects',
        '/services',
        '/contact',
        '/resume',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Project routes
    const projects = SITE_DATA.projects.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...routes, ...projects]
}
