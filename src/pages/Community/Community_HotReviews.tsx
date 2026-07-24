import { useNavigate } from "react-router-dom";
import hotReviewBack from "../../assets/community/figma/hot-review-back.svg";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { Post } from "./CommunityPage";

export default function CommunityHotReviews() {
  const navigate = useNavigate();

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-off-white">
        <header className="fixed left-1/2 top-0 z-50 flex h-[calc(54px+var(--app-safe-top))] w-full max-w-[430px] -translate-x-1/2 items-center bg-off-white px-5 pt-[var(--app-safe-top)]">
          <button aria-label="커뮤니티로 돌아가기" className="flex size-[21px] items-center justify-center" onClick={() => navigate(-1)} type="button">
            <img alt="" aria-hidden="true" className="size-full rotate-180" src={hotReviewBack} />
          </button>
        </header>

        <div className="flex flex-1 flex-col pb-[112px] pt-[calc(54px+var(--app-safe-top))]">
          <div className="flex flex-col gap-[5px] px-5 pt-6 leading-normal text-off-black">
            <p className="text-xs font-medium tracking-[-0.24px]">JO MALONE LONDON</p>
            <h1 className="text-xl font-bold tracking-[-0.4px]">블랙베리 앤 베이 30ml</h1>
          </div>
          <div className="mt-[30px] flex flex-col gap-16 pb-8">
            <Post index={0} />
            <Post index={1} />
          </div>
        </div>

        <BottomNavigation />
      </div>
    </main>
  );
}
