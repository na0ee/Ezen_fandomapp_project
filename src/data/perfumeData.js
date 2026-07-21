// src/data/perfumeData.js
//
// 향수 상품 목록 데이터.
// - brandId: brands.js의 id 참조
// - familyIds: fragranceFamilies.js의 id 참조 (배열, 1~2개)
// - image: 이미지 파일명 없으면 빈 문자열("") → 컴포넌트에서 기본 이미지로 대체 처리
// - notes: 탑/미들/베이스 노트 구성 (각 배열)
// - noteColors: 탑/미들/베이스 노트의 향 계열을 시각화한 대표 컬러(hex)
//     시트러스=노랑 / 그린=초록 / 아쿠아틱=파랑 / 플로럴=핑크·바이올렛 / 우디=갈색 / 머스크·파우더리=베이지 / 스파이시=주황·빨강
// - concept: 향수의 컨셉/무드를 한 줄로 표현
// - aiReview: AI가 요약한 리뷰 (사용자 평을 종합한 한두 문장)
//
// ▶ 새 향수 추가 방법: 아래 배열 맨 뒤에 객체 하나만 추가하면 됨.
//   id는 마지막 값 + 1로, brandId/familyIds는 반드시 brands.js / fragranceFamilies.js에 있는 id만 사용할 것.

export const perfumeData = [
  // ── 메종 마르지엘라 ──────────────────────────
  {
    id: 1,
    perfume: {
      brandId: "maison-margiela",
      name: "레이지 선데이 모닝",
      description: "깨끗한 침구를 떠올리게 하는 포근하고 은은한 향",
      image: "/assets/perfume/maison-margiela/lazy-sunday-morning.png",
      familyIds: ["floral", "musk"],
      notes: {
        top: ["알데하이드", "배", "베르가못"],
        middle: ["은방울꽃", "아이리스", "장미"],
        base: ["화이트 머스크", "앰버"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F0A6BE", base: "#E4D9C8" },
      concept: "햇살 드는 일요일 아침, 갓 세탁한 침구 속의 나른한 휴식",
      aiReview:
        "'세탁한 이불 냄새'라는 평이 가장 많으며, 부담 없이 매일 뿌리기 좋은 클린 머스크로 호평받는다. 지속력은 보통이라는 의견이 다수.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    perfume: {
      brandId: "maison-margiela",
      name: "바이 더 파이어플레이스",
      description: "타오르는 장작과 따뜻한 향신료가 어우러진 포근한 향",
      image: "/assets/perfume/maison-margiela/by-the-fireplace.png",
      familyIds: ["woody", "spicy"],
      notes: {
        top: ["클로브", "핑크 페퍼", "오렌지"],
        middle: ["밤나무", "구아이악 우드"],
        base: ["바닐라", "캐시미어 우드", "페루 발삼"],
      },
      noteColors: { top: "#D08159", middle: "#9C6B4A", base: "#E6CE9C" },
      concept: "겨울밤 벽난로 앞에서 구운 밤과 장작이 타는 아늑함",
      aiReview:
        "달콤한 밤·바닐라와 스모키한 우드의 조합이 겨울 시그니처로 인기. 포근하면서도 세련됐다는 평이 많고 남녀 모두 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 3,
    perfume: {
      brandId: "maison-margiela",
      name: "재즈 클럽",
      description: "럼과 담배, 바닐라가 어우러진 깊고 분위기 있는 향",
      image: "/assets/perfume/maison-margiela/jazz-club.png",
      familyIds: ["oriental", "woody"],
      notes: {
        top: ["핑크 페퍼", "네롤리", "레몬"],
        middle: ["럼", "클라리 세이지"],
        base: ["바닐라", "타바코 리프", "베티버"],
      },
      noteColors: { top: "#F5C542", middle: "#C89B5C", base: "#7A4E31" },
      concept: "위스키 잔이 놓인 재즈 바, 담배 연기 속의 무드",
      aiReview:
        "럼과 타바코의 달콤·스모키함이 '남성 시그니처'로 자주 언급된다. 지속력·확산력이 좋다는 평가가 지배적.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 4,
    perfume: {
      brandId: "maison-margiela",
      name: "언더 더 레몬 트리",
      description: "상큼한 레몬과 푸른 잎사귀가 어우러진 싱그러운 향",
      image: "/assets/perfume/maison-margiela/under-the-lemon-trees.png",
      familyIds: ["citrus", "green"],
      notes: {
        top: ["레몬", "쁘띠그레인"],
        middle: ["그린 노트", "카다멈"],
        base: ["머스크", "앰버우드"],
      },
      noteColors: { top: "#F5C542", middle: "#7FC29B", base: "#E4D9C8" },
      concept: "여름날 레몬 나무 아래, 잎사귀 사이로 스미는 햇빛",
      aiReview:
        "인공적이지 않은 '진짜 레몬잎' 같은 시트러스 그린이 여름용으로 호평. 상큼하지만 지속력은 짧은 편이라는 의견.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 5,
    perfume: {
      brandId: "maison-margiela",
      name: "세일링 데이",
      description: "시원한 바닷바람과 맑은 바닷물을 떠올리게 하는 청량한 향",
      image: "/assets/perfume/maison-margiela/sailing-day.png",
      familyIds: ["aquatic", "green"],
      notes: {
        top: ["해양 노트", "베르가못"],
        middle: ["해조류", "코리앤더"],
        base: ["앰버그리스", "머스크"],
      },
      noteColors: { top: "#7EC0E8", middle: "#52946B", base: "#DCCFC0" },
      concept: "돛을 올린 요트 위, 소금기 머금은 바닷바람",
      aiReview:
        "짭짤한 소금기와 청량한 아쿠아틱이 '바다 그 자체'라는 평. 여름 데일리로 부담 없다는 반응이 많다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 불가리 ──────────────────────────
  {
    id: 6,
    perfume: {
      brandId: "bvlgari",
      name: "옴니아 크리스탈린",
      description: "맑은 연꽃과 배의 수분감이 어우러진 깨끗하고 투명한 향",
      image: "/assets/perfume/bvlgari/omnia-crystalline.jpg",
      familyIds: ["floral", "aquatic"],
      notes: {
        top: ["대나무", "나시 배"],
        middle: ["연꽃", "화이트 티"],
        base: ["발사 우드", "구아이악 우드", "머스크"],
      },
      noteColors: { top: "#7FC29B", middle: "#7EC0E8", base: "#E4D9C8" },
      concept: "투명한 크리스털처럼 맑은 물빛 화이트 플로럴",
      aiReview:
        "가볍고 깨끗한 물·배 향이 '청순하다'는 평으로 여성 데일리에 인기. 은은해서 오피스용으로 좋다는 의견 다수.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 7,
    perfume: {
      brandId: "bvlgari",
      name: "로즈 골데아 블러썸 딜라이트",
      description: "갓 피어난 장미와 부드러운 머스크가 어우러진 화사한 향",
      image: "/assets/perfume/bvlgari/rose-goldea-blossom-delight.jpg",
      familyIds: ["floral", "musk"],
      notes: {
        top: ["석류", "라즈베리"],
        middle: ["장미", "피오니"],
        base: ["머스크", "샌들우드"],
      },
      noteColors: { top: "#D96A8A", middle: "#E27396", base: "#B08968" },
      concept: "이슬 맺힌 장미 정원의 화사하고 로맨틱한 무드",
      aiReview:
        "과하지 않은 프루티 로즈가 '사랑스럽다'는 평. 달콤하면서 깨끗해 봄·여름 여성향으로 선호도가 높다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 8,
    perfume: {
      brandId: "bvlgari",
      name: "아쿠아 뿌르 옴므",
      description: "짙푸른 바다와 상쾌한 시트러스를 떠올리게 하는 시원한 향",
      image: "/assets/perfume/bvlgari/aqva-pour-homme.jpg",
      familyIds: ["aquatic", "citrus"],
      notes: {
        top: ["만다린", "쁘띠그레인"],
        middle: ["포시도니아(해초)", "미네랄 노트"],
        base: ["산톨리나", "클라리 세이지"],
      },
      noteColors: { top: "#F5C542", middle: "#4A90B8", base: "#52946B" },
      concept: "깊은 지중해 바다를 헤엄치는 듯한 미네랄 아쿠아틱",
      aiReview:
        "짭조름한 해조·미네랄 감이 '깊은 바다' 같다는 평으로 남성 아쿠아틱 명작으로 꼽힌다. 여름 대표작이라는 의견.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 9,
    perfume: {
      brandId: "bvlgari",
      name: "불가리 맨 우드 에센스",
      description: "푸른 숲과 따뜻한 나무의 생동감이 느껴지는 깊고 편안한 향",
      image: "/assets/perfume/bvlgari/man-wood-essence.jpg",
      familyIds: ["woody", "green"],
      notes: {
        top: ["사이프러스", "베르가못"],
        middle: ["시더우드", "베티버"],
        base: ["벤조인", "앰버"],
      },
      noteColors: { top: "#7FC29B", middle: "#9C6B4A", base: "#C89B5C" },
      concept: "이슬 젖은 침엽수림을 걷는 듯한 청량한 우디",
      aiReview:
        "상쾌한 시더·사이프러스가 '깔끔한 숲 향'으로 호평. 무난하게 데일리로 쓰기 좋은 남성 우디라는 평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 10,
    perfume: {
      brandId: "bvlgari",
      name: "불가리 맨 인 블랙",
      description: "따뜻한 향신료와 짙은 우디 노트가 어우러진 강렬하고 관능적인 향",
      image: "/assets/perfume/bvlgari/man-in-black.jpg",
      familyIds: ["oriental", "spicy"],
      notes: {
        top: ["럼", "스파이스"],
        middle: ["튜베로즈", "아이리스", "레더"],
        base: ["통카빈", "벤조인", "구아이악 우드"],
      },
      noteColors: { top: "#D08159", middle: "#8B5E3C", base: "#7A4E31" },
      concept: "가죽과 향신료로 무장한, 강인하고 관능적인 남성상",
      aiReview:
        "달콤한 럼·통카와 가죽의 조합이 '섹시하고 존재감 강하다'는 평. 지속력·확산력이 뛰어나 가을·겨울 저녁용으로 추천된다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 불리(Buly 1803) ──────────────────────────
  {
    id: 11,
    perfume: {
      brandId: "buly",
      name: "베르칸 오렌지 블로썸",
      description: "오렌지꽃과 베르가못, 네롤리가 어우러진 맑고 화사한 향",
      image: "/assets/perfume/buly/orange-blossom.jpg",
      familyIds: ["floral", "citrus"],
      notes: {
        top: ["베르가못", "네롤리"],
        middle: ["오렌지 블로섬", "재스민"],
        base: ["머스크", "앰버"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F5E6E0", base: "#E4D9C8" },
      concept: "지중해 정원에 만발한 오렌지꽃의 화사한 햇살",
      aiReview:
        "청량한 네롤리와 오렌지꽃이 '깨끗하고 우아하다'는 평. 인공감 없이 자연스러운 화이트 플로럴로 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 12,
    perfume: {
      brandId: "buly",
      name: "키소 유자",
      description: "상큼한 유자와 민트, 푸른 월계수 잎이 어우러진 산뜻한 향",
      image: "/assets/perfume/buly/kiso-yuzu.jpg",
      familyIds: ["citrus", "green"],
      notes: {
        top: ["유자", "민트"],
        middle: ["월계수 잎", "그린 노트"],
        base: ["베티버", "머스크"],
      },
      noteColors: { top: "#F5C542", middle: "#7FC29B", base: "#52946B" },
      concept: "일본 키소 계곡의 청량한 유자 밭과 산바람",
      aiReview:
        "상큼한 유자에 허브 그린이 더해져 '청량하고 세련됐다'는 평. 여름 유니섹스 시트러스로 인기.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 13,
    perfume: {
      brandId: "buly",
      name: "코미 포레스트",
      description: "비가 내린 뒤 이끼와 소나무 숲을 떠올리게 하는 촉촉하고 깊은 향",
      image: "/assets/perfume/buly/komi-forest.jpg",
      familyIds: ["green", "woody"],
      notes: {
        top: ["소나무", "베르가못"],
        middle: ["이끼", "사이프러스"],
        base: ["베티버", "시더우드"],
      },
      noteColors: { top: "#7FC29B", middle: "#52946B", base: "#9C6B4A" },
      concept: "비 갠 뒤 이끼 낀 숲, 젖은 흙과 나무의 깊은 향",
      aiReview:
        "촉촉한 이끼·솔 향이 '숲속에 있는 듯하다'는 평. 차분하고 개성 있는 그린 우디로 마니아층의 지지를 받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 14,
    perfume: {
      brandId: "buly",
      name: "다마스크 로즈",
      description: "싱그러운 장미에 생강과 베티버가 은은하게 더해진 우아한 향",
      image: "/assets/perfume/buly/damask-rose.jpg",
      familyIds: ["floral", "spicy"],
      notes: {
        top: ["생강", "베르가못"],
        middle: ["다마스크 로즈"],
        base: ["베티버", "머스크"],
      },
      noteColors: { top: "#D08159", middle: "#E27396", base: "#52946B" },
      concept: "새벽에 갓 딴 다마스크 장미의 싱그럽고 고귀한 자태",
      aiReview:
        "달지 않고 생생한 '진짜 장미' 같다는 평. 생강의 스파이시함이 더해져 우아하면서 개성 있다는 반응.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 15,
    perfume: {
      brandId: "buly",
      name: "마카사르",
      description: "부드러운 아이리스와 앰버, 담배 향이 어우러진 따뜻하고 짙은 향",
      image: "/assets/perfume/buly/makassar.jpg",
      familyIds: ["oriental", "powdery"],
      notes: {
        top: ["베르가못", "스파이스"],
        middle: ["아이리스", "타바코"],
        base: ["앰버", "샌들우드", "레더"],
      },
      noteColors: { top: "#D08159", middle: "#CDB9DE", base: "#8B5E3C" },
      concept: "고서와 가죽 장정이 놓인 서재의 고풍스러운 무드",
      aiReview:
        "파우더리한 아이리스와 담배·앰버가 '고급스럽고 중후하다'는 평. 가을·겨울 유니섹스로 선호되는 개성파.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 조 말론 ──────────────────────────
  {
    id: 16,
    perfume: {
      brandId: "jo-malone",
      name: "잉글리쉬 페어 앤 프리지아",
      description: "잘 익은 배와 화이트 프리지아에 파촐리가 은은하게 더해진 부드럽고 우아한 향",
      image: "/assets/perfume/jo-malone/english-pear-freesia.jpg",
      familyIds: ["floral", "woody"],
      notes: {
        top: ["배", "멜론"],
        middle: ["프리지아", "장미"],
        base: ["파촐리", "머스크", "앰버"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F0A6BE", base: "#C89B5C" },
      concept: "가을 과수원, 잘 익은 배와 꽃이 어우러진 우아한 오후",
      aiReview:
        "달콤한 배와 화사한 프리지아가 '실패 없는 인기 향'으로 꼽힌다. 세련되고 대중적이라 선물용으로 자주 추천.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 17,
    perfume: {
      brandId: "jo-malone",
      name: "우드 세이지 앤 씨 솔트",
      description: "바닷소금과 세이지가 어우러져 거친 해안의 바람을 떠올리게 하는 시원한 향",
      image: "/assets/perfume/jo-malone/wood-sage-sea-salt.webp",
      familyIds: ["aquatic", "woody"],
      notes: {
        top: ["암브레트 씨드"],
        middle: ["씨 솔트"],
        base: ["세이지", "드리프트우드"],
      },
      noteColors: { top: "#DCCFC0", middle: "#7EC0E8", base: "#52946B" },
      concept: "절벽 위 해안을 걷는, 소금기와 풀내음의 자유로움",
      aiReview:
        "짭짤한 소금기와 세이지가 '탁 트인 해변 같다'는 평으로 유니섹스 베스트셀러. 깔끔하고 중성적이라 호불호가 적다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 18,
    perfume: {
      brandId: "jo-malone",
      name: "라임 바질 앤 만다린",
      description: "상큼한 라임에 바질과 화이트 타임이 더해진 산뜻하고 감각적인 향",
      image: "/assets/perfume/jo-malone/lime-basil-mandarin.jpg",
      familyIds: ["citrus", "green"],
      notes: {
        top: ["라임", "만다린", "베르가못"],
        middle: ["바질", "화이트 타임"],
        base: ["파촐리", "베티버"],
      },
      noteColors: { top: "#F5C542", middle: "#7FC29B", base: "#9C6B4A" },
      concept: "허브 정원의 라임과 바질이 어우러진 상쾌한 아침",
      aiReview:
        "톡 쏘는 라임에 허브 바질이 더해져 '시트러스인데 세련됐다'는 평. 조 말론 대표 시그니처로 남녀 모두 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 19,
    perfume: {
      brandId: "jo-malone",
      name: "피오니 앤 블러쉬 스웨이드",
      description: "풍성한 피오니와 장미에 부드러운 스웨이드가 어우러진 화사한 향",
      image: "/assets/perfume/jo-malone/peony-blush-suede.jpg",
      familyIds: ["floral", "powdery"],
      notes: {
        top: ["레드 애플"],
        middle: ["피오니", "장미", "재스민"],
        base: ["스웨이드"],
      },
      noteColors: { top: "#D96A8A", middle: "#F0A6BE", base: "#B08968" },
      concept: "활짝 핀 작약 꽃다발의 여리고 화사한 여성미",
      aiReview:
        "풍성한 작약과 부드러운 스웨이드가 '여성스럽고 우아하다'는 평. 봄 시즌 선물용으로 특히 인기.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 20,
    perfume: {
      brandId: "jo-malone",
      name: "머르 앤 통카",
      description: "따뜻한 몰약과 통카빈의 바닐라 향이 어우러진 깊고 관능적인 향",
      image: "/assets/perfume/jo-malone/myrrh-tonka.jpg",
      familyIds: ["oriental", "spicy"],
      notes: {
        top: ["라벤더"],
        middle: ["몰약"],
        base: ["통카빈", "바닐라", "아몬드"],
      },
      noteColors: { top: "#9FA8DA", middle: "#C89B5C", base: "#E6CE9C" },
      concept: "따뜻한 몰약과 바닐라로 감싸는 관능적인 밤",
      aiReview:
        "달콤한 통카·바닐라에 몰약의 깊이가 더해져 '중독성 있다'는 평. 콜론 인텐스 라인 중 지속력이 뛰어나 겨울용으로 추천.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 바이레도 ──────────────────────────
  {
    id: 21,
    perfume: {
      brandId: "byredo",
      name: "블랑쉬",
      description: "깨끗한 흰 셔츠와 갓 세탁한 린넨을 떠올리게 하는 맑고 포근한 향",
      image: "/assets/perfume/byredo/blanche.jpg",
      familyIds: ["floral", "musk"],
      notes: {
        top: ["알데하이드", "핑크 페퍼"],
        middle: ["장미", "바이올렛", "피오니"],
        base: ["머스크", "샌들우드", "블론드 우드"],
      },
      noteColors: { top: "#E4D9C8", middle: "#B79ED1", base: "#DCCFC0" },
      concept: "순백의 린넨처럼 정갈하고 순수한 화이트 미니멀리즘",
      aiReview:
        "'비누·깨끗한 빨래' 이미지로 유명하며 청결한 화이트 머스크로 큰 사랑을 받는다. 은은하고 세련됐다는 평이 지배적.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 22,
    perfume: {
      brandId: "byredo",
      name: "발 다프리크",
      description: "밝은 베르가못과 부드러운 꽃향에 베티버와 시더우드가 어우러진 따뜻한 향",
      image: "/assets/perfume/byredo/bal-dafrique.jpg",
      familyIds: ["citrus", "woody"],
      notes: {
        top: ["베르가못", "레몬", "네롤리", "마리골드"],
        middle: ["바이올렛", "재스민", "시클라멘"],
        base: ["베티버", "시더우드", "머스크", "앰버"],
      },
      noteColors: { top: "#F5C542", middle: "#B79ED1", base: "#9C6B4A" },
      concept: "1920년대 파리, 아프리카 예술에 매료된 자유로운 밤의 무도회",
      aiReview:
        "따뜻한 시트러스와 우디가 균형 잡혀 '데일리로 완벽하다'는 평. 바이레도 대표 베스트셀러로 유니섹스 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 23,
    perfume: {
      brandId: "byredo",
      name: "모하비 고스트",
      description: "은은한 바이올렛과 샌들우드, 머스크가 어우러진 부드럽고 신비로운 향",
      image: "/assets/perfume/byredo/mojave-ghost.jpg",
      familyIds: ["woody", "powdery"],
      notes: {
        top: ["암브레트", "자메이칸 네스베리"],
        middle: ["바이올렛", "매그놀리아", "샌들우드"],
        base: ["시더우드", "머스크", "앰버"],
      },
      noteColors: { top: "#DCCFC0", middle: "#B79ED1", base: "#B08968" },
      concept: "사막에서 홀로 피어난 꽃, 고요하고 신비로운 생명력",
      aiReview:
        "은은한 우디 플로럴이 '조용하지만 세련됐다'는 평. 과하지 않아 데일리·유니섹스로 선호되는 스테디셀러.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 24,
    perfume: {
      brandId: "byredo",
      name: "집시 워터",
      description: "상쾌한 주니퍼와 레몬에 후추, 솔잎, 인센스가 더해진 차분한 숲의 향",
      image: "/assets/perfume/byredo/gypsy-water.jpg",
      familyIds: ["woody", "spicy"],
      notes: {
        top: ["베르가못", "레몬", "페퍼", "주니퍼 베리"],
        middle: ["인센스", "솔잎", "오리스"],
        base: ["앰버", "샌들우드", "바닐라"],
      },
      noteColors: { top: "#F5C542", middle: "#8B7E6A", base: "#E6CE9C" },
      concept: "숲속 모닥불 곁, 자유로운 집시의 방랑하는 삶",
      aiReview:
        "상쾌한 솔·주니퍼에 달큰한 바닐라 드라이다운이 '중독적'이라는 평. 유니섹스 우디로 바이레도 인기작.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 25,
    perfume: {
      brandId: "byredo",
      name: "선데이즈드",
      description: "밝은 시트러스와 네롤리에 부드러운 화이트 머스크가 어우러진 산뜻하고 편안한 향",
      image: "/assets/perfume/byredo/sundazed.jpg",
      familyIds: ["citrus", "musk"],
      notes: {
        top: ["레몬", "그린 만다린", "베르가못"],
        middle: ["네롤리", "이모르뗄"],
        base: ["머스크"],
      },
      noteColors: { top: "#F5C542", middle: "#EFD9CE", base: "#E4D9C8" },
      concept: "눈부신 여름 오후, 햇살에 나른하게 물든 시간",
      aiReview:
        "화사한 시트러스에 포근한 머스크가 이어져 '기분 좋은 여름 향'이라는 평. 가볍고 밝아 데일리로 추천된다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 르 라보 ──────────────────────────
  {
    id: 26,
    perfume: {
      brandId: "le-labo",
      name: "산탈 33",
      description: "샌들우드와 시더우드에 은은한 향신료가 더해진 건조하고 깊은 향",
      image: "/assets/perfume/le-labo/santal-33.jpg",
      familyIds: ["woody", "spicy"],
      notes: {
        top: ["바이올렛", "카다멈"],
        middle: ["아이리스", "앰브록스"],
        base: ["샌들우드", "시더우드", "레더", "앰버"],
      },
      noteColors: { top: "#B79ED1", middle: "#CDB9DE", base: "#7A4E31" },
      concept: "미국 서부의 모닥불, 가죽과 나무가 어우러진 자유의 상징",
      aiReview:
        "건조한 샌들우드·가죽 향이 '중성적이고 힙하다'는 평으로 니치 향수의 아이콘. 확산력이 강하다는 의견이 많다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 27,
    perfume: {
      brandId: "le-labo",
      name: "어나더 13",
      description: "부드러운 머스크가 피부에 포근하고 오묘하게 남는 깨끗한 향",
      image: "/assets/perfume/le-labo/another-13.jpg",
      familyIds: ["musk", "powdery"],
      notes: {
        top: ["앰브록스"],
        middle: ["재스민", "암브레트"],
        base: ["머스크", "모스", "배"],
      },
      noteColors: { top: "#DCCFC0", middle: "#F5E6E0", base: "#E4D9C8" },
      concept: "향수를 뿌리지 않은 듯, 피부에 스민 나만의 살결 냄새",
      aiReview:
        "'스킨 센트'의 대명사로 은은한 머스크가 '내 체취 같다'는 평. 유니섹스 데일리로 압도적 지지를 받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 28,
    perfume: {
      brandId: "le-labo",
      name: "베르가모트 22",
      description: "베르가못과 자몽의 쌉싸름한 생동감이 돋보이는 밝고 산뜻한 향",
      image: "/assets/perfume/le-labo/bergamote-22.jpg",
      familyIds: ["citrus", "green"],
      notes: {
        top: ["베르가못", "자몽", "쁘띠그레인"],
        middle: ["오렌지 블로섬"],
        base: ["머스크", "베티버", "앰버", "시더우드"],
      },
      noteColors: { top: "#F5C542", middle: "#F5E6E0", base: "#B08968" },
      concept: "쌉싸름하게 톡 쏘는 베르가못의 세련된 시트러스",
      aiReview:
        "밝은 시트러스가 머스크로 오래 이어져 '고급스러운 시트러스'라는 평. 여름 유니섹스로 인기가 높다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 29,
    perfume: {
      brandId: "le-labo",
      name: "리스 41",
      description: "재스민과 튜베로즈, 백합에 바닐라가 더해진 풍성하고 따뜻한 꽃향",
      image: "/assets/perfume/le-labo/lys-41.jpg",
      familyIds: ["floral", "oriental"],
      notes: {
        top: ["재스민", "백합"],
        middle: ["튜베로즈", "일랑일랑"],
        base: ["바닐라", "머스크", "우드"],
      },
      noteColors: { top: "#F5E6E0", middle: "#F0A6BE", base: "#E6CE9C" },
      concept: "만개한 백합 부케의 농밀하고 관능적인 화이트 플로럴",
      aiReview:
        "풍성한 백합·튜베로즈에 바닐라가 더해져 '화려하고 관능적'이라는 평. 존재감 있는 플로럴을 찾는 이들에게 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 30,
    perfume: {
      brandId: "le-labo",
      name: "네롤리 36",
      description: "오렌지 블로섬과 만다린에 머스크가 어우러진 밝고 부드러운 향",
      image: "/assets/perfume/le-labo/neroli-36.jpg",
      familyIds: ["floral", "citrus"],
      notes: {
        top: ["네롤리", "오렌지 블로섬", "만다린"],
        middle: ["베르가못"],
        base: ["머스크", "바닐라"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F5C542", base: "#E6CE9C" },
      concept: "햇살 아래 만개한 오렌지꽃의 화사하고 달콤한 온기",
      aiReview:
        "밝은 네롤리에 부드러운 바닐라 머스크가 더해져 '달콤하고 포근하다'는 평. 유니섹스 데일리로 무난하게 추천.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 이솝 ──────────────────────────
  {
    id: 31,
    perfume: {
      brandId: "aesop",
      name: "타싯",
      description: "유자와 바질, 베티버가 어우러진 싱그럽고 산뜻한 향",
      image: "/assets/perfume/aesop/tacit.jpg",
      familyIds: ["citrus", "green"],
      notes: {
        top: ["유자", "바질"],
        middle: ["그린 노트"],
        base: ["베티버"],
      },
      noteColors: { top: "#F5C542", middle: "#7FC29B", base: "#52946B" },
      concept: "지중해 텃밭의 유자와 허브가 어우러진 청량한 그린",
      aiReview:
        "상쾌한 유자에 허브 그린이 더해져 '깨끗하고 세련됐다'는 평. 이솝 특유의 절제된 무드로 유니섹스 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 32,
    perfume: {
      brandId: "aesop",
      name: "카르스트",
      description: "차가운 바닷바람에 주니퍼와 커민이 더해진 선명하고 독특한 향",
      image: "/assets/perfume/aesop/karst.jpg",
      familyIds: ["aquatic", "spicy"],
      notes: {
        top: ["해양 노트", "주니퍼"],
        middle: ["커민", "스파이스"],
        base: ["우드", "베티버"],
      },
      noteColors: { top: "#7EC0E8", middle: "#D08159", base: "#9C6B4A" },
      concept: "바람에 깎인 해안 석회암 절벽의 거칠고 미네랄한 풍경",
      aiReview:
        "짭짤한 해양감에 스파이시함이 더해져 '개성 강하다'는 평. 흔하지 않은 아쿠아틱을 찾는 마니아에게 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 33,
    perfume: {
      brandId: "aesop",
      name: "글룸",
      description: "미모사와 아이리스에 은은한 향신료가 더해진 부드럽고 몽환적인 향",
      image: "/assets/perfume/aesop/gloam.jpg",
      familyIds: ["floral", "powdery"],
      notes: {
        top: ["사프란"],
        middle: ["미모사", "아이리스", "수선화"],
        base: ["우드", "스파이스"],
      },
      noteColors: { top: "#D08159", middle: "#CDB9DE", base: "#9C6B4A" },
      concept: "해 질 녘의 어스름, 몽환적으로 번지는 파우더리 플로럴",
      aiReview:
        "사프란과 파우더리 플로럴이 '몽환적이고 고급스럽다'는 평. 독특하고 우아해 개성파에게 사랑받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 34,
    perfume: {
      brandId: "aesop",
      name: "마라케시 인텐스",
      description: "카다멈과 클로브, 샌들우드가 어우러진 따뜻하고 풍성한 향",
      image: "/assets/perfume/aesop/marrakech-intense.jpg",
      familyIds: ["oriental", "spicy"],
      notes: {
        top: ["카다멈", "베르가못"],
        middle: ["클로브", "장미", "재스민"],
        base: ["샌들우드", "시더우드"],
      },
      noteColors: { top: "#D08159", middle: "#E27396", base: "#9C6B4A" },
      concept: "모로코 마라케시 시장의 향신료와 나무가 어우러진 이국적 무드",
      aiReview:
        "따뜻한 향신료에 우디가 더해져 '이국적이고 포근하다'는 평. 가을·겨울 유니섹스로 선호되는 스파이시 우디.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 35,
    perfume: {
      brandId: "aesop",
      name: "훨",
      description: "편백나무와 베티버, 인센스가 어우러진 고요하고 깊은 숲의 향",
      image: "/assets/perfume/aesop/hwyl.jpg",
      familyIds: ["woody", "green"],
      notes: {
        top: ["사이프러스"],
        middle: ["베티버"],
        base: ["인센스", "프랑킨센스"],
      },
      noteColors: { top: "#7FC29B", middle: "#52946B", base: "#8B7E6A" },
      concept: "안개 낀 숲 사원, 향 연기가 피어오르는 명상의 순간",
      aiReview:
        "스모키한 편백·인센스가 '고요하고 명상적'이라는 평. 차분한 우디를 찾는 이들에게 이솝 대표작으로 꼽힌다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 딥티크 ──────────────────────────
  {
    id: 36,
    perfume: {
      brandId: "diptyque",
      name: "오 데 상스",
      description: "비터 오렌지와 오렌지 블로섬에 주니퍼와 파촐리가 어우러진 선명하고 싱그러운 향",
      image: "/assets/perfume/diptyque/eau-des-sens.jpg",
      familyIds: ["citrus", "green"],
      notes: {
        top: ["비터 오렌지", "안젤리카"],
        middle: ["오렌지 블로섬", "주니퍼 베리"],
        base: ["파촐리"],
      },
      noteColors: { top: "#F5C542", middle: "#EFD9CE", base: "#9C6B4A" },
      concept: "빛과 그림자, 감각을 깨우는 비터 오렌지의 대비",
      aiReview:
        "쌉싸름한 비터 오렌지에 파촐리의 깊이가 더해져 '고급스러운 시트러스'라는 평. 유니섹스로 데일리 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 37,
    perfume: {
      brandId: "diptyque",
      name: "플뢰르 드 포",
      description: "포근한 화이트 머스크와 아이리스가 피부처럼 부드럽게 감싸는 은은한 향",
      image: "/assets/perfume/diptyque/fleur-de-peau.jpg",
      familyIds: ["musk", "powdery"],
      notes: {
        top: ["알데하이드", "베르가못"],
        middle: ["아이리스", "암브레트"],
        base: ["머스크", "레더", "앰버"],
      },
      noteColors: { top: "#E4D9C8", middle: "#CDB9DE", base: "#8B5E3C" },
      concept: "에로스와 프시케의 신화, 살결에 스민 사랑의 온기",
      aiReview:
        "파우더리 아이리스와 머스크가 '살결 같은 포근함'이라는 평. 은은하고 고급스러워 유니섹스로 사랑받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 38,
    perfume: {
      brandId: "diptyque",
      name: "도손",
      description: "튜베로즈와 재스민의 풍성한 꽃향에 바닷바람의 청량함이 더해진 향",
      image: "/assets/perfume/diptyque/do-son.jpg",
      familyIds: ["floral", "aquatic"],
      notes: {
        top: ["장미", "아프리칸 오렌지 플라워"],
        middle: ["튜베로즈", "재스민"],
        base: ["머스크", "벤조인", "핑크 페퍼"],
      },
      noteColors: { top: "#F0A6BE", middle: "#F5E6E0", base: "#E4D9C8" },
      concept: "베트남 해안 도손, 바닷바람에 실려오는 튜베로즈 향기",
      aiReview:
        "무겁지 않고 청량한 튜베로즈가 '가벼운 화이트 플로럴'로 호평. 여름에도 부담 없다는 평이 많다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 39,
    perfume: {
      brandId: "diptyque",
      name: "탐다오",
      description: "부드러운 샌들우드에 사이프러스와 은은한 향신료가 어우러진 차분한 향",
      image: "/assets/perfume/diptyque/tam-dao.jpg",
      familyIds: ["woody", "spicy"],
      notes: {
        top: ["사이프러스", "로즈우드"],
        middle: ["샌들우드", "시더우드"],
        base: ["앰버", "머스크", "스파이스"],
      },
      noteColors: { top: "#7FC29B", middle: "#9C6B4A", base: "#C89B5C" },
      concept: "베트남 탐다오 산맥의 사원, 크리미한 샌들우드의 고요함",
      aiReview:
        "부드럽고 크리미한 샌들우드가 '따뜻하고 편안하다'는 평. 딥티크 대표 우디로 유니섹스 스테디셀러.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 40,
    perfume: {
      brandId: "diptyque",
      name: "로",
      description: "클로브와 시나몬에 꽃과 나무 향이 더해진 따뜻하고 고전적인 향",
      image: "/assets/perfume/diptyque/leau.jpg",
      familyIds: ["oriental", "spicy"],
      notes: {
        top: ["클로브", "시나몬"],
        middle: ["장미", "제라늄"],
        base: ["샌들우드"],
      },
      noteColors: { top: "#C0563A", middle: "#E27396", base: "#9C6B4A" },
      concept: "16세기 유럽의 포푸리에서 영감받은 고전적 향신료의 무드",
      aiReview:
        "진한 클로브·시나몬이 '고전적이고 개성 강하다'는 평. 스파이시 오리엔탈을 좋아하는 마니아층의 지지를 받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 샤넬 ──────────────────────────
  {
    id: 41,
    perfume: {
      brandId: "chanel",
      name: "샹스 오 탕드르",
      description: "재스민과 장미에 부드러운 화이트 머스크가 어우러진 맑고 사랑스러운 향",
      image: "/assets/perfume/chanel/chance-eau-tendre.jpg",
      familyIds: ["floral", "musk"],
      notes: {
        top: ["자몽", "퀸스"],
        middle: ["재스민", "히아신스"],
        base: ["앰버", "화이트 머스크", "아이리스"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F0A6BE", base: "#E4D9C8" },
      concept: "행운을 부르는 원형의 향, 상큼하고 사랑스러운 소녀의 설렘",
      aiReview:
        "프루티한 자몽에 화사한 플로럴이 '사랑스럽고 대중적'이라는 평. 여성 데일리로 꾸준히 사랑받는 스테디셀러.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 42,
    perfume: {
      brandId: "chanel",
      name: "블루 드 샤넬",
      description: "산뜻한 시트러스와 깊은 시더우드, 샌들우드가 어우러진 깔끔하고 세련된 향",
      image: "/assets/perfume/chanel/bleu-de-chanel.jpg",
      familyIds: ["woody", "citrus"],
      notes: {
        top: ["자몽", "레몬", "민트", "핑크 페퍼"],
        middle: ["생강", "넛맥", "재스민"],
        base: ["인센스", "베티버", "시더우드", "샌들우드"],
      },
      noteColors: { top: "#F5C542", middle: "#D08159", base: "#7A4E31" },
      concept: "관습에 얽매이지 않는 자유로운 남성, 깊고 청량한 우디",
      aiReview:
        "청량한 시트러스에 우디의 깊이가 더해져 '남자 향수의 정석'이라는 평. 실패 없는 대중적 명작으로 압도적 지지.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 43,
    perfume: {
      brandId: "chanel",
      name: "코코 마드모아젤",
      description: "생기 있는 오렌지와 장미, 재스민에 파촐리가 더해진 화사하고 관능적인 향",
      image: "/assets/perfume/chanel/coco-mademoiselle.jpg",
      familyIds: ["oriental", "citrus"],
      notes: {
        top: ["오렌지", "베르가못", "자몽"],
        middle: ["장미", "재스민", "리치"],
        base: ["파촐리", "베티버", "바닐라", "화이트 머스크"],
      },
      noteColors: { top: "#F5C542", middle: "#E27396", base: "#9C6B4A" },
      concept: "당당하고 매혹적인 현대 여성상, 화사하면서 관능적인 오리엔탈",
      aiReview:
        "화사한 시트러스에 관능적인 파촐리가 더해져 '세련되고 당당하다'는 평. 여성 향수의 아이콘으로 선호도가 매우 높다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 44,
    perfume: {
      brandId: "chanel",
      name: "N°5 로",
      description: "밝은 시트러스와 장미, 재스민에 화이트 머스크가 부드럽게 이어지는 깨끗한 향",
      image: "/assets/perfume/chanel/no5-leau.jpg",
      familyIds: ["floral", "powdery"],
      notes: {
        top: ["레몬", "만다린", "알데하이드"],
        middle: ["장미", "재스민", "일랑일랑"],
        base: ["시더우드", "화이트 머스크"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F0A6BE", base: "#E4D9C8" },
      concept: "전설적인 N°5를 현대적으로 재해석한, 투명하고 산뜻한 플로럴",
      aiReview:
        "고전 N°5보다 가볍고 깨끗해 '젊고 현대적'이라는 평. 알데하이드 플로럴 입문용으로도 자주 추천된다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 45,
    perfume: {
      brandId: "chanel",
      name: "샹스",
      description: "재스민과 핑크 페퍼, 파촐리가 어우러진 생기 있고 매혹적인 향",
      image: "/assets/perfume/chanel/chance.jpg",
      familyIds: ["floral", "spicy"],
      notes: {
        top: ["핑크 페퍼", "레몬", "파인애플"],
        middle: ["재스민", "아이리스"],
        base: ["파촐리", "베티버", "앰버", "바닐라"],
      },
      noteColors: { top: "#F5C542", middle: "#F0A6BE", base: "#C89B5C" },
      concept: "예측할 수 없는 행운처럼 발랄하고 매혹적인 스파이시 플로럴",
      aiReview:
        "톡 쏘는 핑크 페퍼에 화사한 플로럴이 '생기 있고 화려하다'는 평. 확산력이 좋고 존재감 있다는 반응이 많다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 산타 마리아 노벨라 ──────────────────────────
  {
    id: 46,
    perfume: {
      brandId: "santa-maria-novella",
      name: "아쿠아 델라 레지나",
      description: "이탈리아 시트러스와 네롤리에 로즈메리와 라벤더가 더해진 산뜻하고 우아한 향",
      image: "/assets/perfume/santa-maria-novella/acqua-della-regina.jpg",
      familyIds: ["citrus", "green"],
      notes: {
        top: ["베르가못", "레몬", "네롤리"],
        middle: ["로즈메리", "라벤더", "오렌지 블로섬"],
        base: ["머스크"],
      },
      noteColors: { top: "#F5C542", middle: "#9FA8DA", base: "#E4D9C8" },
      concept: "카트린 드 메디치를 위해 탄생한, 유서 깊은 왕비의 향수",
      aiReview:
        "허브가 가미된 클래식 시트러스가 '우아하고 품격 있다'는 평. 세계에서 가장 오래된 향수 중 하나로 상징성이 크다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 47,
    perfume: {
      brandId: "santa-maria-novella",
      name: "아쿠아",
      description: "맑은 물결을 떠올리게 하는 연꽃과 프리지아에 부드러운 머스크가 이어지는 투명한 향",
      image: "/assets/perfume/santa-maria-novella/acqua.jpg",
      familyIds: ["aquatic", "floral"],
      notes: {
        top: ["베르가못", "아쿠아틱 노트"],
        middle: ["연꽃", "프리지아"],
        base: ["머스크", "우드"],
      },
      noteColors: { top: "#7EC0E8", middle: "#F5E6E0", base: "#E4D9C8" },
      concept: "맑은 샘물이 흐르는 듯한 투명하고 청량한 워터리 플로럴",
      aiReview:
        "맑은 물빛 플로럴이 '깨끗하고 시원하다'는 평. 은은해서 계절 구애 없이 데일리로 쓰기 좋다는 반응.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 48,
    perfume: {
      brandId: "santa-maria-novella",
      name: "로사 노벨라",
      description: "풍성한 장미와 화이트 플라워에 은은한 향신료와 나무 향이 더해진 생기 있는 향",
      image: "/assets/perfume/santa-maria-novella/rosa-novella.jpg",
      familyIds: ["floral", "spicy"],
      notes: {
        top: ["베르가못"],
        middle: ["장미", "화이트 플라워"],
        base: ["스파이스", "우드", "머스크"],
      },
      noteColors: { top: "#F5C542", middle: "#E27396", base: "#9C6B4A" },
      concept: "수도원 정원에 만개한 장미의 싱그럽고 생기 있는 자태",
      aiReview:
        "생생한 로즈에 스파이시 우디가 더해져 '고급스러운 장미 향'이라는 평. 달지 않은 정통 로즈를 찾는 이들에게 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 49,
    perfume: {
      brandId: "santa-maria-novella",
      name: "리리스",
      description: "아이리스의 부드러운 파우더 향에 갈바넘과 네롤리가 더해진 맑고 세련된 향",
      image: "/assets/perfume/santa-maria-novella/liris.jpg",
      familyIds: ["powdery", "green"],
      notes: {
        top: ["갈바넘", "네롤리"],
        middle: ["아이리스"],
        base: ["머스크", "파우더리 노트"],
      },
      noteColors: { top: "#7FC29B", middle: "#CDB9DE", base: "#DCCFC0" },
      concept: "고요한 우아함, 그린 갈바넘이 감싼 파우더리 아이리스",
      aiReview:
        "파우더리한 아이리스에 그린의 청량함이 더해져 '차분하고 세련됐다'는 평. 아이리스 애호가들에게 특히 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 50,
    perfume: {
      brandId: "santa-maria-novella",
      name: "멜로그라노",
      description: "석류와 장미, 일랑일랑에 따뜻한 향신료와 머스크가 어우러진 깊고 고전적인 향",
      image: "/assets/perfume/santa-maria-novella/melograno.jpg",
      familyIds: ["oriental", "spicy"],
      notes: {
        top: ["석류", "시트러스"],
        middle: ["장미", "일랑일랑", "카네이션"],
        base: ["머스크", "스파이스", "우드"],
      },
      noteColors: { top: "#D96A8A", middle: "#E27396", base: "#9C6B4A" },
      concept: "르네상스 피렌체를 상징하는 석류, 풍요롭고 고전적인 향신료의 향",
      aiReview:
        "석류의 프루티함에 향신료 오리엔탈이 더해져 '깊고 고풍스럽다'는 평. 브랜드의 상징적 향으로 개성파에게 사랑받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
];
