/**
 * URL pública del sitio. En Vercel sale de la variable de entorno del
 * proyecto; sin dominio propio será la dirección `.vercel.app`.
 */
export function siteUrl(): URL {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(host ? `https://${host}` : "http://localhost:3000");
}
