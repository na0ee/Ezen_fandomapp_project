type BadgeProps = { label: string };

export function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-flex h-5 items-center rounded-badge bg-point-orange-40 px-2 text-[10px] font-semibold leading-none tracking-[-0.02em] text-point-orange">
      {label}
    </span>
  );
}
