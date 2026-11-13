import { NextResponse, type NextRequest } from "next/server";
import { localeCookie, locales, pickLocale } from "@/lib/i18n/config";

/** Redirige `/` y rutas sin prefijo a `/es` o `/en`. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = pickLocale(
    request.headers.get("accept-language"),
    request.cookies.get(localeCookie)?.value,
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Salta rutas internas de Next y cualquier archivo con extensión.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
