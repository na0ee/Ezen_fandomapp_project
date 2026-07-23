import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import benefitIcon from "../assets/notifications/benefit.svg";
import chevronLeftIcon from "../assets/notifications/chevron-left.svg";
import newProductIcon from "../assets/notifications/new-product.svg";
import recommendationIcon from "../assets/notifications/recommendation.svg";
import replyIcon from "../assets/notifications/reply.svg";
import restockIcon from "../assets/notifications/restock.svg";
import unreadDotIcon from "../assets/notifications/unread-dot.svg";

type NotificationItem = {
  id: string;
  category: string;
  time: string;
  title: string;
  description: string;
  icon: string;
  badgeClassName: string;
  iconSizeClassName: string;
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
        icon: restockIcon,
        badgeClassName: "bg-point-orange/10",
        iconSizeClassName: "size-6",
        accentCategory: true,
        action: { label: "향수 보기", to: "/category" },
      },
      {
        id: "new-product",
        category: "신상품",
        time: "2시간 전",
        title: "이번 주 신상 향수가 도착했어요",
        description: "Maison Margiela · 레이지 선데이 모닝 외 3종이 새롭게 입고되었어요.",
        icon: newProductIcon,
        badgeClassName: "bg-[#ededed]",
        iconSizeClassName: "size-[22px]",
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
        icon: benefitIcon,
        badgeClassName: "bg-off-black",
        iconSizeClassName: "size-[22px]",
        action: { label: "기획전 보기", to: "/event" },
      },
      {
        id: "review-reply",
        category: "리뷰 답글",
        time: "4일 전",
        title: "내 리뷰에 답글이 달렸어요",
        description: '"딥디크 오 데 썽" 리뷰에 브랜드가 답글을 남겼어요.',
        icon: replyIcon,
        badgeClassName: "bg-point-orange/10",
        iconSizeClassName: "size-[22px]",
        accentCategory: true,
      },
      {
        id: "recommendation",
        category: "추천",
        time: "5일 전",
        title: "나영님을 위한 오늘의 향수 추천",
        description: "최근 본 향수를 바탕으로 취향에 맞는 향수 5가지를 골라봤어요.",
        icon: recommendationIcon,
        badgeClassName: "bg-[#ededed]",
        iconSizeClassName: "size-[22px]",
      },
    ],
  },
];

const initiallyUnreadIds = new Set(["restock", "new-product"]);

function NotificationHeader({ onMarkAllRead }: { onMarkAllRead: () => void }) {
  const navigate = useNavigate();

  return (
    <header className="fixed left-1/2 top-0 z-50 flex h-[calc(56px+var(--app-safe-top))] w-full max-w-[430px] -translate-x-1/2 items-end justify-between bg-off-white pb-2 pl-2 pr-5 pt-[var(--app-safe-top)]">
      <div className="flex h-10 items-center gap-1">
        <button
          aria-label="이전 페이지로 돌아가기"
          className="flex size-10 shrink-0 items-center justify-center"
          onClick={() => navigate(-1)}
          type="button"
        >
          <img alt="" aria-hidden="true" className="size-6" src={chevronLeftIcon} />
        </button>
        <h1 className="text-xl font-bold leading-6 tracking-[-0.02em] text-off-black">알림</h1>
      </div>
      <button
        className="mb-[12.5px] text-xs font-medium leading-[15px] tracking-[-0.02em] text-grey"
        onClick={onMarkAllRead}
        type="button"
      >
        모두 읽음
      </button>
    </header>
  );
}

function NotificationCard({
  isUnread,
  item,
  onRead,
}: {
  isUnread: boolean;
  item: NotificationItem;
  onRead: () => void;
}) {
  return (
    <article
      className={`flex w-full gap-3.5 px-5 py-3.5 transition-colors ${isUnread ? "bg-[#fff3ee]" : "bg-off-white"}`}
      onClick={onRead}
    >
      <div className={`relative flex size-11 shrink-0 items-center justify-center overflow-visible rounded-[14px] ${item.badgeClassName}`}>
        <img alt="" aria-hidden="true" className={item.iconSizeClassName} src={item.icon} />
        {isUnread && <img alt="" aria-hidden="true" className="absolute -right-0.5 -top-1 size-[11px]" src={unreadDotIcon} />}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
        <div className="flex items-center justify-between text-xs leading-[15px] tracking-[-0.02em]">
          <span className={`font-medium ${item.accentCategory ? "text-point-orange" : "text-grey"}`}>{item.category}</span>
          <time className="font-normal text-grey">{item.time}</time>
        </div>
        <h2 className="text-sm font-medium leading-[17px] tracking-[-0.02em] text-[#171717]">{item.title}</h2>
        <p className="text-xs font-normal leading-[14px] tracking-[-0.02em] text-[#4d4d4d]">{item.description}</p>
        {item.action && (
          <div className="pt-[5px]">
            <Link
              className="inline-flex h-[25px] items-center rounded-2xl bg-off-black px-3.5 text-xs font-normal leading-[15px] tracking-[-0.02em] text-off-white"
              onClick={(event) => event.stopPropagation()}
              to={item.action.to}
            >
              {item.action.label}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

export function NotificationPage() {
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
    <main className="min-h-dvh bg-off-white text-off-black">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-off-white">
        <NotificationHeader onMarkAllRead={() => setUnreadIds(new Set())} />

        <div className="pt-[calc(56px+var(--app-safe-top))]">
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

              {group.items.map((item, index) => (
                <div key={item.id}>
                  <NotificationCard isUnread={unreadIds.has(item.id)} item={item} onRead={() => markAsRead(item.id)} />
                  {group.label === "이번 주" && index < group.items.length - 1 && <div className="mx-5 h-px bg-[#ededed]" />}
                </div>
              ))}
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
