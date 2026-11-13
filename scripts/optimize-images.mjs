// Convierte capturas originales a WebP para public/projects.
// Uso: node scripts/optimize-images.mjs <carpeta-origen> <carpeta-destino> <ancho-max> archivo1.png archivo2.png ...
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { basename, extname, join } from "node:path";

const [src, dest, maxWidth, ...files] = process.argv.slice(2);
if (!src || !dest || !maxWidth || files.length === 0) {
  console.error("Uso: optimize-images.mjs <origen> <destino> <ancho-max> <archivos...>");
  process.exit(1);
}
await mkdir(dest, { recursive: true });
for (const file of files) {
  const out = join(dest, `${basename(file, extname(file))}.webp`);
  const info = await sharp(join(src, file))
    .resize({ width: Number(maxWidth), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
