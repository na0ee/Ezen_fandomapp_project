export type ChatbotComponentKind = "component" | "componentSet" | "reference";

export type ChatbotComponentRegistryItem = {
  codeName: string;
  figmaName: string;
  kind: ChatbotComponentKind;
  figmaNodeId: string;
  figmaKey: string;
  implemented: boolean;
  size?: {
    width: number;
    height: number;
  };
  variants?: Record<
    string,
    {
      figmaName: string;
      figmaNodeId: string;
      figmaKey: string;
      size: {
        width: number;
        height: number;
      };
    }
  >;
};

export const chatbotComponentRegistry = {
  bubble: {
    codeName: "ChatBubble",
    figmaName: "Bubble",
    kind: "componentSet",
    figmaNodeId: "1034:17899",
    figmaKey: "71a09526a8f66646478f901fbee1d53f49b31dd8",
    implemented: true,
    variants: {
      bot: {
        figmaName: "botBubble",
        figmaNodeId: "1034:17863",
        figmaKey: "37c3a7b94f382a362a28be848e39ea0ca276862d",
        size: { width: 179, height: 78 },
      },
      loading: {
        figmaName: "Property 1=loading",
        figmaNodeId: "1034:19389",
        figmaKey: "99c5d43cea8d55378a4ebbd981830c694568fb08",
        size: { width: 179, height: 78 },
      },
      user: {
        figmaName: "userBubble",
        figmaNodeId: "1034:17900",
        figmaKey: "288ec0de00d764a71567ffb84c3296d8baf60545",
        size: { width: 160, height: 55 },
      },
    },
  },
  chatbotHeader: {
    codeName: "ChatbotHeader",
    figmaName: "01. Header",
    kind: "reference",
    figmaNodeId: "1110:20626",
    figmaKey: "local-frame",
    implemented: true,
    size: { width: 390, height: 56 },
  },
  quickCategory: {
    codeName: "QuickCategory",
    figmaName: "퀵 카테고리",
    kind: "componentSet",
    figmaNodeId: "1034:17940",
    figmaKey: "d0132101c2a3bb748dc7f1fc43770cd56ec3e9ec",
    implemented: true,
    variants: {
      selected: {
        figmaName: "Property 1=Selected",
        figmaNodeId: "1034:17939",
        figmaKey: "96d70184992316d16793641b1a0517385fcd4d8d",
        size: { width: 153, height: 38 },
      },
      default: {
        figmaName: "Property 1=Default",
        figmaNodeId: "1034:17941",
        figmaKey: "862f5b717c5dcb6180629c4c77dd45ed0e0d432f",
        size: { width: 153, height: 38 },
      },
      under: {
        figmaName: "Property 1=under",
        figmaNodeId: "1034:18609",
        figmaKey: "734c65c24e4355fa371a82972821ec7da2984708",
        size: { width: 153, height: 38 },
      },
    },
  },
  quickCategoryGroup: {
    codeName: "QuickCategoryGroup",
    figmaName: "08. 퀵 카테고리",
    kind: "reference",
    figmaNodeId: "1110:20637",
    figmaKey: "local-frame",
    implemented: true,
    size: { width: 337, height: 130 },
  },
  chatbotIntro: {
    codeName: "ChatbotIntro",
    figmaName: "Frame 1707484486",
    kind: "reference",
    figmaNodeId: "1110:20630",
    figmaKey: "local-frame",
    implemented: true,
    size: { width: 390, height: 295 },
  },
  botTurn: {
    codeName: "BotTurn",
    figmaName: "characterLay + Bubble + 퀵 카테고리",
    kind: "reference",
    figmaNodeId: "1034:18568",
    figmaKey: "local-frame",
    implemented: true,
    size: { width: 394, height: 165 },
  },
  chatInput: {
    codeName: "ChatInput",
    figmaName: "입력창",
    kind: "componentSet",
    figmaNodeId: "1034:19136",
    figmaKey: "e54eed9bac3dcb059eb90ece97a72f69c8d31d51",
    implemented: true,
    variants: {
      default: {
        figmaName: "Property 1=Default",
        figmaNodeId: "1034:18244",
        figmaKey: "a663d8d4802645a8b7f1431e0589c7999ffee9f6",
        size: { width: 394, height: 50 },
      },
      focused: {
        figmaName: "Property 1=focused",
        figmaNodeId: "1034:19137",
        figmaKey: "d59a1e895c3291eec5eaa3b0808bacc931c49bf6",
        size: { width: 394, height: 50 },
      },
      typing: {
        figmaName: "Property 1=입력중",
        figmaNodeId: "1034:19141",
        figmaKey: "ff924b5e9d44554527700b77777653451056c167",
        size: { width: 394, height: 50 },
      },
    },
  },
  locCard: {
    codeName: "LocCard",
    figmaName: "locCard",
    kind: "component",
    figmaNodeId: "1034:18717",
    figmaKey: "36aa1d994b3eb3d3bf2489c3fecd86541351b9c6",
    implemented: true,
    size: { width: 337, height: 400 },
  },
  characterLay: {
    codeName: "CharacterLay",
    figmaName: "characterLay",
    kind: "component",
    figmaNodeId: "1034:17862",
    figmaKey: "70b4df9aa86025df7ef2512908d580b40f6b574f",
    implemented: true,
    size: { width: 44, height: 64 },
  },
  chatPerfumeCard: {
    codeName: "ChatPerfumeCard",
    figmaName: "chat_perfumeCard",
    kind: "component",
    figmaNodeId: "1110:19996",
    figmaKey: "6d263e2496b8d4cebf45c6e6a917120b39faa188",
    implemented: true,
    size: { width: 337, height: 115 },
  },
  statusBar: {
    codeName: "StatusBar",
    figmaName: "StatusBar",
    kind: "reference",
    figmaNodeId: "669:6882",
    figmaKey: "ec13192d8b303e5b168e8da791fbff3f601d8549",
    implemented: false,
    size: { width: 430, height: 64.55 },
  },
  sendIcon: {
    codeName: "ChatbotSendIcon",
    figmaName: "icon / heroicons / Solid / paper-airplane",
    kind: "reference",
    figmaNodeId: "703:6836",
    figmaKey: "71f9e79a09a39df98b4dc7adff76b2dc6fe9f594",
    implemented: true,
    size: { width: 22.08, height: 22.12 },
  },
  button: {
    codeName: "Button",
    figmaName: "Button",
    kind: "reference",
    figmaNodeId: "700:6944",
    figmaKey: "85b2438b30c329a16ebd17fb0a6a04d8950dff83",
    implemented: false,
  },
  avatarFrame: {
    codeName: "AvatarFrame",
    figmaName: "Frame 1707484386",
    kind: "reference",
    figmaNodeId: "700:6982",
    figmaKey: "8b11f3c513e33b9b3ba3e88c525ae4644c69c3da",
    implemented: false,
  },
} satisfies Record<string, ChatbotComponentRegistryItem>;
