import Image from "next/image";
import { clsx } from "@/lib/clsx";

type Props = {
  src: string | null | undefined;
  alt: string;
  label: string; // Shown when src is missing (e.g. SKU or product name).
  className?: string;
  priority?: boolean;
  sizes?: string;
};

// Renders a real image when src is present, otherwise a clean gray placeholder
// with the label overlaid. Aspect ratio is locked to square via the wrapper, so
// layout doesn't shift when real photos are uploaded.
export function ProductImage({
  src,
  alt,
  label,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
}: Props) {
  return (
    <div
      className={clsx(
        "relative aspect-square w-full overflow-hidden rounded-xl bg-muted",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <Placeholder label={label} />
      )}
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="px-4 text-center text-base font-semibold tracking-tight text-ink sm:text-lg">
        {label}
      </span>
    </div>
  );
}
