import Image from "next/image";
import retrato from "@/assets/about/foto-c.jpg";

/**
 * Retrato de "Sobre mí": completo (marco 4:5, la proporción del original), sin filtro, sin animación
 * y con borde fino.
 */
export function AboutPhoto({ alt }: { alt: string }) {
  return (
    <figure className="about-photo" data-reveal data-delay="0.05">
      <div className="about-photo-frame">
        <Image
          src={retrato}
          alt={alt}
          sizes="(min-width: 1024px) 40vw, 90vw"
          placeholder="blur"
          priority
          className="about-photo-img"
        />
      </div>
    </figure>
  );
}
