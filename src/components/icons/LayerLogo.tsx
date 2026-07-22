type LayerLogoProps = {
  className?: string;
};

export function LayerLogo({ className = "" }: LayerLogoProps) {
  return (
    <span className={`font-cormorant text-2xl font-semibold leading-[normal] tracking-[-0.02em] ${className}`}>
      Layer
    </span>
  );
}
