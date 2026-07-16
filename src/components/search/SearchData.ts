const lazySundayMorningImage = `${import.meta.env.BASE_URL}assets/perfume/maison-margiela/lazy-sunday-morning.png`;

export const searchTabs = ["전체", "브랜드", "향 계열", "무드"] as const;

export type SearchTab = (typeof searchTabs)[number];

export type PerfumeSummary = {
  id: string;
  brand: string;
  name: string;
  image: string;
  keywords: string[];
};

export const lazySundayMorning: PerfumeSummary = {
  id: "maison-margiela-lazy-sunday-morning",
  brand: "Maison Margiela Fragrances",
  name: "레이지 선데이 모닝",
  image: lazySundayMorningImage,
  keywords: ["#아이리스", "#화이트머스크", "#은방울꽃"],
};
