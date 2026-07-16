import { useLayoutEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CommunityQuestion from "./pages/Community/Community_Question";
import CommunitySelect from "./pages/Community/Community_Select";
import CommunityWrite from "./pages/Community/Community_Write";
import { CommunityPage } from "./pages/Community/CommunityPage";
import { EventPage } from "./pages/EventPage";
import { HomePage } from "./pages/HomePage";
import MagazinePage from "./pages/Magazine/Magazine";
import MagazineLastingPower from "./pages/Magazine/Magazine_Lasting power";
import MagazineByredo from "./pages/Magazine/Magazine_BYREDO";
import MagazineDiptyque from "./pages/Magazine/Magazine_DIPTYQUE";
import MagazineFragranceCollection from "./pages/Magazine/Magazine_FragranceCollection";
import MagazineJomalone from "./pages/Magazine/Magazine_JOMALONE";
import MagazineMoreView from "./pages/Magazine/Magazine_MoreView";
import MagazineNichTrend from "./pages/Magazine/Magazine_nichtrend";
import MagazineSeasonal from "./pages/Magazine/Magazine_seasonal";
import { QuestionPage } from "./pages/QuestionPage";
import { ResultPage } from "./pages/ResultPage";
import MyPage from "./pages/Mypage/MyPage";
import MyPerfumePage from "./pages/MyPerfumePage";
import MyReviewsPage from "./pages/MyReviewsPage";
import MyWishlistPage from "./pages/MyWishlistPage";
import SearchResults from "./pages/SearchResults";
import Category from "./pages/Category";
import Search from "./pages/Search";
import UserProfilePage from "./pages/UserProfilePage";
import { RecommendationFeedPage } from "./pages/RecommendationFeedPage";
import { ChallengeListPage } from "./pages/ChallengeListPage";
import { RaffleListPage } from "./pages/RaffleListPage";
import { RaffleDetailPage } from "./pages/RaffleDetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTop = 0;
    root.scrollTop = 0;
    root.style.scrollBehavior = previousScrollBehavior;
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/question" element={<CommunityQuestion />} />
        <Route path="/community/select" element={<CommunitySelect />} />
        <Route path="/community/write" element={<CommunityWrite />} />
        <Route path="/magazine" element={<MagazinePage />} />
        <Route path="/magazine/byredo" element={<MagazineByredo />} />
        <Route path="/magazine/diptyque" element={<MagazineDiptyque />} />
        <Route path="/magazine/fragrance-collection" element={<MagazineFragranceCollection />} />
        <Route path="/magazine/jo-malone" element={<MagazineJomalone />} />
        <Route path="/magazine/more-view" element={<MagazineMoreView />} />
        <Route path="/magazine/niche-trend" element={<MagazineNichTrend />} />
        <Route path="/magazine/perfume-longevity" element={<MagazineLastingPower />} />
        <Route path="/magazine/seasonal-guide" element={<MagazineSeasonal />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/category" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
