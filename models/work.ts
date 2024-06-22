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

export interface WorkFiltersPayload {
  search: string;
  tagList_search: string;
  selectedTagList?: string[];
}
