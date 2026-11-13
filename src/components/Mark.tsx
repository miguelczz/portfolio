/** Marca del sitio: monograma MZ, la M en tinta y la Z en el acento. */
export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M2 25 V7 H6.4 L10 14.2 L13.6 7 H18 V25 H13.8 V15.6 L10 22.6 L6.2 15.6 V25 Z"
        fill="var(--ink)"
      />
      <path d="M19.5 7 H30 V10.6 L24.4 21.4 H30 V25 H19.5 V21.4 L25.1 10.6 H19.5 Z" fill="var(--accent)" />
    </svg>
  );
}
