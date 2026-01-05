/**
 * Site Configuration
 * Centralized configuration for URLs, contact info, and constants
 */

export const SITE_CONFIG = {
  // Base URLs
  url: 'https://www.tusanagustin.com',
  name: 'Tu San Agustín',

  // Contact Information
  contact: {
    phone: '316 875 3305',
    whatsapp: {
      number: '573168753305',
      url: 'https://wa.me/573168753305',
      defaultMessage: 'Hola!',
      getUrl: (message?: string) =>
        `https://wa.me/573168753305?text=${encodeURIComponent(message || 'Hola!')}`
    }
  },

  // Social Media
  social: {
    facebook: 'https://www.facebook.com/tusanagustineventos/',
    instagram: 'https://www.instagram.com/tusanagustin/',
    tiktok: 'https://www.tiktok.com/@tusanagustin',
    linkedin: 'https://www.linkedin.com/company/tusanagustin/',
    youtube: 'https://www.youtube.com/@tusanagustin'
  },

  // Internal Routes (relative paths)
  routes: {
    home: '/',
    events: '/eventos',
    services: '/servicios',
    blog: '/blog',
    about: '/quienes-somos',
    contact: '/contacto',

    // Service specific routes
    weddings: '/servicios/bodas',
    quinceañeras: '/servicios/15-anos',
    corporate: '/servicios/eventos-empresariales',
    tourism: '/servicios/turismo'
  },

  // Assets
  assets: {
    logo: 'https://www.tusanagustin.com/assets/media/logo-header-new_extraLargeThumb.webp'
  }
} as const;

// Helper function to get absolute URL
export function getAbsoluteUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`;
}

// Helper function to get localized route
export function getLocalizedRoute(route: string, lang: 'es' | 'en' = 'es'): string {
  if (lang === 'en') {
    return `/en${route}`;
  }
  return route;
}
