import { Navigate, Route, Routes } from "react-router-dom";
import MagazinePage from "./pages/magazine";
import { QuestionPage } from "./pages/QuestionPage";
import { ResultPage } from "./pages/ResultPage";
import MyPage from "./pages/MyPage";
import SearchResults from "./pages/SearchResults";
import Category from "./pages/Category";
import Search from "./pages/Search";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/search" replace />} />
      <Route path="/magazine" element={<MagazinePage />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/category" element={<Category />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<Navigate to="/search" replace />} />
    </Routes>
  );
}
