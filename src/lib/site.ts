/**
 * URL pública del sitio. `SITE_URL` manda si existe (se define en Vercel con la
 * dirección que se quiere compartir); si no, se usa el dominio de producción
 * que Vercel expone, y en local, localhost.
 */
export function siteUrl(): URL {
  const explicit = process.env.SITE_URL;
  if (explicit) return new URL(explicit);
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(host ? `https://${host}` : "http://localhost:3000");
}
