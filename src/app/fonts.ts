import localFont from "next/font/local";

/**
 * Archivo variable (peso 100-900, ancho 62-125 %). Una sola familia para todo el
 * sitio: el ancho condensado da los títulos y el ancho expandido, las etiquetas.
 * Licencia OFL en ./fonts.
 */
export const archivo = localFont({
  src: "./fonts/archivo-latin-wdth-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});
