type LayerLogoProps = {
  className?: string;
};

export function LayerLogo({ className = "" }: LayerLogoProps) {
  return (
    <span className={`font-cormorant text-[28px] font-bold leading-none tracking-[-0.02em] ${className}`}>
      LAYER
    </span>
  );
}
