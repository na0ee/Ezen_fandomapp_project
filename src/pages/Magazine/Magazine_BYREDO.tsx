import { ChevronLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import headerBell from "../../assets/community/figma/header-bell.svg";
import byredoHeroImage from "../../assets/magazine/byredo/hero.png";
import mojaveGhostImage from "../../assets/magazine/byredo/mojave-ghost.jpg";
import signatureImages from "../../assets/magazine/byredo/signatures.jpg";
import storyMotionImage from "../../assets/magazine/byredo/story-motion.jpg";
import storyObjectImage from "../../assets/magazine/byredo/story-object.jpg";
import { PerfumeIcon } from "../../components/icons/PerfumeIcon";

function MagazineDetailHeader() {
  return (
    <header className="fixed left-1/2 top-0 z-50 flex h-[var(--app-header-height)] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-off-white px-side pt-[var(--app-safe-top)]">
      <div className="flex items-center">
        <Link aria-label="매거진으로 돌아가기" className="flex size-[21px] items-center justify-center" to="/magazine">
          <ChevronLeft aria-hidden="true" size={21} strokeWidth={1.4} />
        </Link>
        <h1 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">매거진</h1>
      </div>
      <div aria-label="매거진 메뉴" className="flex items-center gap-5">
        <Link aria-label="검색" className="size-7" to="/search">
          <Search aria-hidden="true" className="size-full" strokeWidth={1.8} />
        </Link>
        <img alt="" aria-hidden="true" className="size-7" src={headerBell} />
        <Link aria-label="향수 카테고리" to="/category">
          <PerfumeIcon />
        </Link>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="flex w-full flex-col gap-2.5">
      <div className="relative h-[536px] w-full overflow-hidden bg-off-white">
        <img
          alt="과일과 바이레도 향수를 배치한 브랜드 화보"
          className="pointer-events-none absolute top-[-57px] left-0 h-[752.5px] w-full object-cover"
          src={byredoHeroImage}
        />
      </div>
      <div className="flex w-full items-center px-side">
        <div className="flex flex-1 flex-col items-start gap-[7px]">
          <span className="rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em] text-off-white">
            브랜드 스토리
          </span>
          <h2 className="font-cormorant text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">BYREDO</h2>
        </div>
      </div>
    </section>
  );
}

function ArticleBody() {
  return (
    <div className="flex w-full flex-col items-start gap-[50px]">
      <section className="flex w-full flex-col items-start gap-1 px-side text-black [word-break:break-word]">
        <h2 className="w-full text-xl font-bold leading-[normal] tracking-[-0.02em]">기억과 감정을 향으로 담아내는 브랜드</h2>
        <p className="w-[369px] text-base font-medium leading-6 tracking-[-0.02em]">
          2006년 스웨덴 스톡홀름에서 설립된 바이레도는 단순히 좋은 향을 만드는 것을 넘어, 기억과 감정, 특정 순간의 분위기를 향으로 표현하는 것을 목표로 시작되었습니다.
        </p>
      </section>

      <div className="flex h-[448px] w-full items-start justify-end px-side">
        <div className="mr-[-56px] flex h-[448px] w-[242px] shrink-0 items-end">
          <img alt="흐릿한 바이레도 향수 보틀 화보" className="h-[187px] w-[242px] object-cover" src={storyObjectImage} />
        </div>
        <img alt="거울 위에 놓인 바이레도 향수" className="h-[225px] w-[206px] shrink-0 object-cover" src={storyMotionImage} />
      </div>

      <p className="w-full px-side text-base font-medium leading-6 tracking-[-0.02em] text-black [word-break:break-word]">
        창립자 벤 고햄(Ben Gorham)은 어린 시절의 경험과 여행에서 얻은 영감을 바탕으로 향수를 하나의 예술 작품처럼 풀어냈으며, 미니멀한 디자인과 독창적인 스토리텔링으로 니치 향수 시장을 대표하는 브랜드로 성장했습니다.
      </p>

      <div className="flex h-[393px] w-full items-center justify-center px-side">
        <img alt="바이레도 대표 향수 컬렉션" className="h-[393px] w-[310px] object-cover" src={signatureImages} />
      </div>

      <p className="w-full px-side text-base font-medium leading-6 tracking-[-0.02em] text-black [word-break:break-word]">
        대표 향수인 블랑쉬는 깨끗한 리넨의 감성을, 모하비 고스트는 사막에서 피어나는 꽃의 생명력을, 집시 워터는 자유로운 보헤미안 라이프스타일을 담아내며 많은 사랑을 받고 있습니다.
      </p>

      <div className="flex h-[318px] w-full items-center justify-center px-side">
        <img alt="초록 사과와 모하비 고스트 향수" className="h-[318px] w-[269px] object-cover" src={mojaveGhostImage} />
      </div>
    </div>
  );
}

export default function MagazineByredo() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineDetailHeader />
        <div className="flex flex-col gap-16 pt-[var(--app-header-height)] pb-[156px]">
          <HeroSection />
          <ArticleBody />
        </div>
      </div>
    </main>
  );
}
