import { Search } from "lucide-react";
import { PageLayout } from "../components/common/PageLayout";
import { SectionTitle } from "../components/common/SectionTitle";
import { CtaButton } from "../components/ui/CtaButton";

const sections = ["TODAY'S Scent", "Challenge", "TODAY'S Rank", "Magazine", "Gift"];

export function HomePage() {
  return (
    <PageLayout
      headerAction={
        <button aria-label="검색" type="button">
          <Search aria-hidden="true" size={24} />
        </button>
      }
      contentClassName="gap-16"
    >
      <section className="flex min-h-[536px] flex-col items-center justify-center bg-light2-grey px-5 text-center">
        <p className="font-cormorant text-[54px] font-semibold leading-none tracking-[-0.02em]">LAYER</p>
        <p className="mt-3 text-sm font-medium tracking-[-0.02em] text-off-black-70">
          향이 겹쳐, 취향이 되는 곳
        </p>
        <CtaButton className="mt-8 max-w-[390px]" label="향수 취향 알아보기" />
      </section>

      {sections.map((title) => (
        <section className="px-5" key={title}>
          <SectionTitle
            moreHref={title === "Magazine" ? "/magazine" : undefined}
            subtitle="Figma 화면 확인 후 콘텐츠가 채워집니다."
            title={title}
          />
          <div className="mt-[30px] min-h-40 rounded-card bg-light2-grey" />
        </section>
      ))}
    </PageLayout>
  );
}
