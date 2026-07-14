import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MagazinePage } from "./pages/MagazinePage";
import { QuestionPage } from "./pages/QuestionPage";
import { ResultPage } from "./pages/ResultPage";
import { CommunityPage } from "./pages/CommunityPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/magazine" element={<MagazinePage />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
