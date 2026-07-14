import { PageLayout } from "../components/common/PageLayout";
import { CtaButton } from "../components/ui/CtaButton";
import { SlideIndicator } from "../components/ui/SlideIndicator";

export function QuestionPage() {
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
          질문 화면은 Figma 노드 확인 후 선택지를 구성합니다.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-2.5">
          {Array.from({ length: 6 }, (_, index) => (
            <div className="min-h-[100px] rounded-question bg-light2-grey" key={index} />
          ))}
        </div>
        <div className="mt-auto pt-10">
          <CtaButton disabled label="다음" />
          <button className="mt-4 w-full font-cormorant text-xs font-medium" type="button">
            Skip
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
