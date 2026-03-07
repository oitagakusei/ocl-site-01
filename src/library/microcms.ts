// SDK利用準備
// import type { arrayOutputType } from "astro:schema";
import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  // MicroCMSListResponse,
  MicroCMSImage,
  // MicroCMSListContent,
} from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// ImageField
export type ImageField = {
  url: string;
  width: string;
  height: string;
};

// news
export type News = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  url: string;
  thumbnail?: MicroCMSImage;
  thumbnailAlt: string;
  category: string[];
};
export type NewsResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: News[];
};

// APIの呼び出し
// 全ブログ記事取得
export const getNews = async (queries?: MicroCMSQueries) => {
  return await client.get<NewsResponse>({ endpoint: "news", queries });
};

// 100件以上の全件取得（ページネーションで複数回リクエスト）
export const getAllNews = async (queries?: MicroCMSQueries): Promise<NewsResponse> => {
  const limit = 100;
  let offset = 0;
  let allContents: News[] = [];
  let totalCount = 0;

  do {
    const res = await client.get<NewsResponse>({
      endpoint: "news",
      queries: {
        ...queries,
        limit,
        offset,
      },
    });

    allContents = allContents.concat(res.contents);
    totalCount = res.totalCount;
    offset += limit;
  } while (offset < totalCount);

  return {
    totalCount,
    offset: 0,
    limit: allContents.length,
    contents: allContents,
  };
};

// 特定のブログ記事取得
export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
};

// networking events
export type NetworkingEvent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  eventDate: string;
  titleText: string;
  thumbnail?: {
    url: string;
    width?: number;
    height?: number;
  };
  thumbnailAlt?: string;
  text: string;
  newsId?: string;
  sortOrder?: number;
};

export type NetworkingEventResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: NetworkingEvent[];
};

export const getNetworkingEvents = async (queries?: MicroCMSQueries) => {
  return await client.get<NetworkingEventResponse>({
    endpoint: "networking-events",
    queries,
  });
};

// co creation
export type CoCreation = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  titleText: string;
  thumbnail?: {
    url: string;
    width?: number;
    height?: number;
  };
  thumbnailAlt?: string;
  text: string;
  newsId?: string;
  sortOrder?: number;
};

export type CoCreationResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: CoCreation[];
};

export const getCoCreation = async (queries?: MicroCMSQueries) => {
  return await client.get<CoCreationResponse>({
    endpoint: "co-creation",
    queries,
  });
};

// voices
export type Voice = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  category: string;
  text: string;
  name: string;
  title?: string;
  sortOrder?: number;
};

export type VoiceResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Voice[];
};

export const getVoices = async (queries?: MicroCMSQueries) => {
  return await client.get<VoiceResponse>({
    endpoint: "voices",
    queries,
  });
};

// members
export type Member = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  photo?: {
    url: string;
    width?: number;
    height?: number;
  };
  // photoAlt?: string;
  name: string;
  position?: string;
  affiliation: string;
  role: string;
  message: string;
  sortOrder?: number;
};

export type MemberResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Member[];
};

export const getMembers = async (queries?: MicroCMSQueries) => {
  return await client.get<MemberResponse>({
    endpoint: "members",
    queries,
  });
};
