import { SlidersHorizontal } from "lucide-react";
import { PageLayout } from "../components/common/PageLayout";
import { SectionTitle } from "../components/common/SectionTitle";

const sections = ["향수 트렌드", "많이 읽은 글", "브랜드 스토리", "더 둘러보기"];

export function MagazinePage() {
  return (
    <PageLayout
      headerAction={
        <button className="flex items-center gap-1.5 text-xs font-medium" type="button">
          <SlidersHorizontal aria-hidden="true" size={16} /> 가격
        </button>
      }
      title="매거진"
    >
      {sections.map((title) => (
        <section key={title}>
          <SectionTitle title={title} variant="detail" />
          <div className="mt-[30px] min-h-44 rounded-card bg-light2-grey" />
        </section>
      ))}
    </PageLayout>
  );
}
