type SlideIndicatorProps = {
  progress: number;
  variant?: "mini" | "full";
  accent?: "black" | "orange";
};

export function SlideIndicator({ progress, variant = "full", accent = "black" }: SlideIndicatorProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`h-0.5 bg-[#D9D9D9] ${variant === "mini" ? "w-[120px]" : "w-full"}`}>
      <div
        aria-hidden="true"
        className={`h-full ${accent === "orange" ? "bg-point-orange" : "bg-off-black"}`}
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
}
