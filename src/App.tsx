import { Navigate, Route, Routes } from "react-router-dom";

import { EventPage } from "./pages/EventPage";
import { HomePage } from "./pages/HomePage";
import MagazinePage from "./pages/magazine";
import { QuestionPage } from "./pages/QuestionPage";
import { ResultPage } from "./pages/ResultPage";
import MyPage from "./pages/MyPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/magazine" element={<MagazinePage />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}