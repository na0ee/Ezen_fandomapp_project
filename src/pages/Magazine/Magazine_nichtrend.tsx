

import contentGrowthImage from "../../assets/magazine/detail/content-growth.jpg";
import heroImage from "../../assets/magazine/detail/hero.jpg";
import introLeftImage from "../../assets/magazine/detail/intro-left.jpg";
import introRightImage from "../../assets/magazine/detail/intro-right.jpg";
import layeringLeftImage from "../../assets/magazine/detail/layering-left.jpg";
import layeringRightImage from "../../assets/magazine/detail/layering-right.jpg";
import recommendationLeftImage from "../../assets/magazine/detail/recommendation-left.jpg";
import recommendationRightImage from "../../assets/magazine/detail/recommendation-right.jpg";

import { BackHeader } from "../../components/common/BackHeader";
import { HeaderActions } from "../../components/common/HeaderActions";

type ArticleTextProps = {
  body: string;
  bodyClassName?: string;
  title: string;
};

function ArticleText({ body, bodyClassName = "w-full", title }: ArticleTextProps) {
  return (
    <section className="flex w-full flex-col items-start gap-1 px-side text-black [word-break:break-word]">
      <h2 className="w-full text-xl font-bold leading-[normal] tracking-[-0.02em]">{title}</h2>
      <p className={`${bodyClassName} text-base font-medium leading-6 tracking-[-0.02em]`}>{body}</p>
    </section>
  );
}

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
          alt="꽃과 향수로 얼굴을 표현한 니치 향수 화보"
          className="pointer-events-none absolute top-[-57px] left-0 h-[752.5px] w-full object-cover"
          src={heroImage}
        />
      </div>
      <div className="flex w-full items-center px-side">
        <div className="flex flex-1 flex-col items-start gap-[7px]">
          <span className="rounded-chip bg-off-black px-3.5 py-[5px] text-xs leading-[normal] tracking-[-0.02em] text-off-white">
            향수 트렌드
          </span>
          <h2 className="text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">니치향수 트렌드</h2>
        </div>
      </div>
    </section>
  );
}

function ArticleBody() {
  return (
    <div className="flex w-full flex-col items-start gap-[50px]">
      <ArticleText
        body="최근 향수 시장은 대중적인 향수에서 벗어나 자신만의 취향과 개성을 표현할 수 있는 니치 향수 중심으로 빠르게 변화하고 있습니다. 특히 MZ세대를 중심으로 향수를 단순한 향기가 아닌 자신을 표현하는 하나의 아이덴티티로 인식하는 경향이 강해지고 있습니다."
        bodyClassName="w-[369px]"
        title={'"향으로 나를 표현하는 시대"'}
      />

      <div className="flex h-[242px] w-full items-end justify-end gap-2.5 px-side">
        <img alt="꽃 한 송이와 향수" className="h-[154px] w-[124px] shrink-0 object-cover" src={introLeftImage} />
        <div className="h-[242px] w-[222px] shrink-0 overflow-hidden">
          <img
            alt="꽃으로 연출한 니치 향수 화보"
            className="relative top-[-7.44%] left-[-0.09%] h-[114.88%] w-[100.18%] max-w-none"
            src={introRightImage}
          />
        </div>
      </div>

      <ArticleText
        body="과거에는 브랜드 인지도와 대중적인 향이 중요했다면, 최근에는 남들과 다른 향을 찾는 소비자가 증가하고 있습니다. 개성 있는 원료와 독창적인 스토리를 가진 니치 브랜드가 꾸준히 주목받는 이유입니다."
        title="나만의 향을 찾는 소비 증가"
      />

      <div className="flex h-[319px] w-full items-end justify-center px-side">
        <img
          alt="향수와 꽃을 조합한 레이어링 화보"
          className="mr-[-61px] h-[319px] w-[255px] shrink-0 object-cover"
          src={layeringLeftImage}
        />
        <div className="relative h-[138px] w-[166px] shrink-0 overflow-hidden">
          <img
            alt="다양한 향수 보틀"
            className="absolute top-[-50.43%] left-[-0.51%] h-[150.43%] w-[100.29%] max-w-none"
            src={layeringRightImage}
          />
        </div>
      </div>

      <ArticleText
        body="하나의 향수만 사용하는 것이 아니라 여러 향수를 조합하여 자신만의 향을 만드는 레이어링이 새로운 트렌드로 자리 잡고 있습니다. 향수를 직접 조합하며 취향을 탐색하는 경험 자체가 하나의 즐거움으로 인식되고 있습니다."
        title="레이어링 문화 확산"
      />

      <div className="flex h-[336px] w-full items-center justify-center px-side">
        <img alt="푸른 배경의 니치 향수" className="h-[336px] w-[269px] object-cover" src={contentGrowthImage} />
      </div>

      <ArticleText
        body="유튜브, SNS, 커뮤니티를 통해 향수 정보를 탐색하는 사용자가 증가하면서 향수 구매 방식 또한 변화하고 있습니다. 실제 리뷰와 사용자 경험을 기반으로 향수를 선택하는 경향이 강해지고 있습니다."
        title="온라인 향수 콘텐츠 소비 증가"
      />

      <div className="flex h-[250px] w-full items-center gap-2.5 px-side">
        <img
          alt="꽃과 향수로 연출한 추천 화보"
          className="h-[250px] w-[200px] shrink-0 object-cover"
          src={recommendationLeftImage}
        />
        <img
          alt="꽃으로 얼굴을 장식한 향수 화보"
          className="h-[249px] w-[200px] shrink-0 object-cover"
          src={recommendationRightImage}
        />
      </div>

      <ArticleText
        body="수천 개의 향수 중 자신에게 맞는 향을 찾기 어려워지면서 AI 추천, 향수 진단, 사용자 리뷰 등 개인화된 추천 서비스에 대한 수요가 지속적으로 증가하고 있습니다."
        title="취향 기반 추천 서비스의 성장"
      />
    </div>
  );
}

export default function MagazineNichTrend() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-black max-[430px]:bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineDetailHeader />
        <div className="flex flex-col gap-16 pt-[var(--app-header-height)] pb-[162px]">
          <HeroSection />
          <ArticleBody />
        </div>
      </div>
    </main>
  );
}
