# LAYER 최종 코딩 · 디자인 시스템 가이드

향수 커뮤니티 앱 **LAYER**를 React, TypeScript, Tailwind CSS로 구현하기 위한 최종 통합 문서입니다.  
기존 MD 파일 3개의 내용을 중복 없이 하나의 기준 문서로 합쳤습니다.

## 1. 프로젝트 개요

- 프로젝트명: LAYER
- 서비스 성격: 향수 커뮤니티 앱
- 슬로건: 향이 겹쳐, 취향이 되는 곳
- 기본 구현 화면: 홈
- 주요 범위: 홈, 매거진, 향수 취향 질문, 결과 페이지, 챌린지, 랭킹, 선물, AI 진단 진입
- 기준 디자인: Figma `2차프로젝트 1조`
- Figma file key: `IvcW6SPHq9jtfrSTM8IK0F`
- 공통 컴포넌트 기준 노드: `640:8527` / `기본 컴포넌트`
- 홈 기준 노드: `726:6574` / `main최종`
- 피드백 기준 노드: `723:10196` / `피드백 받는 곳`
- 매거진 기준 노드: `739:9253` / `매거진`
- 질문 Q2 기준 노드: `763:16278` / `질문 페이지_Q2`
- 질문 Q3 기준 노드: `887:4348` / `질문 페이지_Q3`
- 질문 Q4 기준 노드: `763:16320` / `질문 페이지_Q4`
- 결과 기준 노드: `763:16356` / `유형 결과`
- Figma 링크: `https://www.figma.com/design/IvcW6SPHq9jtfrSTM8IK0F/2%EC%B0%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-1%EC%A1%B0?node-id=723-10196`
- 기술 스택: React, TypeScript, Tailwind CSS, lucide-react, Figma MCP

## 2. 코딩 시작 전 프롬프트

코딩 시작 전 아래 프롬프트를 먼저 사용합니다.

```txt
향수 커뮤니티 앱 LAYER를 React + TypeScript + Tailwind CSS로 구현한다.

반드시 Figma MCP를 연결한 상태에서 작업한다.
작업 대상 화면의 Figma node ID를 먼저 확인하고, 화면/섹션/컴포넌트 단위로 하나씩 MCP로 확인한다.

인터랙션 구현보다 레이아웃 구현을 먼저 한다.
처음에는 클릭, 슬라이드, 애니메이션, 상태 변화 로직을 넣지 말고 Figma 기준의 화면 구조, 여백, 크기, 폰트, 색상, 카드 비율, 이미지 배치부터 맞춘다.

모든 화면은 공통 wrap 구조로 감싸고, 화면 높이는 반드시 100dvh 기준으로 가득 채운다.
좌우 여백 20px, 섹션 간격 64px, 섹션 타이틀과 콘텐츠 사이 간격 30px을 기본값으로 한다.

Figma에 등록된 스타일과 변수, 컴포넌트명을 우선 사용한다.
임의 색상, 임의 폰트 크기, 임의 간격, 임의 radius를 만들지 않는다.
코드 토큰명은 camelCase로 통일한다.
Pretendard 텍스트 토큰 자간은 -2%로 통일한다.
아이콘은 lucide-react를 우선 사용하고, Figma SVG를 그대로 export해서 일반 UI 아이콘으로 사용하지 않는다.
```

## 3. 작업 원칙

1. Figma MCP를 항상 먼저 연결한다.
2. 화면 전체를 추측해서 만들지 않고, 노드 단위로 확인하며 구현한다.
3. 레이아웃을 먼저 만들고 인터랙션은 나중에 붙인다.
4. 공통 구조와 공통 컴포넌트를 먼저 만든다.
5. 등록된 Figma 스타일, 변수, 컴포넌트명을 우선한다.
6. 기존 팀 Tailwind 설정이 있으면 먼저 사용하고, 없는 토큰만 추가한다.
7. 모바일 기준 화면을 먼저 맞추고 이후 반응형을 확인한다.
8. 반복되는 UI는 공통 컴포넌트로 분리한다.
9. 공통요소의 class명과 구조는 페이지마다 다르게 만들지 않는다.
10. 작업 완료 후 변경 파일과 변경 내용을 짧게 요약한다.

## 4. AI 작업 규칙

1. 공통요소인 네비바, 헤더, 섹션 텍스트는 모든 페이지에서 class명과 구조를 동일하게 유지한다.
2. 공통요소의 스타일을 수정해야 할 때는 먼저 아래처럼 확인한다.

```txt
이건 공통요소라서 수정하면 모든 페이지에 동시에 적용돼요.
전체 변경이 맞나요, 아니면 이 페이지만 예외로 새 클래스를 만들까요?
```

3. 새 화면을 만들 때는 먼저 아래처럼 확인한다.

```txt
새 페이지로 등록할까요, 아니면 기존 페이지 안에 섹션으로 넣을까요?
```

4. 페이지 구조는 팀 프로젝트 기준을 우선한다. 기존 프로젝트가 `index / event / category / mypage` 구조라면 그 구조를 유지하고, React 페이지 컴포넌트명만 역할에 맞게 연결한다.
5. 색상, 폰트, 간격은 등록된 토큰을 우선 사용한다.
6. 미등록 로컬 값은 전역 토큰으로 승격하지 않고 해당 컴포넌트에서만 사용한다.
7. 인라인 스타일은 금지한다. 동적 진행률처럼 불가피한 경우만 예외로 허용한다.
8. 페이지 추가나 라우팅 변경 시 하단 네비 active 상태까지 같이 처리한다.
9. 작업 완료 후 변경 파일과 변경 내용을 2~3줄로 남긴다.

## 5. 디바이스 · 화면 높이 · 반응형

### 기본 기준

| 항목 | 값 |
| --- | --- |
| 기본 프레임 | 430px |
| 필수 대응 최소 | 390px |
| 작은 휴대폰 보정 | 360px 이하 |
| 태블릿/데스크톱 | 후반 확장 여지만 남김 |

- 컨테이너는 `w-full max-w-[430px] mx-auto`로 잡는다.
- 페이지 전체를 `w-[430px]`로 고정하지 않는다.
- 내부 요소는 고정폭보다 `w-full`과 좌우 padding을 우선한다.
- 390px에서 깨지는 `w-[394px]` 같은 고정폭은 피하고 `w-full`로 전환한다.
- 360px 이하에서는 좌우 여백을 예외적으로 16px까지 줄일 수 있다.

### 100dvh 필수

앱 화면은 항상 화면 높이를 꽉 채워야 합니다.  
모바일 브라우저 주소창 때문에 `100vh`는 잘림이나 불필요한 스크롤이 생길 수 있으므로 `100dvh`를 우선합니다.

```css
html,
body,
#root {
  height: 100%;
}

body {
  min-height: 100vh;
  min-height: 100dvh;
}
```

Tailwind에서는 `min-h-dvh`를 기본으로 사용합니다.

```tsx
<main className="min-h-dvh bg-offWhite">
  <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-offWhite">
    {/* page content */}
  </div>
</main>
```

### viewport · safe-area

`index.html`에는 아래 메타 태그를 적용합니다.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

하단 고정 요소는 safe-area를 고려합니다.

```tsx
<nav className="pb-[env(safe-area-inset-bottom)]">
  ...
</nav>
```

## 6. 공통 구조

모든 화면은 `Page` 안에 `wrap`을 둡니다.

```tsx
<main className="min-h-dvh bg-offWhite">
  <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-offWhite">
    <Header />
    <div className="wrap flex flex-1 flex-col gap-[64px] px-5">
      <section />
      <section />
      <section />
    </div>
    <BottomNavigation />
  </div>
</main>
```

구조 네이밍:

- 페이지 루트: `HomePage`, `MagazinePage`, `QuestionPage`, `ResultPage`
- 전체 래퍼: `PageWrap` 또는 `wrap`
- 섹션: `section`
- 섹션 내부: `inner`
- 리스트: `list`
- 카드: `card`
- 텍스트 그룹: `txtbox`
- 하단 내비게이션: `BottomNavigation`

StatusBar는 실제 서비스 구현에서는 기본적으로 만들지 않습니다. Figma 시안 확인용으로만 필요할 때 별도 판단합니다.

## 7. 핵심 간격

| 항목 | 값 | Tailwind 기준 |
| --- | ---: | --- |
| 좌우 여백 | 20px | `px-5` |
| 질문/결과 페이지 예외 여백 | 18px | `px-[18px]` |
| 섹션 간 간격 | 64px | `gap-16`, `space-y-16`, `gap-[64px]` |
| 섹션 타이틀과 콘텐츠 사이 | 30px | `mt-[30px]`, `gap-[30px]` |
| 카드 리스트 간격 | 10px | `gap-[10px]` |
| 타이틀 내부 제목/부제 간격 | 6px | `gap-1.5` |
| 하단 메뉴 아이콘/텍스트 간격 | 4px | `gap-1` |

섹션 표준:

```tsx
<section>
  <SectionTitle />
  <div className="mt-[30px]">
    {/* content */}
  </div>
</section>
```

## 8. 토큰 네이밍 규칙

Figma 토큰명은 `/`, `-`, 대소문자가 섞여 있어 그대로 코드 키로 쓰지 않습니다.  
React, TypeScript, Tailwind config, token 객체에서는 **camelCase**로 통일합니다.

| 대상 | 표기법 | 예시 |
| --- | --- | --- |
| 코드 토큰 | camelCase | `offBlack`, `pointOrange`, `titleGap` |
| TS 변수/함수/props | camelCase | `isActive`, `handleClick`, `onMoreClick` |
| 컴포넌트 파일/이름 | PascalCase | `CtaButton.tsx`, `SectionTitle` |
| 예외 CSS 공통 클래스 | kebab-case 또는 짧은 고정명 | `.gnb`, `.header`, `.section-title` |
| SVG/이미지 asset 파일 | kebab-case | `layer-logo.svg`, `perfume-card-bg.png` |

주의:

- 색상 토큰을 `offblack`, `offBlack`, `off-black`처럼 섞지 않는다.
- 코드 기준은 `offBlack`처럼 camelCase를 우선한다.
- 기존 팀 CSS에서 `.gnb`, `.header`, `.section-title`을 이미 쓰고 있다면 공통요소 class명은 그대로 유지한다.
- Tailwind v4 `@theme` 변수명은 CSS 관례에 맞게 kebab-case를 사용할 수 있지만, TS/React 코드에서 참조하는 token key는 camelCase로 통일한다.

## 9. 컬러

### 등록 색상

| Figma 이름 | 코드 이름 | 값 | 용도 |
| --- | --- | --- | --- |
| `color/offblack` | `offBlack` | `#1A1A1A` | 기본 텍스트, 다크 배경, CTA, 활성 탭 |
| `color/offwhite` | `offWhite` | `#FFFFFF` | 기본 배경, 다크 배경 위 텍스트 |
| `color/grey`, `grey2` | `grey` | `#8A8A8A` | 보조 텍스트, 비활성, disabled CTA |
| `color/light-grey` | `lightGrey` | `#DDDDDD` | 보더, 비활성 텍스트, 인디케이터 |
| 화면 내 사용 확인 | `light2Grey` | `#EBEBEB` | 연한 보더, 보조 구분선 |
| `color/point-orange` | `pointOrange` | `#FF4800` | 포인트, 선택 하트, badge 텍스트 |
| opacity 사용 | `pointOrange40` | `rgba(255, 72, 0, 0.4)` | badge 배경 |
| opacity 사용 | `offBlack70` | `rgba(26, 26, 26, 0.7)` | 다크 glass, 설명 텍스트 |
| opacity 사용 | `offWhite70` | `rgba(255, 255, 255, 0.7)` | 밝은 overlay |
| 시스템 | `black` | `#000000` | CTA 배경 |

### 로컬 색상

아래 값은 전역 토큰으로 남발하지 않고 해당 컴포넌트에서만 사용합니다.

| 값 | 용도 |
| --- | --- |
| `#D9D9D9` | 진행바/슬라이드 인디케이터 track |
| `#FFBB00` | 별점 전용 |
| `#BEBEBE` | 일부 카드 border |

로컬 색상 원칙:

- yellow `#FFBB00`은 별점 전용으로 사용한다.
- 인디케이터 track `#D9D9D9`는 진행바/인디케이터 전용으로 사용한다.
- 로컬 값은 여러 화면에서 반복 사용이 확정되기 전까지 토큰으로 등록하지 않는다.
- 단, 이미 팀 설정에 같은 값이 토큰으로 존재하면 기존 토큰을 사용한다.

### Tailwind 예시

```ts
colors: {
  offBlack: "#1A1A1A",
  offWhite: "#FFFFFF",
  grey: "#8A8A8A",
  lightGrey: "#DDDDDD",
  light2Grey: "#EBEBEB",
  pointOrange: "#FF4800",
  pointOrange40: "rgba(255, 72, 0, 0.4)",
  offBlack70: "rgba(26, 26, 26, 0.7)",
  offWhite70: "rgba(255, 255, 255, 0.7)",
  black: "#000000",
}
```

Tailwind CSS v4 `@theme` 예시:

```css
@import "tailwindcss";

@theme {
  --color-off-black: #1a1a1a;
  --color-off-white: #ffffff;
  --color-grey: #8a8a8a;
  --color-light-grey: #dddddd;
  --color-light2-grey: #ebebeb;
  --color-point-orange: #ff4800;

  --font-pretendard: "Pretendard Variable", "Pretendard", sans-serif;
  --font-cormorant: "Cormorant Garamond", serif;

  --spacing-side: 20px;
  --spacing-section: 64px;
  --spacing-title-gap: 30px;
}
```

## 10. Glass · Gradient · Effect

### Glass

유리 표현은 아래 두 클래스로 통일합니다.

| 클래스 | 스타일 | 용도 |
| --- | --- | --- |
| `.glass` | `bg-white/60`, `backdrop-blur-[20px]`, `border-white/40` | 밝은 배경 위 카드/오버레이 |
| `.glassDark` | `bg-offBlack/70`, `backdrop-blur-[20px]`, `border-lightGrey/40` | 이미지 위 플로팅 요소 |

radius는 glass 클래스 안에 넣지 않고 사용처에서 조합합니다.

### Gradient

그라디언트는 Figma에서 해당 화면 노드를 MCP로 확인한 뒤 `backgroundImage`에 등록합니다.  
이름은 camelCase로 작성합니다.

```ts
backgroundImage: {
  perfumeCardGradient: "linear-gradient(...)",
}
```

미확인 gradient를 임의로 만들지 않습니다.

## 11. 타이포그래피

### 폰트 로딩

- Pretendard: CDN 웹폰트 사용
- Cormorant Garamond: Google Fonts 사용
- 두 폰트 모두 Tailwind `fontFamily`에 등록

```ts
fontFamily: {
  pretendard: ["Pretendard", "Pretendard Variable", "sans-serif"],
  cormorant: ["Cormorant Garamond", "serif"],
}
```

### CTA 라벨 언어 분기

- 영문 라벨: Cormorant Garamond Bold
- 한글 라벨: Pretendard SemiBold

```tsx
const isKorean = /[가-힣]/.test(label);
```

### 텍스트 스타일

Pretendard를 사용하는 텍스트 토큰은 자간을 모두 `-2%`로 통일합니다.  
Figma 특정 노드에서 `-3%`, `-4%`가 내려오더라도 코드 기준은 `tracking-[-0.02em]`입니다.

| Figma 스타일명 | 코드 이름 | 폰트 | 크기/굵기 | 자간 | 용도 |
| --- | --- | --- | --- | --- | --- |
| `title_en` | `titleEn` | Cormorant Garamond | 28px / 700 | -2% | 영문 섹션 타이틀 |
| `title/bold-30px` | `titleBold30` | Pretendard | 30px / 700 | -2% | 큰 한글 타이틀 |
| `title/semibold-24px` | `title24` | Pretendard | 24px / 600 | -2% | 섹션/상세 타이틀 |
| `title/bold-20px` | `titleBold20` | Pretendard | 20px / 700 | -2% | 카드 타이틀 |
| `title/medium-20px` | `titleMedium20` | Pretendard | 20px / 500 | -2% | 중간 타이틀 |
| `body2/regular-18px` | `body18` | Pretendard | 18px / 400 | -2% | 큰 본문 |
| `subTitle/medium-16px` | `subtitle16` | Pretendard | 16px / 500 | -2% | 섹션 부제 |
| `subTitle/semibold-16px` | `subtitleSemi16` | Pretendard | 16px / 600 | -2% | 강조 부제 |
| `body1/medium-14px` | `body14` | Pretendard | 14px / 500 | -2% | 본문, 전체보기 |
| `body1/regular-14px` | `bodyRegular14` | Pretendard | 14px / 400 | -2% | 보조 본문 |
| `caption/medium-12px` | `caption12` | Pretendard | 12px / 500 | -2% | 탭, 네비 라벨 |
| `caption/regular-12px` | `captionRegular12` | Pretendard | 12px / 400 | -2% | 칩, 보조 정보 |
| `caption/bold-12px` | `captionBold12` | Pretendard | 12px / 700 | -2% | 강조 caption |
| badge 전용 | `badgeText` | Pretendard | 10px / 600 | -2% | Badge 내부 |

```ts
const textStyles = {
  titleEn: "font-cormorant text-[28px] font-bold leading-none tracking-[-0.02em]",
  title24: "font-pretendard text-2xl font-semibold leading-[1.08] tracking-[-0.02em]",
  subtitle16: "font-pretendard text-base font-medium leading-none tracking-[-0.02em]",
  body14: "font-pretendard text-sm font-medium leading-none tracking-[-0.02em]",
  caption12: "font-pretendard text-xs font-medium leading-none tracking-[-0.02em]",
};
```

line-height:

- 단일 라인 텍스트: `leading-none`
- 멀티라인 한글 본문: `leading-[1.4]` 또는 `leading-[1.5]`

## 12. Radius

| 코드 이름 | 값 | 용도 |
| --- | ---: | --- |
| `badgeRadius` | 4px | Badge |
| `cardRadius` | 8px | 기본 카드 |
| `questionRadius` | 15px | 질문/결과 이미지 |
| `chipRadius` | 16px | Chip |
| `magazineRadius` | 24px | 매거진/선물 카드 |
| `ctaRadius` | 32px | CTA |
| `navRadius` | 40px | 하단 네비 |
| `pillRadius` | 999px | Tab, AI 버튼 |

## 13. 아이콘

아이콘은 `lucide-react`로 통일합니다.

- Figma SVG를 그대로 export해서 일반 UI 아이콘으로 사용하지 않는다.
- 여러 사이트나 아이콘 라이브러리에서 긁어온 SVG를 섞어 쓰지 않는다.
- Figma에서 보이는 일반 UI 아이콘은 먼저 `lucide-react`에서 같은 의미의 아이콘을 찾는다.
- 기본 크기는 24px.
- 작은 보조 아이콘은 18px 또는 20px.
- 별점처럼 시안에서 14px로 확인된 아이콘은 해당 컴포넌트에서만 예외로 14px 사용.
- stroke width, color, active 상태는 props로 제어한다.
- 향수 로고, 브랜드 전용 그래픽, lucide에 없는 특수 아이콘만 예외 asset 사용을 허용한다.
- 예외 asset은 `components/icons` 아래 래핑 컴포넌트로 만들고 사용 이유를 남긴다.
- 같은 의미의 아이콘을 페이지마다 다시 만들지 않는다.
- 하단 네비 active 상태는 아이콘과 라벨 색상을 함께 바꾼다.

```tsx
import { ChevronRight, Gift, Heart, Home, MessageCircle, Sparkles, User } from "lucide-react";

<Heart
  size={24}
  color={isSelected ? theme.colors.pointOrange : theme.colors.offBlack}
  fill={isSelected ? theme.colors.pointOrange : "none"}
/>
```

## 14. 공통요소

공통요소는 모든 페이지에서 구조와 class명을 통일합니다.  
공통요소를 수정하면 모든 페이지에 동시에 적용됨을 먼저 확인합니다.

### Header

- class: `.header`
- 좌우 여백: 20px
- 홈: 로고 `Layer`
- 상세/매거진: 페이지 타이틀
- 우측 액션: 검색, 알림, 가격 필터 등
- 가격 필터 예시: faders horizontal 아이콘 16px + `가격` caption + gap 6px
- 상단 safe-area가 필요하면 `pt-[env(safe-area-inset-top)]` 적용

### SectionTitle

홈형 `title-box` 기준:

- class: `.section-title`
- 좌우 padding: 20px
- 좌측: 타이틀 그룹
- 우측: `전체보기` + chevron
- 제목/부제 간격: 6px
- 영문 제목: Cormorant Garamond 28px Bold
- 부제: Pretendard 16px Medium
- 더보기: Pretendard 14px Medium, `grey`, chevron 18px

상세형 Section Head:

- 한글 타이틀: Pretendard 24px SemiBold
- line-height: 1.08
- variant: 타이틀 단독 또는 타이틀 + 전체보기

### BottomNavigation

- class: `.gnb`
- 메인 네비 5탭 + AI 버튼 분리형
- 탭: 홈, 이벤트, 커뮤니티, 매거진, 마이
- AI 버튼: sparkles 아이콘 + `AI`
- 메인 배경: `offBlack`
- radius: 40px
- padding: `15px 18px`
- border: `0.6px lightGrey`
- 탭 항목 폭: 38px
- 아이콘: 24px
- 라벨: 12px Medium
- 아이콘/텍스트 gap: 4px
- 네비/AI 사이 gap: 10px
- active: `offWhite`
- inactive: `lightGrey`
- 하단 고정 시 safe-area padding 적용

공통요소 class 원칙:

- `.gnb`, `.header`, `.section-title`은 페이지마다 이름을 바꾸지 않는다.
- 공통요소 수정은 전체 페이지 변경으로 간주한다.
- 페이지 전용 예외가 필요하면 기존 공통 class를 덮어쓰지 말고 별도 variant나 별도 wrapper를 만든다.

## 15. UI 컴포넌트

### CtaButton

| 상태 | 스타일 |
| --- | --- |
| default | `bg-offBlack border border-offBlack text-offWhite` |
| disabled | `bg-grey text-offWhite`, border 없음 |
| outline | `bg-offWhite border border-pointOrange text-pointOrange` |

- 높이: 50px
- radius: 32px
- 기본 폭: 부모 기준 `w-full`
- 좌우 padding: 40px
- 상하 padding: 16px
- Figma 고정폭 394px은 모바일 최대폭 안에서만 참고
- 라벨 폰트는 언어 분기 규칙 적용

### Chip

| variant | 스타일 |
| --- | --- |
| filled | `bg-offBlack text-offWhite` |
| disabled | `bg-lightGrey text-offWhite` |
| outline | `bg-offWhite border border-offBlack text-offBlack` |

- radius: 16px
- padding: `5px 14px`
- 텍스트: 12px Regular

### Tab

| 상태 | 스타일 |
| --- | --- |
| active | `bg-offBlack text-offWhite` |
| inactive | `bg-offWhite border-[0.8px] border-lightGrey text-grey` |

- radius: pill
- padding: `8px 14px`
- 텍스트: 12px Medium

### Badge

- 높이: 20px
- padding: 좌우 8px
- radius: 4px
- 배경: `pointOrange40` 또는 `bg-pointOrange/40`
- 텍스트: `pointOrange`, Pretendard 10px SemiBold

### SlideIndicator

- track: `#D9D9D9`, 높이 2px
- active: `offBlack` 또는 상황에 따라 `pointOrange`
- mini: 120px 기준
- full: 부모 폭 기준
- 진행률은 props로 제어

### HeartButton

- 크기: 24px
- default: `Heart`, `offBlack`, fill 없음
- selected: `Heart`, `pointOrange`, fill `pointOrange`
- 실제 구현은 `button`
- `aria-pressed` 연결
- prop: `isSelected`

### Star

- 크기: 14px
- 색상: `#FFBB00`
- 별점 전용 로컬 값으로 사용

## 16. 페이지별 기준

### 홈

기준 노드: `main최종` / `726:6574`

- 첫 구현 화면
- Header 높이: 약 54px
- wrap: Header 아래부터 시작
- 섹션 간격: 64px
- Hero 높이: 536px
- BottomNavigation: 하단 고정
- Header: 높이 약 54px, 좌우 20px
- StatusBar: Figma 시안에는 약 65px로 보일 수 있으나 실제 구현에서는 제외

섹션:

- Hero
  - 전체 폭 430px 기준
  - 이미지/비디오 영역 536px
  - 중앙 로고 `LAYER`
  - CTA 폭은 부모 기준으로 반응형 처리
- TODAY'S Scent
  - 좌우 20px
  - 타이틀/콘텐츠 사이 30px
  - 영문 타이틀 `titleEn`
- Challenge
  - 카드 폭 190px
  - 카드 높이 340px
  - radius 8px
  - border 0.5px `#BEBEBE`
  - horizontal scroll
- TODAY'S Rank
  - 탭 리스트 상단 배치
  - 상품 카드 폭 262px
  - 상품 카드 높이 288px
  - horizontal scroll
- Magazine
  - 카드 폭 368px
  - 높이 520px
  - radius 24px
  - 내부 정보 박스 radius 20px
  - padding 16px
- Gift
  - 이미지 폭은 부모 기준
  - Figma 기준 390px x 469px
  - radius 24px

### 매거진

기준 노드: `매거진` / `739:9253`

- Header title: `매거진`
- 섹션 좌우 여백: 20px
- 섹션 타이틀: `title24`
- 타이틀/콘텐츠 간격: 30px

섹션:

- 향수 트렌드: 배너 390px x 177px, radius 8px
- 많이 읽은 글: 카테고리 탭, 카드 폭 262px, 이미지 높이 190px
- 브랜드 스토리: 카드 368px x 520px, radius 24px
- 더 둘러보기: 카드 262px x 288px, gradient overlay 사용

### 질문

기준 노드:

- `질문 페이지_Q2` / `763:16278`
- `질문 페이지_Q3` / `887:4348`
- `질문 페이지_Q4` / `763:16320`

규칙:

- 좌우 여백: 18px
- 콘텐츠 폭: 394px 기준이지만 실제 구현은 `w-full`
- 진행바 track: `#D9D9D9`
- 진행바 active: `pointOrange`
- 진행바 높이: 2px
- 질문 제목: `Q2.`는 Cormorant Garamond Bold, 문장은 Pretendard Medium
- 질문 문장 크기: 26px
- line-height: 1.5
- 설명 텍스트: 16px Medium, `offBlack70` 계열
- 질문 칩: 3열 grid
- 칩 높이: 100px, 작은 화면에서 `min-h-[92px]` 허용
- CTA: 높이 50px, radius 32px
- Skip: 하단 중앙, Cormorant Garamond Medium, 12px

### 결과

기준 노드: `유형 결과` / `763:16356`

- 좌우 여백: 18px
- 콘텐츠 폭: 394px 기준이지만 실제 구현은 `w-full`
- 상단 이미지: 약 394px x 259px, radius 15px
- 결과명 한글: Pretendard Medium 16px, `offBlack70`
- 결과명 영문: Cormorant Garamond SemiBold Italic, 54px
- 태그: black background, radius 30px, padding `3px 10px`, font 10px
- 설명: Pretendard Medium 14px, `offBlack70`
- 성향 바: label 12px Regular, line `lightGrey`, dot `pointOrange` 또는 `offBlack`
- CTA 버튼 간격: 16px
- CTA 높이: 50px
- CTA radius: 32px

## 17. 라우팅 · 페이지 구조

팀 프로젝트 구조가 정해져 있으면 기존 구조를 우선합니다.

기존 문서 기준 큰 페이지 틀:

- `index`: 홈
- `event`: 이벤트
- `category`: 카테고리/커뮤니티/매거진 성격 화면
- `mypage`: 마이페이지

React 파일명은 프로젝트 컨벤션에 맞추되, 역할이 드러나게 작성합니다.

- `HomePage.tsx`
- `MagazinePage.tsx`
- `QuestionPage.tsx`
- `ResultPage.tsx`

새 화면이 필요하면 새 페이지 등록인지 기존 페이지 안 섹션 추가인지 먼저 확인합니다.

## 18. 폴더 구조

```txt
src/
  pages/
    HomePage.tsx
    MagazinePage.tsx
    QuestionPage.tsx
    ResultPage.tsx
  components/
    common/
      Header.tsx
      BottomNavigation.tsx
      SectionTitle.tsx
    ui/
      CtaButton.tsx
      Chip.tsx
      Tab.tsx
      Badge.tsx
      SlideIndicator.tsx
      HeartButton.tsx
      Star.tsx
    icons/
      LayerLogo.tsx
  data/
  styles/
  types/
```

## 19. 구현 순서

1. Figma MCP 연결 확인
2. 구현할 화면 node ID 확인
3. 화면 부모 노드 metadata 확인
4. 섹션/컴포넌트 노드 개별 확인
5. 기존 Tailwind 설정과 디자인 토큰 확인
6. 없는 토큰만 camelCase로 추가
7. `PageWrap`, `Header`, `BottomNavigation`, `SectionTitle`, `CtaButton` 구현
8. 페이지 레이아웃만 먼저 구현
9. 이미지, 카드, 텍스트 배치 맞추기
10. 360px, 390px, 430px에서 반응형 확인
11. 레이아웃 검수 후 인터랙션 구현
12. 라우팅, 상태관리, 데이터 연결

## 20. 결정된 항목

- 첫 구현 화면: 홈
- 실제 화면별 Figma node ID: 코딩 시 전달받은 node ID 기준
- Tailwind 설정: 기존 팀 설정 우선 사용
- 없는 Figma 토큰만 camelCase로 추가
- 화면 높이: `min-h-dvh` 우선
- Pretendard: CDN 웹폰트
- Cormorant Garamond: Google Fonts
- Pretendard 자간: `-2%` 통일
- 아이콘: `lucide-react` 우선
- 일반 UI 아이콘 Figma SVG export 금지
- CTA disabled: `grey` 배경, `offWhite` 텍스트
- Tab inactive: `offWhite` 배경, `lightGrey` 보더, `grey` 텍스트
- Heart selected: `pointOrange`
- Heart default: `offBlack`
- StatusBar: 실제 서비스 기본 구현 제외

## 21. 구현 전 추가 확인 항목

홈 화면 구현 전 node ID를 받은 뒤 MCP로 다시 확인합니다.

- 홈 화면 전체 Figma node ID
- 홈 화면 gradient의 정확한 색상/방향
- `light2Grey`가 Figma 변수인지 화면 로컬 값인지
- opacity 컬러가 `pointOrange40`, `offBlack70`, `offWhite70` 외에 더 있는지
- 이미지/향수 카드 실제 데이터 구조
- 하단 메뉴를 모든 페이지에 fixed로 노출할지
- 질문 페이지 중복 선택 여부
- 질문 데이터와 결과 유형 매핑 기준
- 하트/찜하기 상태 저장 방식
- 랭킹, 매거진, 챌린지 데이터가 정적 데이터인지 API 연동인지
- Figma 이미지 에셋을 프로젝트에 저장할지, 임시 URL을 참고용으로만 쓸지
- Hero 영역 영상/이미지를 실제 영상으로 쓸지 정적 이미지로 대체할지
- BottomNavigation을 모든 페이지에 고정 노출할지
- 실제 서비스에서 iOS StatusBar가 필요한지

## 22. 금지 사항

- MCP 확인 없이 Figma 값을 추측해서 코딩하지 않는다.
- 처음부터 슬라이드, 탭 전환, 클릭 상태, 애니메이션을 구현하지 않는다.
- 등록되지 않은 임의 컬러를 사용하지 않는다.
- Figma 토큰명을 코드에서 kebab-case, snake_case, camelCase로 섞어 쓰지 않는다.
- Pretendard 자간을 화면마다 다르게 적용하지 않는다.
- Figma SVG를 그대로 export해서 일반 UI 아이콘으로 사용하지 않는다.
- 여러 출처에서 가져온 아이콘 SVG를 화면마다 직접 붙여 넣지 않는다.
- 공통요소 구조와 class명을 페이지마다 다르게 만들지 않는다.
- 같은 UI를 매번 새로 작성하지 않는다.
- 카드 안에 카드가 중첩된 형태로 스타일링하지 않는다.
- 화면 루트에서 `min-h-dvh`를 빼지 않는다.
- 430px 고정 화면만 맞추고 작은 모바일 화면을 방치하지 않는다.
- 텍스트가 버튼, 카드, 칩 밖으로 넘치게 두지 않는다.
- 인라인 스타일은 쓰지 않는다. 동적 진행률처럼 불가피한 경우만 예외로 한다.
- 공통요소 class명을 임의로 바꾸지 않는다.
- 미등록 로컬 값을 반복 사용 확정 없이 전역 토큰으로 등록하지 않는다.

## 23. 최종 체크리스트

- [ ] MCP 연결 후 작업했는가?
- [ ] Figma 노드를 화면/섹션/컴포넌트 단위로 확인했는가?
- [ ] 레이아웃을 먼저 만들고 인터랙션을 나중에 붙였는가?
- [ ] 화면 루트가 `min-h-dvh`로 100dvh를 채우는가?
- [ ] safe-area를 고려했는가?
- [ ] 좌우 여백 20px 기준을 지켰는가?
- [ ] 섹션 간 간격 64px 기준을 지켰는가?
- [ ] 타이틀/콘텐츠 간격 30px 기준을 지켰는가?
- [ ] 모든 화면이 wrap 구조로 통일되었는가?
- [ ] 등록된 Figma text/color style 기준으로 구현했는가?
- [ ] 코드 토큰명이 camelCase로 통일되었는가?
- [ ] Pretendard 자간이 `-2%`로 통일되었는가?
- [ ] 아이콘은 `lucide-react`를 우선 사용했는가?
- [ ] 일반 UI 아이콘을 Figma SVG export로 처리하지 않았는가?
- [ ] CTA 라벨 언어별 폰트 분기가 적용되었는가?
- [ ] 360px, 390px, 430px에서 레이아웃이 깨지지 않는가?
- [ ] 텍스트가 버튼, 카드, 칩 밖으로 넘치지 않는가?
- [ ] 네비 active/inactive 색상이 맞는가?
- [ ] 멀티라인 한글 본문에 140~150% line-height가 적용되었는가?
