import sendIcon from "../../assets/chatbot/send-icon.svg";

type ChatbotSendIconProps = {
  className?: string;
};

/**
 * Figma node 1034:18241 (heroicons Solid paper-airplane, -rotate-45).
 * lucide-react has no matching glyph, so this exception asset is used instead.
 */
export function ChatbotSendIcon({ className = "" }: ChatbotSendIconProps) {
  return (
    <img alt="" aria-hidden="true" className={`size-7 -rotate45 ${className}`} src={sendIcon} />
  );
}
