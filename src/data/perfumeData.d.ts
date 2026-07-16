export type PerfumeEntry = {
  id: number;
  perfume: {
    brandId: string;
    name: string;
    description: string;
    image: string;
    familyIds: string[];
  };
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

export const perfumeData: PerfumeEntry[];
