

import brandStillLifeImage from "../../assets/magazine/jomalone/brand-still-life.jpg";
import jomaloneHeroImage from "../../assets/magazine/jomalone/hero.jpg";
import layeringLeftImage from "../../assets/magazine/jomalone/layering-left.jpg";
import layeringRightImage from "../../assets/magazine/jomalone/layering-right.jpg";
import signatureLineupImage from "../../assets/magazine/jomalone/signature-lineup.jpg";

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
      <div className="relative h-[536px] w-full overflow-hidden bg-off-white">
        <img
          alt="꽃과 과일 사이에 놓인 조 말론 런던 향수"
          className="pointer-events-none absolute top-[-57px] left-0 h-[752.5px] w-full object-cover"
          src={jomaloneHeroImage}
        />
      </div>
      <div className="flex w-full items-center px-side">
        <div className="flex flex-1 flex-col items-start gap-[7px]">
          <span className="rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em] text-off-white">
            브랜드 스토리
          </span>
          <h2 className="font-cormorant text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">JO MALONE LONDON</h2>
        </div>
      </div>
    </section>
  );
}

function ArticleBody() {
  return (
    <article className="flex w-full flex-col items-start gap-[50px]">
      <section className="flex w-full flex-col items-start gap-1 px-side text-off-black [word-break:break-word]">
        <h2 className="w-full text-xl font-bold leading-[normal] tracking-[-0.02em]">나만의 향을 완성하는 레이어링의 시작</h2>
        <p className="w-full text-base font-medium leading-6 tracking-[-0.02em]">
          1994년 영국 런던에서 시작된 조 말론은 자연에서 영감을 받은 은은하고 세련된 향으로 전 세계적인 사랑을 받고 있습니다.
        </p>
      </section>

      <div className="flex h-[202px] w-full items-end justify-center px-side">
        <img alt="조 말론 향수와 배, 꽃을 배치한 화보" className="h-[202px] w-[383px] object-contain" src={brandStillLifeImage} />
      </div>

      <p className="w-full px-side text-base font-medium leading-6 tracking-[-0.02em] text-off-black [word-break:break-word]">
        조 말론은 서로 다른 향을 조합하여 자신만의 향을 만드는 '프래그런스 컴바이닝(레이어링)' 문화를 대중화하며 향수 시장에 새로운 경험을 제안했습니다.
      </p>

      <div className="flex h-[377px] w-full items-start justify-end px-side">
        <div className="mr-[-57px] flex h-[377px] w-[230px] shrink-0 items-end">
          <img alt="배와 꽃 사이에 놓인 조 말론 향수" className="h-[224px] w-[230px] object-contain" src={layeringLeftImage} />
        </div>
        <div className="relative h-[218px] w-[220px] shrink-0 overflow-hidden">
          <img
            alt="시트러스 열매와 조 말론 향수"
            className="absolute top-[-11.76%] left-0 h-[123.52%] w-full max-w-none"
            src={layeringRightImage}
          />
        </div>
      </div>

      <p className="w-full px-side text-base font-medium leading-6 tracking-[-0.02em] text-off-black [word-break:break-word]">
        과하지 않은 자연스러운 향과 심플한 디자인은 향수 입문자도 쉽게 다가갈 수 있도록 만들었으며, 선물용 향수의 대표 브랜드로 자리 잡았습니다.
      </p>

      <div className="flex h-[319px] w-full items-end justify-center px-side">
        <img alt="과일과 나비를 배치한 조 말론 시그니처 향수" className="h-[319px] w-[386px] object-cover" src={signatureLineupImage} />
      </div>

      <p className="w-full px-[22px] text-base font-medium leading-6 tracking-[-0.02em] text-off-black [word-break:break-word]">
        대표 향수인 잉글리시 페어 앤 프리지아, 우드 세이지 앤 씨 솔트, 피오니 앤 블러쉬 스웨이드는 브랜드의 아이덴티티를 가장 잘 보여주는 시그니처 향수입니다.
      </p>
    </article>
  );
}

export default function MagazineJomalone() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-black max-[430px]:bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineDetailHeader />
        <div className="flex flex-col gap-16 pt-[var(--app-header-height)] pb-[174px]">
          <HeroSection />
          <ArticleBody />
        </div>
      </div>
    </main>
  );
}
