import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bpfeedbackdata.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/analytics',
          '/participation', 
          '/comparisons',
          '/questions',
          '/reports',
          '/best-practices',
          '/platform',
          '/platform/analytics',
          '/platform/participation', 
          '/platform/comparisons',
          '/platform/questions',
          '/platform/reports',
          '/platform/best-practices',
          '/login',
        ],
        disallow: [
          '/backoffice',     // Panel de administración (solo admin)
          '/api/',           // APIs privadas
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}