export type PerfumeNotes = {
  top: string[];
  middle: string[];
  base: string[];
};

export type PerfumeNoteColors = {
  top: string;
  middle: string;
  base: string;
};

export type PerfumeEntry = {
  id: number;
  perfume: {
    brandId: string;
    name: string;
    description: string;
    detailDescription: string;
    detailTitle: string;
    image: string;
    familyIds: string[];
    notes: PerfumeNotes;
    noteColors: PerfumeNoteColors;
    aiReview: string;
  };
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

export const perfumeData: PerfumeEntry[];
