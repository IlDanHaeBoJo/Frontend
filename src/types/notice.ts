export interface GetNotice {
  title: string;
  content: string;
  important: boolean;
  author_id: number;
  notice_id: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export const dummyNotices: GetNotice[] = [
  {
    notice_id: 1,
    title: "[중요] 더미 데이터 1입니다.",
    content:
      "이것은 첫 번째 더미 데이터입니다. API 호출에 실패했거나 공지사항이 없습니다.",
    important: true,
    author_id: 0,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    notice_id: 2,
    title: "더미 데이터 2입니다.",
    content: "이것은 두 번째 더미 데이터입니다.",
    important: false,
    author_id: 0,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
