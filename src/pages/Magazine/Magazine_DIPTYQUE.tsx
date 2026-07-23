

import diptyqueHeroImage from "../../assets/magazine/diptyque/hero.png";
import memoryLeftImage from "../../assets/magazine/diptyque/memory-left.png";
import memoryRightImage from "../../assets/magazine/diptyque/memory-right.png";
import signatureImage from "../../assets/magazine/diptyque/signature.png";
import storyLeftImage from "../../assets/magazine/diptyque/story-left.png";
import storyRightImage from "../../assets/magazine/diptyque/story-right.png";

import { BackHeader } from "../../components/common/BackHeader";
import { HeaderActions } from "../../components/common/HeaderActions";

function MagazineDetailHeader() {
  return (
    <BackHeader title="매거진" backTo="/magazine" action={<HeaderActions />} />
  );
}

function HeroSection() {
  return (
    <section className="flex w-full flex-col gap-2.5">
      <div className="h-[536px] w-full overflow-hidden bg-off-white">
        <img alt="컬러풀한 잎 위에 놓인 딥티크 향수 컬렉션" className="pointer-events-none size-full" src={diptyqueHeroImage} />
      </div>
      <div className="flex w-full items-center px-side">
        <div className="flex flex-1 flex-col items-start gap-[7px]">
          <span className="rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em] text-off-white">
            브랜드 스토리
          </span>
          <h2 className="font-cormorant text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">DIPTYQUE</h2>
        </div>
      </div>
    </section>
  );
}

function ArticleBody() {
  return (
    <article className="flex w-full flex-col items-start gap-[50px]">
      <section className="flex w-full flex-col items-start gap-1 px-side text-black [word-break:break-word]">
        <h2 className="w-full text-xl font-bold leading-[normal] tracking-[-0.02em]">예술과 여행이 향으로 만나다</h2>
        <p className="w-full text-base font-medium leading-6 tracking-[-0.02em]">
          1961년 프랑스 파리에서 세 명의 예술가가 설립한 딥티크는 브랜드의 시작부터 일반적인 향수 브랜드와는 달랐습니다.
        </p>
      </section>

      <div className="flex h-[356px] w-full items-end justify-end pr-side">
        <div className="mr-[-17px] flex h-[356px] w-[223px] shrink-0 items-start">
          <img alt="청록색 화병에 꽂힌 꽃" className="h-[299px] w-[223px]" src={storyLeftImage} />
        </div>
        <img alt="물가에 놓인 딥티크 캔들" className="h-[153px] w-[204px] shrink-0" src={storyRightImage} />
      </div>

      <p className="w-full px-side text-base font-medium leading-6 tracking-[-0.02em] text-black [word-break:break-word]">
        패브릭과 인테리어 소품을 제작하던 세 창립자는 여행 중 만난 풍경과 기억, 예술적 영감을 향으로 표현하기 시작했고, 이는 오늘날 딥티크만의 감성적인 세계관으로 이어졌습니다.
      </p>

      <div className="flex h-[319px] w-full items-start gap-[13px] px-side">
        <img alt="분홍빛 배경에 놓인 딥티크 향수" className="h-[195px] w-[145px] shrink-0" src={memoryLeftImage} />
        <div className="h-[319px] w-[254px] shrink-0 overflow-hidden bg-[#c4c4c4]">
          <img alt="꽃 사이로 보이는 딥티크 향수" className="h-[319px] w-[252px] max-w-none" src={memoryRightImage} />
        </div>
      </div>

      <p className="w-full px-side text-base font-medium leading-6 tracking-[-0.02em] text-black [word-break:break-word]">
        딥티크의 향수는 하나의 장소와 순간을 떠올리게 하는 것이 특징입니다. 대표 향수인 도 손은 베트남 해안의 기억을, 오르페옹은 1960년대 파리 재즈바의 분위기를, 플레르 드 뽀는 따뜻한 피부의 온기를 담아내고 있습니다.
      </p>

      <div className="flex h-[252px] w-full items-center justify-center px-side">
        <img alt="딥티크 매장 전경" className="h-[252px] w-[329px]" src={signatureImage} />
      </div>
    </article>
  );
}

export default function MagazineDiptyque() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineDetailHeader />
        <div className="flex flex-col gap-16 pt-[var(--app-header-height)] pb-[178px]">
          <HeroSection />
          <ArticleBody />
        </div>
      </div>
    </main>
  );
}
