// Update this WhatsApp number (with country code, no + or spaces) to receive orders.
export const WHATSAPP_NUMBER = '919643986445';
export const BRAND_NAME = 'DuoAtelier';
export const BRAND_TAGLINE =
  'Customized your Couple Tshirt and order on WhatsApp.';

// Update this to your deployed domain — used for the sitemap and canonical/OG URLs.
export const SITE_URL = 'https://duoatelier.com';

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
