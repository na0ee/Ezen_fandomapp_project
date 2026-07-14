import { PageLayout } from "../components/common/PageLayout";
import { CtaButton } from "../components/ui/CtaButton";

export function ResultPage() {
  return (
    <PageLayout contentClassName="px-[18px] py-8" showNavigation={false}>
      <div className="w-full rounded-question bg-light2-grey" style={{ aspectRatio: "394 / 259" }} />
      <section className="mt-8">
        <p className="text-base font-medium tracking-[-0.02em] text-off-black-70">나의 향기 유형</p>
        <h1 className="mt-1 font-cormorant text-[54px] font-semibold italic leading-none tracking-[-0.02em]">
          Your Layer
        </h1>
        <p className="mt-6 text-sm font-medium leading-normal tracking-[-0.02em] text-off-black-70">
          결과 데이터와 설명은 Figma 및 유형 매핑 기준 확인 후 채워집니다.
        </p>
      </section>
      <div className="mt-auto space-y-4 pt-12">
        <CtaButton label="결과 저장하기" />
        <CtaButton label="다시 진단하기" variant="outline" />
      </div>
    </PageLayout>
  );
}
