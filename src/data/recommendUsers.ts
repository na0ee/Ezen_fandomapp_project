import carouselThreeImage from "../assets/community/figma/carousel-three.png";
import carouselTwoImage from "../assets/community/figma/carousel-two.png";
import postImageOne from "../assets/community/figma/post-image-one.png";
import postImageTwo from "../assets/community/figma/post-image-two.png";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&q=80`;

export type RecommendUser = {
  id: string;
  name: string;
  badge: string;
  mood: string;
  description: string;
  tags: string[];
  date: string;
  feedImages: string[];
  profileImages: string[];
  cta: string;
  community?: {
    posts: number;
    reviews: number;
    followers: number;
  };
};

export const recommendUsers: RecommendUser[] = [
  {
    id: "story-one",
    name: "ch1g0tn",
    badge: "LOVER",
    mood: "Quiet Signature",
    description:
      "비 오는 날에 어울리는 차분한 향을 찾고 있어요.\n꾸민 듯 안 꾸민 듯 자연스럽게 남는 향이면 좋겠어요.",
    tags: ["#비오는날", "#꾸안꾸"],
    date: "2026.08.08 14:20",
    feedImages: [postImageOne],
    profileImages: [postImageOne],
    cta: "추천하러 가기",
    community: { posts: 12, reviews: 8, followers: 240 },
  },
  {
    id: "story-two",
    name: "Jennie",
    badge: "LOVER",
    mood: "Soft Explorer",
    description:
      "여행지에서 오래 기억나는 향을 찾고 있어요.\n사진처럼 밤 공기와 잘 어울리는 향을 추천해주세요.",
    tags: ["#여행", "#예쁘다"],
    date: "2026.08.08 14:20",
    feedImages: [
      asset("/assets/figma/e7f85eba-5c40-42f9-9816-f5f832b73194.png"),
      asset("/assets/figma/f14bfcee-7044-4182-b366-ad50ccf0406d.png"),
    ],
    profileImages: [
      asset("/assets/figma/e7f85eba-5c40-42f9-9816-f5f832b73194.png"),
      asset("/assets/figma/f14bfcee-7044-4182-b366-ad50ccf0406d.png"),
    ],
    cta: "추천하러 가기",
    community: { posts: 25, reviews: 14, followers: 820 },
  },
  {
    id: "story-three",
    name: "Juhoon",
    badge: "LOVER",
    mood: "Layer Maximalist",
    description:
      "안녕하세요 코르티즈 주훈입니다.\n오늘 저의 사진은 밤산책하다가 마틴이 형이 찍어줬어요!\n저랑 어울리는 향수 추천해주세요!",
    tags: ["#밤산책", "#향수추천"],
    date: "2026.08.08 14:20",
    feedImages: [asset("/assets/figma/b8ae253f-9654-4c82-9435-8a5d7821a8f0.png")],
    profileImages: [asset("/assets/figma/b8ae253f-9654-4c82-9435-8a5d7821a8f0.png")],
    cta: "추천하러 가기",
    community: { posts: 18, reviews: 11, followers: 530 },
  },
  {
    id: "story-four",
    name: "nanana",
    badge: "EXPLORER",
    mood: "Soft Explorer",
    description:
      "여름 저녁 한강 산책에 뿌릴 향을 찾고 있어요.\n가볍지만 너무 흔하지 않은 향이면 좋겠어요.",
    tags: ["#여름", "#서울한강"],
    date: "2026.08.09 09:12",
    feedImages: [carouselTwoImage],
    profileImages: [carouselTwoImage],
    cta: "추천하러 가기",
    community: { posts: 9, reviews: 5, followers: 180 },
  },
  {
    id: "story-five",
    name: "nanana.",
    badge: "LOVER",
    mood: "Daily Basic",
    description:
      "햇빛 좋은 날 편하게 입는 룩에 맞는 향이 궁금해요.\n산뜻하고 오래 남는 향을 좋아합니다.",
    tags: ["#여름스웩", "#한산한날"],
    date: "2026.08.09 11:05",
    feedImages: [postImageTwo],
    profileImages: [postImageTwo],
    cta: "추천하러 가기",
    community: { posts: 7, reviews: 3, followers: 96 },
  },
  {
    id: "story-six",
    name: "lalalala",
    badge: "COLLECTOR",
    mood: "Quiet Signature",
    description:
      "겨울에 니트랑 같이 쓰기 좋은 포근한 향을 찾고 있어요.\n달콤함은 적고 깨끗한 느낌이면 좋겠어요.",
    tags: ["#겨울의향", "#하얀눈"],
    date: "2026.08.10 18:44",
    feedImages: [carouselThreeImage],
    profileImages: [carouselThreeImage],
    cta: "추천하러 가기",
    community: { posts: 15, reviews: 9, followers: 310 },
  },
  {
    id: "story-seven",
    name: "scent.zip",
    badge: "LOVER",
    mood: "Daily Basic",
    description:
      "출근할 때 부담 없이 쓰는 향수를 찾고 있어요.\n비누 향보다는 맑고 정돈된 느낌이면 좋겠습니다.",
    tags: ["#출근향", "#클린"],
    date: "2026.08.11 08:30",
    feedImages: [unsplash("photo-1522335789203-aabd1fc54bc9")],
    profileImages: [unsplash("photo-1522335789203-aabd1fc54bc9")],
    cta: "추천하러 가기",
    community: { posts: 21, reviews: 13, followers: 402 },
  },
  {
    id: "story-eight",
    name: "muskday",
    badge: "EXPLORER",
    mood: "Quiet Signature",
    description:
      "머스크 계열을 좋아하는데 너무 파우더리하지 않았으면 해요.\n살냄새처럼 은은한 향을 추천해주세요.",
    tags: ["#머스크", "#살냄새"],
    date: "2026.08.11 21:16",
    feedImages: [unsplash("photo-1497215728101-856f4ea42174")],
    profileImages: [unsplash("photo-1497215728101-856f4ea42174")],
    cta: "추천하러 가기",
    community: { posts: 6, reviews: 4, followers: 155 },
  },
  {
    id: "story-nine",
    name: "woody_00",
    badge: "COLLECTOR",
    mood: "Bold Signature",
    description:
      "우디 향을 좋아하지만 묵직하기만 한 건 싫어요.\n차분하고 세련된 데일리 우디 향을 찾고 있습니다.",
    tags: ["#우디", "#데일리"],
    date: "2026.08.12 13:07",
    feedImages: [unsplash("photo-1506744038136-46273834b3fb")],
    profileImages: [unsplash("photo-1506744038136-46273834b3fb")],
    cta: "추천하러 가기",
    community: { posts: 30, reviews: 22, followers: 1040 },
  },
  {
    id: "katarina",
    name: "katarina",
    badge: "LOVER",
    mood: "Soft Explorer",
    description:
      "가볍고 화사한 플로럴 향을 찾고 있어요.\n너무 달지 않고 은은하게 남는 향이면 좋겠어요.",
    tags: ["#데일리향수", "#플로럴"],
    date: "2026.08.13 10:20",
    feedImages: [asset("/assets/recommend/katarina.png")],
    profileImages: [asset("/assets/recommend/katarina.png")],
    cta: "추천하러 가기",
    community: { posts: 14, reviews: 7, followers: 320 },
  },
  {
    id: "3an",
    name: "3an",
    badge: "COLLECTOR",
    mood: "Layer Maximalist",
    description:
      "저녁 약속에 어울리는 분위기 있는 향을 찾고 있어요.\n따뜻하고 살짝 스파이시한 느낌이면 좋겠습니다.",
    tags: ["#우디", "#시크"],
    date: "2026.08.13 19:40",
    feedImages: [asset("/assets/recommend/3an.png")],
    profileImages: [asset("/assets/recommend/3an.png")],
    cta: "추천하러 가기",
    community: { posts: 22, reviews: 15, followers: 610 },
  },
  {
    id: "yujin",
    name: "yujin",
    badge: "EXPLORER",
    mood: "Mood Shifter",
    description:
      "낮에 돌아다닐 때 부담 없는 향을 찾고 있어요.\n상큼하면서 깔끔하게 정돈된 향이면 좋겠어요.",
    tags: ["#시트러스", "#여름"],
    date: "2026.08.14 12:05",
    feedImages: [asset("/assets/recommend/yujin.png")],
    profileImages: [asset("/assets/recommend/yujin.png")],
    cta: "추천하러 가기",
    community: { posts: 10, reviews: 6, followers: 275 },
  },
  {
    id: "by_sana",
    name: "by_sana",
    badge: "LOVER",
    mood: "Bold Signature",
    description:
      "밤에 어울리는 무드 있는 향을 찾고 있어요.\n머스크 베이스에 잔향이 오래 남는 향을 좋아합니다.",
    tags: ["#머스크", "#무드"],
    date: "2026.08.14 22:30",
    feedImages: [asset("/assets/recommend/by_sana.png")],
    profileImages: [asset("/assets/recommend/by_sana.png")],
    cta: "추천하러 가기",
    community: { posts: 17, reviews: 10, followers: 480 },
  },
  {
    id: "yawn",
    name: "yawn",
    badge: "EXPLORER",
    mood: "Mood Shifter",
    description:
      "여행 갈 때 챙기기 좋은 포근한 향을 찾고 있어요.\n편안하면서 오래 기억에 남는 향이면 좋겠습니다.",
    tags: ["#포근한향", "#데일리"],
    date: "2026.08.15 08:15",
    feedImages: [asset("/assets/recommend/yawn.png")],
    profileImages: [asset("/assets/recommend/yawn.png")],
    cta: "추천하러 가기",
    community: { posts: 8, reviews: 4, followers: 140 },
  },
];

export const shuffledRecommendUsers = (() => {
  const items = [...recommendUsers];

  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }

  return items;
})();

export function findRecommendUser(id: string | undefined) {
  return recommendUsers.find((user) => user.id === id) ?? recommendUsers[0];
}
