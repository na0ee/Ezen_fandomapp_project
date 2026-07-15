import { Navigate, Route, Routes } from "react-router-dom";
import { CommunityPage } from "./pages/CommunityPage";
import { EventPage } from "./pages/EventPage";
import { HomePage } from "./pages/HomePage";
import MagazinePage from "./pages/Magazine/Magazine";
import Magazine1 from "./pages/Magazine/Magazine_1";
import Magazine2 from "./pages/Magazine/Magazine_2";
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/event/challenges" element={<ChallengeListPage />} />
      <Route path="/event/recommend-feed" element={<RecommendationFeedPage />} />
      <Route path="/event/raffles" element={<RaffleListPage />} />
      <Route path="/event/raffles/:raffleId" element={<RaffleDetailPage />} />
      <Route path="/event/recommend-profile/:profileId" element={<UserProfilePage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/magazine" element={<MagazinePage />} />
      <Route path="/magazine/niche-trend" element={<Magazine1 />} />
      <Route path="/magazine/perfume-longevity" element={<Magazine2 />} />
      <Route path="/magazine/seasonal-guide" element={<MagazineSeasonal />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/perfumes" element={<MyPerfumePage />} />
      <Route path="/mypage/wishlist" element={<MyWishlistPage />} />
      <Route path="/mypage/reviews" element={<MyReviewsPage />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/category" element={<Category />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
