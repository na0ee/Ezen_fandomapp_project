import { PageLayout } from "../components/common/PageLayout";
import { CtaButton } from "../components/ui/CtaButton";
import resultImage from "../assets/mypage/profile-bg.png";

const traits = [
  { label: "산뜻함", position: "78%", accent: true },
  { label: "포근함", position: "62%", accent: false },
  { label: "존재감", position: "42%", accent: true },
];

export function ResultPage() {
  return (
    <PageLayout contentClassName="px-[18px] py-8" showNavigation={false}>
      <div className="aspect-[394/259] w-full overflow-hidden rounded-question bg-light2-grey">
        <img alt="햇살과 바람이 어우러진 향기 유형" className="size-full object-cover" src={resultImage} />
      </div>
      <section className="mt-8">
        <p className="text-base font-medium tracking-[-0.02em] text-off-black-70">나의 향기 유형</p>
        <h1 className="mt-1 font-cormorant text-[54px] font-semibold italic leading-none tracking-[-0.02em]">
          Airy Musk
        </h1>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["#깨끗한", "#포근한", "#은은한"].map((tag) => (
            <span className="rounded-[30px] bg-off-black px-2.5 py-[3px] text-[10px] font-medium tracking-[-0.02em] text-off-white" key={tag}>{tag}</span>
          ))}
        </div>
        <p className="mt-6 text-sm font-medium leading-normal tracking-[-0.02em] text-off-black-70">
          맑고 부드러운 향이 자연스럽게 겹쳐지는 취향이에요. 깨끗한 머스크와 가벼운 플로럴 노트가 편안한 인상을 오래 남겨요.
        </p>
        <div className="mt-[30px] flex flex-col gap-4">
          {traits.map((trait) => (
            <div className="flex items-center gap-3" key={trait.label}>
              <span className="w-12 text-xs tracking-[-0.02em] text-off-black-70">{trait.label}</span>
              <div className="relative h-px flex-1 bg-light-grey">
                <span
                  className={`absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${trait.accent ? "bg-point-orange" : "bg-off-black"}`}
                  style={{ left: trait.position }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-auto space-y-4 pt-12">
        <CtaButton label="결과 저장하기" />
        <CtaButton label="다시 진단하기" variant="outline" />
      </div>
    </PageLayout>
  );
}
