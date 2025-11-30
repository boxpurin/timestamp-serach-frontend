export interface TimeStampData {
  videoId: string;
  description: string;
  elapsedTime: number;
  videoDetails?: TimeStampVideoDetail;
}

export interface TimeStampVideoDetail {
  title: string;
  tags: [string];
  thumbnailUrl: string;
  publishedAt: Date;
  actualStartAt: Date;
}

export interface TimeStampSearchResult {
  items: TimeStampData[];
  page: number;
  perPage: number;
  totalPages: number;
  totalHits: number;
}
