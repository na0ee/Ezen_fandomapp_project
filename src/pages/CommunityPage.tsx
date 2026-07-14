import { useState } from "react";
import { Bookmark, ChevronRight, Heart, MessageCircle, MoreHorizontal, Sparkles, UserRound, Gift, BookOpen, Home } from "lucide-react";
import { PageLayout } from "../components/common/PageLayout";
import { Link } from "react-router-dom";

const joMalone = "https://www.figma.com/api/mcp/asset/c90c5c19-fe2e-43d8-84ad-9f6f1dfe7f57";
const reviewImage = "https://www.figma.com/api/mcp/asset/f4ac2589-7ece-4c45-b856-1ea69e47aa36";
const avatarYeeun = "https://www.figma.com/api/mcp/asset/725e4747-9c32-4622-bc98-492024d977be";
const postImageOne = "https://www.figma.com/api/mcp/asset/4dfc7ec2-0041-479a-b4f7-946224af9ede";
const postImageTwo = "https://www.figma.com/api/mcp/asset/bad2b639-5106-42ee-8f7d-9a897cfece3e";
const plusImageOne = "https://www.figma.com/api/mcp/asset/42e28906-08c6-46f0-84bc-6b8af6c04c27";
const plusImageTwo = "https://www.figma.com/api/mcp/asset/18b337a5-05ca-4f86-b4a3-a033988ebd1e";
const headerSearch = "https://www.figma.com/api/mcp/asset/d9f2383d-317e-4d16-becd-86dddf7124d5";
const headerBell = "https://www.figma.com/api/mcp/asset/c7e742c1-2a8d-4347-98d6-001f8f9aaeb8";
const headerPerfume = "https://www.figma.com/api/mcp/asset/1ea6580b-bb16-4111-a05d-6f8b0c180de3";
const carouselImages = [
  { src: postImageOne, fit: "object-bottom" },
  { src: "https://www.figma.com/api/mcp/asset/ff4656c1-4f44-4c90-8a03-50ad3e875f27", fit: "object-cover" },
  { src: "https://www.figma.com/api/mcp/asset/345b0a80-b0b5-4a22-a388-67950f954a79", fit: "object-cover" },
  { src: "https://www.figma.com/api/mcp/asset/962f8800-9fb7-4263-9a4b-3aeb53f02ecb", fit: "object-cover" },
];
const avatarHaesu = "https://www.figma.com/api/mcp/asset/ee88a390-d6ff-4b7b-ae62-201332253268";
const rankOne = "https://www.figma.com/api/mcp/asset/6a615936-c5e2-4d1e-b06f-efa52d8a4fbd";
const rankTwo = "https://www.figma.com/api/mcp/asset/8c90d0f5-f2d6-4b5c-89c1-c06c62101c42";
const rankThree = "https://www.figma.com/api/mcp/asset/b9bb9142-855b-4161-bc3d-36ec8da59ebf";
const tagImagesOne = [
  { src: "https://www.figma.com/api/mcp/asset/65bb23a8-4a84-47ab-9070-e0665161b5dc", className: "h-[69px] w-[52px]" },
  { src: "https://www.figma.com/api/mcp/asset/a205e116-3764-4ef1-8d80-614cb86dee03", className: "h-[55px] w-[38px]" },
  { src: "https://www.figma.com/api/mcp/asset/8f24847a-d77d-4965-85db-7ac5689191b2", className: "h-[53px] w-[36px]" },
];
const tagImagesTwo = [
  { src: "https://www.figma.com/api/mcp/asset/ba166752-709a-40f2-b02c-113740cbbe91", className: "h-[69px] w-[52px]" },
];

function Header() {
  return (
    <header className="flex h-[54px] items-center justify-between px-5">
      <h1 className="text-[24px] font-semibold leading-[1.08] tracking-[-0.03em]">커뮤니티</h1>
      <div className="flex items-start justify-end gap-5">
        <Link aria-label="검색 페이지" className="size-7" to="/search"><img className="size-7" src={headerSearch} alt="" /></Link>
        <img className="h-7 w-7" src={headerBell} alt="알림" />
        <Link aria-label="카테고리 페이지" className="relative size-7 overflow-hidden" to="/category"><span className="absolute inset-[12.5%]"><span className="absolute inset-[-4.29%]"><img className="block size-full" src={headerPerfume} alt="" /></span></span></Link>
      </div>
    </header>
  );
}

function Tabs() {
  return <div className="flex h-[30px] items-center gap-[5px] px-5">
    <div className="rounded-full bg-off-black px-[14px] py-2 text-xs font-medium tracking-[-0.02em] text-off-white">후기 · 리뷰</div>
    <div className="rounded-full border-[0.8px] border-light-grey px-[14px] py-2 text-xs font-medium tracking-[-0.02em] text-grey">질문게시판</div>
  </div>;
}

function HotReviews() {
  return <section className="overflow-hidden" data-node-id="891:4456">
    <h2 className="px-5 text-[24px] font-semibold leading-[1.08] tracking-[-0.03em]">오늘의 HOT리뷰</h2>
    <div className="no-scrollbar mt-[30px] flex w-full snap-x snap-mandatory gap-2.5 overflow-x-auto overflow-y-hidden pl-[20px] pr-[20px]" style={{ scrollPaddingInline: "20px" }}>
      {[joMalone, reviewImage].map((image) => <article className="relative h-[300px] w-[245px] shrink-0 snap-start overflow-hidden rounded-[16px]" key={image}>
        <img className="absolute inset-0 h-full w-full object-cover" src={image} alt="조 말론 향수" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,.5)] to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-5 text-white">
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
          {(second ? [{ src: postImageTwo, fit: "object-cover" }] : carouselImages).map(({ src, fit }) => <img className={`h-full w-[390px] shrink-0 snap-start rounded-lg ${fit}`} src={src} alt="향수 커뮤니티 리뷰" key={src} />)}
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
      <p className="mt-2.5 text-sm leading-[1.25] tracking-[-0.02em] text-[#4d4d4d]">{second ? "처음엔 깨끗하고 보송한 느낌으로 시작하고 시간이 지날수록 피부에 은은하게 남는 머스크 향이 올라와요. 향이 강하게 튀기보다는 가까이 있을 때 부드럽게 느껴지는 향이라 데일리로 쓰기 좋아요." : "따뜻한 햇살엔 부드럽고 깨끗한 향이 잘 어울리는 것 같아요. 블랑쉬로 포근하게 시작해서 오 로즈로 기분 전환해주고 마지막엔 잉글리수 페어로 잔향을 남겨줘요. 하루 종일 기분이 좋아지는 조합이에요."}</p>
      <div className="mt-[15px] flex gap-2.5 whitespace-nowrap text-sm tracking-[-0.02em] text-[#4d4d4d]">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </div>
    <div className="mt-[30px] flex h-[70px] items-center justify-between overflow-hidden">
      <div className="flex gap-3">{(second ? tagImagesTwo : tagImagesOne).map(({ src, className }) => <div className="flex h-[70px] w-[70px] items-center justify-center rounded-[10px] border border-light-grey bg-white" key={src}><img className={`${className} object-contain`} src={src} alt="향수" /></div>)}</div><ChevronRight size={18} className="text-grey" />
    </div>
    <div className="mt-[30px] flex items-center justify-between"><div className="flex gap-4 text-sm"><span className="flex items-center gap-1"><Heart size={24} />42</span><span className="flex items-center gap-1"><MessageCircle size={24} />8</span></div><Bookmark size={24} /></div>
  </article>;
}

function Ranking() {
  const users = [[rankOne, "최해수"], [rankTwo, "김나영"], [rankThree, "조예은"]] as const;
  return <section className="px-5" data-node-id="891:4602"><h2 className="text-[24px] font-semibold leading-[1.08] tracking-[-0.03em]">이번 주 유저랭킹</h2><div className="mt-[30px] flex flex-col gap-5">{users.map(([image, name], index) => <div className="flex items-center justify-between rounded-lg border border-light-grey px-5 py-[15px]" key={name}><div className="flex items-center gap-2.5"><span className="w-2 text-base">{index + 1}</span><img className="h-[49px] w-[49px] rounded-full object-cover" src={image} alt="" /><div className="ml-0.5"><p className="text-base font-semibold">{name}</p><p className="mt-[5px] text-base font-medium text-grey">리뷰왕</p></div></div><span className="rounded-full bg-off-black px-[14px] py-[7px] text-base text-white">프로필</span></div>)}</div></section>;
}

function CommunityNavigation() {
  const items = [[Home, "홈"], [Gift, "이벤트"], [MessageCircle, "커뮤니티"], [BookOpen, "매거진"], [UserRound, "마이"]] as const;
  return <div className="sticky bottom-0 z-10 flex gap-2.5 bg-white/90 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md"><nav className="flex h-[72px] flex-1 items-center justify-between rounded-[40px] border-[0.6px] border-light-grey bg-off-black px-[18px] py-[15px]">{items.map(([Icon, label], index) => <div className={`flex w-[38px] flex-col items-center gap-1 text-xs font-medium tracking-[-0.02em] ${index === 2 ? "text-white" : "text-light-grey"}`} key={label}><Icon size={24} /><span>{label}</span></div>)}</nav><div className="flex h-[72px] w-[58px] shrink-0 flex-col items-center justify-center gap-1 rounded-full bg-off-black text-xs text-white"><Sparkles size={24} /><span>AI</span></div></div>;
}

export function CommunityPage() {
  return <PageLayout showNavigation={false} contentClassName="gap-0"><Header /><div className="mt-6"><Tabs /></div><div className="mt-10 flex flex-col gap-16 pb-8"><HotReviews /><Post /><Post second /><Ranking /></div><CommunityNavigation /></PageLayout>;
}
