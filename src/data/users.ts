// 공용 유저 데이터 — 추천 피드, 이벤트 메인 갤러리 등 여러 곳에서 재사용
// 유저 = 유저 이미지 + 유저 이름 + 등급 + layer 뱃지 + 해시태그

export type UserProfile = {
  id: string;
  name: string;
  image: string;
  grade: string;
  layerBadge: string;
  hashtags: string[];
};

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path}`;

// 내 프로필
export const myProfile: UserProfile = {
  id: "me",
  name: "북극곰",
  image: withBase("assets/figma/recommend-my-hero-overlay.png"),
  grade: "LOVER",
  layerBadge: "Mood Shifter",
  hashtags: ["#데일리향수", "#포근한향"],
};

// 다른 유저 프로필
export const otherUsers: UserProfile[] = [
  {
    id: "juhoon",
    name: "Juhoon",
    image: withBase("assets/figma/f14bfcee-7044-4182-b366-ad50ccf0406d.png"),
    grade: "LOVER",
    layerBadge: "Mood Shifter",
    hashtags: ["#밤산책", "#향수추천"],
  },
  {
    id: "katarina",
    name: "katarina",
    image: withBase("assets/recommend/katarina.png"),
    grade: "LOVER",
    layerBadge: "Mood Shifter",
    hashtags: ["#데일리향수", "#플로럴"],
  },
  {
    id: "3an",
    name: "3an",
    image: withBase("assets/recommend/3an.png"),
    grade: "LOVER",
    layerBadge: "Mood Shifter",
    hashtags: ["#우디", "#시크"],
  },
  {
    id: "yujin",
    name: "yujin",
    image: withBase("assets/recommend/yujin.png"),
    grade: "LOVER",
    layerBadge: "Mood Shifter",
    hashtags: ["#시트러스", "#여름"],
  },
  {
    id: "by_sana",
    name: "by_sana",
    image: withBase("assets/recommend/by_sana.png"),
    grade: "LOVER",
    layerBadge: "Mood Shifter",
    hashtags: ["#머스크", "#무드"],
  },
  {
    id: "yawn",
    name: "yawn",
    image: withBase("assets/recommend/yawn.png"),
    grade: "LOVER",
    layerBadge: "Mood Shifter",
    hashtags: ["#포근한향", "#데일리"],
  },
];
