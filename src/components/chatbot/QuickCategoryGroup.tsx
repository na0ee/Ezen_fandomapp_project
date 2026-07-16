import { QuickCategory } from "./QuickCategory";

const labels = [
  { label: "오늘의 향수 추천받기", variant: "selected" as const },
  { label: "피드백하기", variant: "default" as const },
  { label: "가까운 매장 찾기", variant: "default" as const },
  { label: "향수 레이어링 추천", variant: "default" as const },
  { label: "딱 맞는 향수 선물 고르기", variant: "default" as const },
];

type QuickCategoryGroupProps = {
  onChipClick?: (label: string) => void;
};

export function QuickCategoryGroup({ onChipClick }: QuickCategoryGroupProps) {
  return (
    <div className="flex w-full flex-wrap items-start gap-2" data-chatbot-component="QuickCategoryGroup" data-node-id="1110:20637">
      {labels.map(({ label, variant }) => (
        <QuickCategory key={label} label={label} onClick={() => onChipClick?.(label)} variant={variant} />
      ))}
    </div>
  );
}
