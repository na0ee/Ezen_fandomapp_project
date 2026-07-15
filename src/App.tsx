import { Navigate, Route, Routes } from "react-router-dom";
import { CommunityPage } from "./pages/CommunityPage";
import { EventPage } from "./pages/EventPage";
import { HomePage } from "./pages/HomePage";
import MagazinePage from "./pages/Magazine/Magazine";
import Magazine1 from "./pages/Magazine/Magazine_1";
import Magazine2 from "./pages/Magazine/Magazine_2";
import Magazine3 from "./pages/Magazine/Magazine_3";
import { QuestionPage } from "./pages/QuestionPage";
import { ResultPage } from "./pages/ResultPage";
import MyPage from "./pages/Mypage/MyPage";
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
      <Route path="/magazine/niche-trend" element={<Magazine1 />} />
      <Route path="/magazine/perfume-longevity" element={<Magazine2 />} />
      <Route path="/magazine/seasonal-guide" element={<Magazine3 />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/category" element={<Category />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
