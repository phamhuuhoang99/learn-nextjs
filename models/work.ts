export interface Work {
  id: string;
  title: string;
  tagList: string[];
  fullDescription: string;
  shortDescription: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkPayload extends Work {
  thumbnail: null | {
    file: File | null;
    previewUrl: string;
  };
}

export interface WorkFiltersPayload {
  search: string;
  tagList_like?: string;
  selectedTagList?: string[];
}
