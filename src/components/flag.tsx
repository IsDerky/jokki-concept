type Props = { code: "es" | "jp"; className?: string };

/**
 * Banderas SVG planas: se ven igual en cualquier sistema y navegador.
 * Windows/Chrome no trae las banderas emoji, así que 🇪🇸/🇯🇵
 * acaban como texto "ES"/"JP". Con estos SVG no pasa.
 */
export function Flag({ code, className = "w-9 h-6" }: Props) {
  if (code === "es") {
    return (
      <svg
        viewBox="0 0 30 20"
        aria-label="España"
        role="img"
        className={className}
      >
        <rect width="30" height="20" fill="#AA151B" />
        <rect y="5" width="30" height="10" fill="#F1BF00" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 30 20"
      aria-label="Japón"
      role="img"
      className={className}
    >
      <rect width="30" height="20" fill="#FFFFFF" />
      <circle cx="15" cy="10" r="6" fill="#BC002D" />
    </svg>
  );
}
