import type { HTMLAttributes } from "react";
import { Clock, Globe, MapPin, Phone } from "lucide-react";

type LocCardProps = HTMLAttributes<HTMLElement> & {
  name: string;
  address: string;
  hours: string;
  phone: string;
  url: string;
};

export function LocCard({ name, address, hours, phone, url, className = "", ...props }: LocCardProps) {
  const displayUrl = url.replace(/^https?:\/\//, "");

  return (
    <article
      className={`flex w-full max-w-[337px] flex-col gap-2.5 rounded-chip border border-light-grey bg-off-white p-4 ${className}`}
      data-chatbot-component="LocCard"
      {...props}
    >
      <div className="flex flex-col gap-1.5">
        <p className="font-pretendard text-xl font-bold leading-none tracking-[-0.02em] text-off-black">{name}</p>
        <div className="h-px w-full bg-light-grey" />
      </div>
      <div className="flex gap-2">
        <div className="flex shrink-0 flex-col items-center justify-between py-0.5">
          <MapPin className="text-grey" size={16} strokeWidth={1.8} />
          <Clock className="text-grey" size={16} strokeWidth={1.8} />
          <Phone className="text-grey" size={16} strokeWidth={1.8} />
          <Globe className="text-grey" size={16} strokeWidth={1.8} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 font-pretendard text-sm font-medium tracking-[-0.02em] text-subtext">
          <p>{address}</p>
          <p>{hours}</p>
          <p>{phone}</p>
          <a className="truncate hover:underline" href={url} rel="noreferrer" target="_blank">
            {displayUrl}
          </a>
        </div>
      </div>
      <a
        className="self-start rounded-chip bg-off-black px-3.5 py-[5px] font-pretendard text-xs font-normal tracking-[-0.02em] text-off-white"
        href={`https://map.naver.com/p/search/${encodeURIComponent(address)}`}
        rel="noreferrer"
        target="_blank"
      >
        길 찾기
      </a>
    </article>
  );
}
