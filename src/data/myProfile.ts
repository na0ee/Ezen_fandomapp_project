import profileAvatar from "../assets/mypage/avatar.png";
import profileBackground from "../assets/mypage/profile-bg2.jpg";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

// 내 프로필 공용 데이터 — 마이페이지와 추천피드('내 피드')가 같은 값을 쓰도록 한 곳에서 관리
export type MyProfile = {
  id: string;
  name: string;
  badge: string; // 등급
  mood: string; // layer 뱃지
  points: string;
  followers: number;
  following: number;
  avatar: string; // 마이페이지 원형 프로필
  background: string; // 마이페이지 상단 배경
  feedImages: string[]; // 추천피드 '내 피드' 히어로 (base, overlay)
};

export const myProfile: MyProfile = {
  id: "me",
  name: "북극곰",
  badge: "LOVER",
  mood: "Mood Shifter",
  points: "99,999",
  followers: 12,
  following: 2,
  avatar: profileAvatar,
  background: profileBackground,
  feedImages: [
    asset("/assets/figma/recommend-my-hero-base.png"),
    asset("/assets/figma/recommend-my-hero-overlay.png"),
  ],
};
