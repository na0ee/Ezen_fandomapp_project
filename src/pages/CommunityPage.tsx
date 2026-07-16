import { useState } from "react";
import { Bookmark, ChevronRight, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { HeaderActions as CommonHeaderActions } from "../components/common/HeaderActions";
import { PageLayout } from "../components/common/PageLayout";
import { Tab } from "../components/ui/Tab";
import avatarHaesu from "../assets/community/figma/avatar-haesu.png";
import avatarYeeun from "../assets/community/figma/avatar-yeeun.png";
import carouselFour from "../assets/community/figma/carousel-four.png";
import carouselThree from "../assets/community/figma/carousel-three.png";
import carouselTwo from "../assets/community/figma/carousel-two.png";
import joMalone from "../assets/community/figma/jo-malone.png";
import plusImageOne from "../assets/community/figma/plus-image-one.svg";
import plusImageTwo from "../assets/community/figma/plus-image-two.svg";
import postImageOne from "../assets/community/figma/post-image-one.png";
import postImageTwo from "../assets/community/figma/post-image-two.png";
import rankOne from "../assets/community/figma/rank-one.png";
import rankThree from "../assets/community/figma/rank-three.png";
import rankTwo from "../assets/community/figma/rank-two.png";
import reviewImage from "../assets/community/figma/review-image.png";
import tagFour from "../assets/community/figma/tag-four.png";
import tagOne from "../assets/community/figma/tag-one.png";
import tagThree from "../assets/community/figma/tag-three.png";
import tagTwo from "../assets/community/figma/tag-two.png";

const carouselImages = [
  { src: postImageOne, fit: "object-bottom" },
  { src: carouselTwo, fit: "object-cover" },
  { src: carouselThree, fit: "object-cover" },
  { src: carouselFour, fit: "object-cover" },
];
const tagImagesOne = [
  { src: tagOne, className: "h-[69px] w-[52px]" },
  { src: tagTwo, className: "h-[55px] w-[38px]" },
  { src: tagThree, className: "h-[53px] w-[36px]" },
];
const tagImagesTwo = [
  { src: tagFour, className: "h-[69px] w-[52px]" },
];

function Tabs() {
  return <div className="flex h-[30px] items-center gap-[5px] px-5">
    <Tab className="h-[30px] py-0" isActive label="후기 · 리뷰" />
    <Tab className="h-[30px] py-0" label="질문게시판" />
  </div>;
}

function HotReviews() {
  return <section className="overflow-hidden" data-node-id="891:4456">
    <h2 className="px-5 text-[24px] font-semibold leading-[1.08] tracking-[-0.02em]">오늘의 HOT리뷰</h2>
    <div className="no-scrollbar mt-[30px] flex w-full snap-x snap-mandatory gap-2.5 overflow-x-auto overflow-y-hidden px-5 [scroll-padding-inline:20px]">
      {[joMalone, reviewImage].map((image) => <article className="relative h-[300px] w-[245px] shrink-0 snap-start overflow-hidden rounded-[16px]" key={image}>
        <img className="absolute inset-0 h-full w-full object-cover" src={image} alt="조 말론 향수" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,.5)] to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-5 text-off-white">
          <div><p className="text-xs font-medium tracking-[-0.02em]">JO MALONE LONDON</p><p className="mt-[5px] text-xl font-bold tracking-[-0.02em]">블랙베리 앤 베이 30ml</p></div>
          <div><p className="text-sm opacity-85">파우더리한 플로럴 향</p><p className="text-sm opacity-85">#포근함 #플로럴</p><div className="mt-3 flex items-center gap-1.5 text-sm font-medium">전체보기 <ChevronRight size={18} /></div></div>
        </div>
      </article>)}
    </div>
  </section>;
}

function Post({ second = false }: { second?: boolean }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const title = second ? "하얀 종이에 스며든 포근한 머스크 향" : "햇살 좋은 날의 베이지 룩";
  const tags = second ? ["# 머스크향", "# 살냄새향수", "# 보송한향", "# 은은한향"] : ["# 데일리향수", "# 베이지룩", "# 플로럴머스크", "# 지속력좋아요"];
  return <article className="px-5" data-node-id={second ? "891:4556" : "891:4493"}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img className="h-[53px] w-[53px] rounded-full object-cover" src={second ? avatarHaesu : avatarYeeun} alt="" />
        <div><p className="text-xl font-bold tracking-[-0.02em]">{second ? "최해수" : "예은티비"}</p><p className="mt-[3px] text-xs font-medium text-grey">{second ? "30분 전" : "5분 전"}</p></div>
      </div>
      <MoreHorizontal size={24} />
    </div>
    <div className="mt-[30px] flex flex-col items-center">
      <div className="no-scrollbar relative h-[430px] w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-lg" onScroll={(event) => setActiveSlide(Math.round(event.currentTarget.scrollLeft / 400))}>
        <div className={`flex h-full gap-2.5 ${second ? "w-full" : "w-max"}`}>
          {(second ? [{ src: postImageTwo, fit: "object-cover" }] : carouselImages).map(({ src, fit }) => <img className={`h-full w-[calc(100vw-40px)] max-w-[390px] shrink-0 snap-start rounded-lg ${fit}`} src={src} alt="향수 커뮤니티 리뷰" key={src} />)}
        </div>
        {second ? (
          <img aria-hidden="true" className="absolute left-[70.3%] top-[36.6%] h-[7px] w-[7px]" src={plusImageTwo} alt="" />
        ) : (
          <>
            <img aria-hidden="true" className="absolute left-[31.3%] top-[25.6%] h-[7px] w-[7px]" src={plusImageOne} alt="" />
            <img aria-hidden="true" className="absolute left-[69%] top-[38.4%] h-[7px] w-[7px]" src={plusImageOne} alt="" />
            <img aria-hidden="true" className="absolute left-[54.1%] top-[55.1%] h-[7px] w-[7px]" src={plusImageOne} alt="" />
          </>
        )}
      </div>
      {!second && <div className="relative mt-5 h-0.5 w-[160px] bg-grey"><div className="absolute left-0 top-0 h-0.5 w-10 bg-off-black transition-transform duration-200" style={{ transform: `translateX(${activeSlide * 40}px)` }} /></div>}
    </div>
    <div className="mt-[30px]">
      <h3 className="text-base font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="mt-2.5 text-sm leading-[1.4] tracking-[-0.02em] text-off-black-70">{second ? "처음엔 깨끗하고 보송한 느낌으로 시작하고 시간이 지날수록 피부에 은은하게 남는 머스크 향이 올라와요. 향이 강하게 튀기보다는 가까이 있을 때 부드럽게 느껴지는 향이라 데일리로 쓰기 좋아요." : "따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요. 블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고 마지막엔 잉글리수 페어로 잔향을 남겨줘요. 하루 종일 기분이 좋아지는 조합이에요."}</p>
      <div className="mt-[15px] flex gap-2.5 whitespace-nowrap text-sm tracking-[-0.02em] text-off-black-70">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </div>
    <div className="mt-[30px] flex h-[70px] items-center justify-between overflow-hidden">
      <div className="flex gap-3">{(second ? tagImagesTwo : tagImagesOne).map(({ src, className }) => <div className="flex h-[70px] w-[70px] items-center justify-center rounded-[10px] border border-light-grey bg-off-white" key={src}><img className={`${className} object-contain`} src={src} alt="향수" /></div>)}</div><ChevronRight size={18} className="text-grey" />
    </div>
    <div className="mt-[30px] flex items-center justify-between"><div className="flex gap-4 text-sm"><span className="flex items-center gap-1"><Heart size={24} />42</span><span className="flex items-center gap-1"><MessageCircle size={24} />8</span></div><Bookmark size={24} /></div>
  </article>;
}

function Ranking() {
  const users = [[rankOne, "최해수"], [rankTwo, "김나영"], [rankThree, "조예은"]] as const;
  return <section className="px-5" data-node-id="891:4602"><h2 className="text-[24px] font-semibold leading-[1.08] tracking-[-0.02em]">이번 주 유저랭킹</h2><div className="mt-[30px] flex flex-col gap-[10px]">{users.map(([image, name], index) => <div className="flex items-center justify-between rounded-lg border border-light-grey px-5 py-[15px]" key={name}><div className="flex items-center gap-2.5"><span className="w-2 text-base">{index + 1}</span><img className="h-[49px] w-[49px] rounded-full object-cover" src={image} alt="" /><div className="ml-0.5"><p className="text-base font-semibold">{name}</p><p className="mt-[5px] text-base font-medium text-grey">리뷰왕</p></div></div><span className="rounded-full bg-off-black px-[14px] py-[7px] text-base text-off-white">프로필</span></div>)}</div></section>;
}

export function CommunityPage() {
  return <PageLayout title="커뮤니티" headerAction={<CommonHeaderActions />} contentClassName="gap-0"><div className="mt-6"><Tabs /></div><div className="mt-10 flex flex-col gap-16 pb-8"><HotReviews /><Post /><Post second /><Ranking /></div></PageLayout>;
}
