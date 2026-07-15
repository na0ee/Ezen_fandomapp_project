import { Navigate, Route, Routes } from "react-router-dom";
import { CommunityPage } from "./pages/CommunityPage";
import { EventPage } from "./pages/EventPage";
import { HomePage } from "./pages/HomePage";
import MagazinePage from "./pages/Magazine";
import { QuestionPage } from "./pages/QuestionPage";
import { ResultPage } from "./pages/ResultPage";
import MyPage from "./pages/MyPage";
import MyPerfumePage from "./pages/MyPerfumePage";
import MyReviewsPage from "./pages/MyReviewsPage";
import MyWishlistPage from "./pages/MyWishlistPage";
import SearchResults from "./pages/SearchResults";
import Category from "./pages/Category";
import Search from "./pages/Search";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/magazine" element={<MagazinePage />} />
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
