import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackHeader } from "../components/common/BackHeader";
import unreadDotIcon from "../assets/notifications/unread-dot.svg";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

type NotificationItem = {
  id: string;
  category: string;
  time: string;
  title: string;
  description: string;
  perfumeImage: string;
  accentCategory?: boolean;
  action?: {
    label: string;
    to: string;
  };
};

const notificationGroups: Array<{ label: string; items: NotificationItem[] }> = [
  {
    label: "오늘",
    items: [
      {
        id: "restock",
        category: "재입고 알림",
        time: "방금 전",
        title: "찜한 향수가 다시 입고됐어요",
        description: "Le Labo · 상탈 33이 재입고되었어요. 품절되기 전에 확인해 보세요.",
        perfumeImage: asset("/assets/perfume/background-removed-test/santal-33.png"),
        accentCategory: true,
        action: { label: "향수 보기", to: "/search-results" },
      },
      {
        id: "new-product",
        category: "신상품",
        time: "2시간 전",
        title: "이번 주 신상 향수가 도착했어요",
        description: "Maison Margiela · 레이지 선데이 모닝 외 3종이 새롭게 입고되었어요.",
        perfumeImage: asset("/assets/perfume/background-removed-test/lazy-sunday-morning.png"),
      },
    ],
  },
  {
    label: "이번 주",
    items: [
      {
        id: "benefit",
        category: "혜택",
        time: "3일 전",
        title: "여름 시그니처 향수 최대 25% 할인",
        description: "시원한 시트러스 & 아쿠아 계열 향수를 특별가로 만나보세요. 7/20까지.",
        perfumeImage: asset("/assets/perfume/background-removed-test/english-pear-freesia.png"),
        action: { label: "기획전 보기", to: "/event" },
      },
      {
        id: "review-reply",
        category: "리뷰 답글",
        time: "4일 전",
        title: "내 리뷰에 답글이 달렸어요",
        description: '"딥디크 오 데 썽" 리뷰에 브랜드가 답글을 남겼어요.',
        perfumeImage: asset("/assets/perfume/background-removed-test/eau-des-sens.png"),
        accentCategory: true,
      },
      {
        id: "recommendation",
        category: "추천",
        time: "5일 전",
        title: "나영님을 위한 오늘의 향수 추천",
        description: "최근 본 향수를 바탕으로 취향에 맞는 향수 5가지를 골라봤어요.",
        perfumeImage: asset("/assets/perfume/background-removed-test/mojave-ghost.png"),
      },
    ],
  },
];

const initiallyUnreadIds = new Set(["restock", "new-product"]);

function NotificationHeader({ onMarkAllRead }: { onMarkAllRead: () => void }) {
  return (
    <BackHeader
      action={
      <button
        className="text-xs font-medium leading-[normal] tracking-[-0.02em] text-grey"
        onClick={onMarkAllRead}
        type="button"
      >
        모두 읽음
      </button>
      }
      title="알림"
    />
  );
}

function NotificationCard({
  isUnread,
  item,
  onOpen,
}: {
  isUnread: boolean;
  item: NotificationItem;
  onOpen: () => void;
}) {
  return (
    <article
      className="mx-5 flex h-[108px] w-[calc(100%_-_40px)] items-center gap-3 overflow-hidden rounded-[8px] border-[0.5px] border-light2-grey bg-off-white p-2"
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative flex size-[92px] shrink-0 items-center justify-center overflow-visible rounded-[8px] bg-light2-grey">
        <img
          alt={`${item.title} 향수`}
          className="h-auto max-h-[76px] w-auto max-w-[76px] object-contain"
          src={item.perfumeImage}
        />
        {isUnread && <img alt="" aria-hidden="true" className="absolute -right-0.5 -top-1 size-[11px]" src={unreadDotIcon} />}
      </div>

      <div className="flex h-[71px] min-w-0 flex-1 flex-col justify-between overflow-hidden">
        <div className="min-w-0">
          <div className="flex items-center justify-between text-xs leading-[normal] tracking-[-0.02em]">
            <span className={`truncate font-medium ${item.accentCategory ? "text-point-orange" : "text-grey"}`}>
              {item.category}
            </span>
            <time className="ml-2 shrink-0 font-normal text-grey">{item.time}</time>
          </div>
          <h2
            className="mt-0.5 truncate text-base font-semibold leading-[normal] tracking-[-0.02em] text-grey"
          >
            {item.title}
          </h2>
        </div>

        <div className="flex min-w-0 items-center">
          <p className="min-w-0 flex-1 truncate text-sm font-medium leading-[normal] tracking-[-0.02em] text-subtext">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function NotificationPage() {
  const navigate = useNavigate();
  const [unreadIds, setUnreadIds] = useState(() => new Set(initiallyUnreadIds));

  function markAsRead(id: string) {
    setUnreadIds((current) => {
      if (!current.has(id)) return current;

      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }

  return (
    <main className="min-h-dvh bg-black max-[430px]:bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white">
        <NotificationHeader onMarkAllRead={() => setUnreadIds(new Set())} />

        <div className="pt-[var(--app-header-height)]">
          {notificationGroups.map((group) => (
            <section aria-labelledby={`notification-group-${group.label}`} key={group.label}>
              <div className="flex h-[41px] items-start px-5 pb-2 pt-[18px]">
                <h2
                  className="text-xs font-bold leading-[15px] tracking-[-0.02em] text-grey"
                  id={`notification-group-${group.label}`}
                >
                  {group.label}
                </h2>
              </div>

              <div className="flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <NotificationCard
                    isUnread={unreadIds.has(item.id)}
                    item={item}
                    key={item.id}
                    onOpen={() => {
                      markAsRead(item.id);
                      if (item.action) {
                        navigate(item.action.to);
                      }
                    }}
                  />
                ))}
              </div>
            </section>
          ))}

          <p className="pb-8 pt-7 text-center text-xs font-normal leading-[15px] tracking-[-0.02em] text-light-grey">
            최근 30일간의 알림을 보여드려요
          </p>
        </div>
      </div>
    </main>
  );
}
