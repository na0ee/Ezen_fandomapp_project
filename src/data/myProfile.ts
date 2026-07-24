import profileAvatar from "../assets/mypage/avatar.png";
import profileBackground from "../assets/mypage/profile-bg2.jpg";
import { calculateDiagnosis } from "../pages/Onboarding/diagnosis";

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
  badge: "NEWBIE",
  mood: "Mood Shifter",
  points: "1,200",
  followers: 12,
  following: 2,
  avatar: profileAvatar,
  background: profileBackground,
  feedImages: [
    asset("/assets/figma/recommend-my-hero-base.png"),
    asset("/assets/figma/recommend-my-hero-overlay.png"),
  ],
};

export function getMyProfileMood() {
  try {
    const stored = window.localStorage.getItem("layer-onboarding-selections");
    if (!stored) return myProfile.mood;

    const selections = JSON.parse(stored) as {
      perfumeCount?: string;
      moment?: string;
      moments?: string[];
      scent?: string;
      scents?: string[];
      mood?: string;
      method?: string;
    };

    const answers = {
      q1: selections.perfumeCount,
      q2: selections.moments ?? (selections.moment ? [selections.moment] : []),
      q3: selections.scents ?? (selections.scent ? [selections.scent] : []),
      q4: selections.mood,
      q5: selections.method,
    };

    return calculateDiagnosis(answers).result.nameEn;
  } catch {
    return myProfile.mood;
  }
}
