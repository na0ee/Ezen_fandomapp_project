// 향수 표시용 공용 데이터 — 이름은 한글, 브랜드는 영어 대문자.
// 여러 페이지(래플·검색·리뷰·위시리스트·랭킹 등)가 여기서 name/brand(및 notes)를 참조해
// 표기를 한 곳에서 일관되게 관리한다. (컨텍스트 값 image/rank/keywords 등은 각 페이지 로컬)

export type Perfume = {
  name: string; // 한글 이름
  brand: string; // 영어 대문자 브랜드
  notes?: string; // 대표 노트 (예: "우디 · 바닐라")
};

export const PERFUMES = {
  lazySundayMorning: { name: "레이지 선데이 모닝", brand: "MAISON MARGIELA FRAGRANCES" },
  lazySundayMorningEdt: { name: "레이지 선데이 모닝 EDT 100ML", brand: "MAISON MARGIELA FRAGRANCES" },
  chasingSunset: { name: "체이싱 선셋 EDT 30ML", brand: "MAISON MARGIELA FRAGRANCES" },
  blackberryBayCologne: { name: "블랙베리 앤 베이 코롱", brand: "JO MALONE LONDON" },
  blackberryBay30: { name: "블랙베리 앤 베이 30ml", brand: "JO MALONE LONDON" },
  gypsyWater: { name: "집시 워터", brand: "BYREDO", notes: "우디 · 바닐라" },
  portraitOfALady: { name: "포트레이트 오브 어 레이디", brand: "FREDERIC MALLE", notes: "로즈 · 앰버" },
  tacit: { name: "타싯", brand: "AESOP", notes: "시트러스 · 허브" },
  another13: { name: "어나더 13", brand: "LE LABO", notes: "머스크 · 앰브록산" },
  angelDiFirenze: { name: "엔젤 디 피렌체 오드코롱 100ml", brand: "SANTA MARIA NOVELLA" },
  loeweAireSutilesa: { name: "로에베 아이레 수틸레사 오 드 뚜왈렛 50ml", brand: "LOEWE PERFUMES" },
  matiereMetalLavender: { name: "마티에 프리미에르 메탈 라벤더 오 드 퍼퓸 50ml", brand: "MATIERE PREMIERE" },
  bvlgariOmniaAmethyst: { name: "불가리 옴니아 아메시스트 오 드 뚜왈렛 100ml", brand: "BVLGARI PERFUME" },
  bulyTriple: { name: "클래식 오 트리쁠 향수 75ml - 이리 드 말트", brand: "BULY" },
  diptyqueFleurDePeau: { name: "플레르 드 뽀 50ml", brand: "DIPTYQUE" },
  chanelNo5: { name: "넘버 파이브", brand: "CHANEL" },
} satisfies Record<string, Perfume>;
