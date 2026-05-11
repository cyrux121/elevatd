import Image from "next/image";
import { clsx } from "@/lib/clsx";

type Props = {
  src: string | null | undefined;
  alt: string;
  label: string;
  ledCount?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ProductImage({
  src,
  alt,
  label,
  ledCount,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
}: Props) {
  return (
    <div
      className={clsx(
        "relative aspect-[4/3] w-full overflow-hidden rounded-md",
        "bg-[repeating-linear-gradient(45deg,#1a1c22_0_8px,#16181d_8px_16px)]",
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
        <Placeholder label={label} ledCount={ledCount} />
      )}
    </div>
  );
}

function Placeholder({ label, ledCount }: { label: string; ledCount?: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4 text-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-3">
        PRODUCT PHOTO
      </span>
      {ledCount && (
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
          {ledCount}-LED POD · LIT
        </span>
      )}
      {!ledCount && (
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-3">
          {label}
        </span>
      )}
    </div>
  );
}
