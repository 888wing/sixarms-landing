export const APP_CONFIG = {
  MAIN_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://6arms.uk',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.6arms.uk',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://sixarms.ai',
}

export const navigateToApp = (path: string = '/') => {
  window.location.href = `${APP_CONFIG.MAIN_APP_URL}${path}`
}