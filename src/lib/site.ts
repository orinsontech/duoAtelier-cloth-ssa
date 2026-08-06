// Update this WhatsApp number (with country code, no + or spaces) to receive orders.
export const WHATSAPP_NUMBER = '919310694847';
export const BRAND_NAME = 'Willy-Nilly';
export const BRAND_TAGLINE =
  'Customized your Couple Tshirt and order on WhatsApp.';

// Update this to your deployed domain — used for the sitemap and canonical/OG URLs.
export const SITE_URL = 'https://willy-nilly.com';

// Update this to your support inbox — shown on the Contact page and in policy pages.
export const CONTACT_EMAIL = 'carewillynilly@gmail.com';

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
