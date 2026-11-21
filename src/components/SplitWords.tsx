/**
 * Parte un texto en palabras, cada una dentro de su máscara, para que suban una a una al entrar
 * en pantalla (ver `words` en lib/motion/scenes.ts). Los espacios se conservan, así que el texto
 * se sigue leyendo (y se lee en voz alta) como una sola frase.
 */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="word">
            <span data-word>{word}</span>
          </span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
