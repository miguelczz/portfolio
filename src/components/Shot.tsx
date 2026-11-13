import Image from "next/image";

type Props = {
  image: { src: string; width: number; height: number };
  alt: string;
  caption: string;
  priority?: boolean;
  sizes?: string;
};

/** Captura real de un producto con su pie de figura. */
export function Shot({ image, alt, caption, priority = false, sizes }: Props) {
  return (
    <figure data-reveal>
      <div className="shot">
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={alt}
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 55vw, 100vw"}
        />
      </div>
      <figcaption className="label mt-2">{caption}</figcaption>
    </figure>
  );
}
