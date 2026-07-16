import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/common/PageLayout";
import { CtaButton } from "../components/ui/CtaButton";
import { SlideIndicator } from "../components/ui/SlideIndicator";

export function QuestionPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const choices = ["깨끗한 비누향", "싱그러운 시트러스", "포근한 머스크", "은은한 플로럴", "차분한 우디", "따뜻한 앰버"];

  return (
    <PageLayout contentClassName="px-[18px] py-8" showNavigation={false}>
      <SlideIndicator accent="orange" progress={25} />
      <section className="mt-12 flex flex-1 flex-col">
        <h1 className="text-[26px] font-medium leading-normal tracking-[-0.02em]">
          <span className="font-cormorant font-bold">Q1.</span>
          <br />
          어떤 향에 마음이 끌리나요?
        </h1>
        <p className="mt-3 text-base font-medium leading-normal tracking-[-0.02em] text-off-black-70">
          지금 가장 편안하게 느껴지는 향을 하나 골라주세요.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-2.5">
          {choices.map((choice) => (
            <button
              aria-pressed={selected === choice}
              className={`min-h-[100px] rounded-question border px-2 text-sm font-medium leading-[1.4] tracking-[-0.02em] transition-colors ${
                selected === choice
                  ? "border-point-orange bg-point-orange-40 text-off-black"
                  : "border-transparent bg-light2-grey text-off-black-70"
              }`}
              key={choice}
              onClick={() => setSelected(choice)}
              type="button"
            >
              {choice}
            </button>
          ))}
        </div>
        <div className="mt-auto pt-10">
          <CtaButton disabled={!selected} label="결과 보기" onClick={() => navigate("/result")} />
          <button className="mt-4 w-full font-cormorant text-xs font-medium" type="button">
            Skip
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
