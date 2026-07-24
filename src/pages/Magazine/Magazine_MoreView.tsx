
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import byredoImage from "../../assets/magazine/more-view/byredo.png";
import diptyqueImage from "../../assets/magazine/more-view/diptyque.png";
import joMaloneImage from "../../assets/magazine/more-view/jo-malone.png";
import longevityImage from "../../assets/magazine/more-view/longevity.png";
import newFragranceImage from "../../assets/magazine/more-view/new-fragrance.png";
import nicheTrendImage from "../../assets/magazine/more-view/niche-trend.png";
import seasonalImage from "../../assets/magazine/more-view/seasonal.png";
import { BottomNavigation } from "../../components/common/BottomNavigation";

import { HeartButton } from "../../components/ui/HeartButton";
import { BackHeader } from "../../components/common/BackHeader";
import { HeaderActions } from "../../components/common/HeaderActions";

const categories = ["전체", "향수 상식", "추천", "트렌드", "선물", "브랜드"] as const;

const articles = [
  {
    categories: ["추천", "선물"],
    description: "봄, 여름, 가을 , 겨울\n어떤 향이 어울릴까?",
    href: "/magazine/seasonal-guide",
    image: seasonalImage,
    title: "계절별 향수 선택 가이드",
  },
  {
    categories: ["향수 상식", "선물"],
    description: "오래 기억되는\n향을 위한 작은 습관",
    href: "/magazine/perfume-longevity",
    image: longevityImage,
    title: "향수 지속력을 높이는 꿀팁",
  },
  {
    categories: ["추천"],
    description: "올해 가장 주목해야 할\n새로운 향수들",
    image: newFragranceImage,
    title: "New Fragrance Collection 2026",
  },
  {
    categories: ["브랜드"],
    description: "예술과 여행이\n향으로 만나다",
    href: "/magazine/diptyque",
    image: diptyqueImage,
    title: "DIPTYQUE",
  },
  {
    categories: ["브랜드"],
    description: "나만의 향을 완성하는\n레이어링의 시작",
    href: "/magazine/jo-malone",
    image: joMaloneImage,
    title: "JO MALONE LONDON",
  },
  {
    categories: ["브랜드"],
    description: "기억과 감정을 향으로\n담아내는 브랜드",
    href: "/magazine/byredo",
    image: byredoImage,
    title: "BYREDO",
  },
  {
    categories: ["트렌드"],
    description: "향으로\n나를 표현하는 시대",
    href: "/magazine/niche-trend",
    image: nicheTrendImage,
    title: "니치향수 트렌드",
  },
];

type Category = (typeof categories)[number];

function MagazineHeader() {
  return (
    <BackHeader title="매거진" backTo="/magazine" action={<HeaderActions />} />
  );
}

function MagazineCard({
  article,
  isFavorite,
  onToggleFavorite,
}: {
  article: (typeof articles)[number];
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <article className="relative h-[255px] w-[190px] overflow-hidden rounded-card">
      <div className="absolute inset-x-0 top-0 h-[253.121px] overflow-hidden rounded-card border-[0.8px] border-light-grey">
        <img alt={`${article.title} 이미지`} className="size-full object-cover" src={article.image} />
      </div>
      <div className="absolute inset-x-0 top-px h-[254px] overflow-hidden rounded-card bg-gradient-to-b from-transparent to-black/80 text-off-white">
        <div className="absolute top-[157px] left-[22px] flex w-[127px] flex-col gap-[7px]">
          <h2 className="w-full truncate text-base font-semibold leading-[normal] tracking-[-0.02em]">{article.title}</h2>
          <p className="h-[30px] w-full whitespace-pre-line text-xs font-medium leading-[normal] tracking-[-0.02em]">
            {article.description}
          </p>
        </div>
      </div>

      {article.href && <Link aria-label={`${article.title} 읽기`} className="absolute inset-0 z-10" to={article.href} />}

      <HeartButton
        aria-label={`${article.title} ${isFavorite ? "찜 해제" : "찜하기"}`}
        className="absolute top-[222px] left-[157px] z-20 size-6 cursor-pointer"
        isSelected={isFavorite}
        onClick={onToggleFavorite}
        tone="light"
      />
    </article>
  );
}

export default function MagazineMoreView() {
  const [activeCategory, setActiveCategory] = useState<Category>("전체");
  const [favoriteTitles, setFavoriteTitles] = useState(() => new Set<string>());
  const filteredArticles = useMemo(
    () => (activeCategory === "전체" ? articles : articles.filter((article) => article.categories.includes(activeCategory))),
    [activeCategory],
  );

  const toggleFavorite = (title: string) => {
    setFavoriteTitles((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);

      if (nextFavorites.has(title)) {
        nextFavorites.delete(title);
      } else {
        nextFavorites.add(title);
      }

      return nextFavorites;
    });
  };

  return (
    <main className="min-h-dvh overflow-x-hidden bg-black max-[430px]:bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-off-white">
        <MagazineHeader />
        <section className="flex w-full flex-col items-center gap-[30px] pt-[calc(var(--app-header-height)+15px)] pb-[170px]">
          <h2 className="h-[26px] w-[390px] text-2xl font-semibold leading-[1.08] tracking-[-0.03em]">{activeCategory}</h2>

          <div className="w-[388px]">
            <div className="flex h-[30px] w-full items-center gap-2.5">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    aria-pressed={isActive}
                    className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium leading-[normal] tracking-[-0.02em] ${
                      isActive ? "bg-off-black text-off-white" : "border-[0.8px] border-light-grey bg-off-white text-grey"
                    }`}
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    type="button"
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 items-start gap-x-2 gap-y-[9px]">
              {filteredArticles.map((article) => (
                <MagazineCard
                  article={article}
                  isFavorite={favoriteTitles.has(article.title)}
                  key={article.title}
                  onToggleFavorite={() => toggleFavorite(article.title)}
                />
              ))}
            </div>
          </div>
        </section>
        <BottomNavigation />
      </div>
    </main>
  );
}
