import React, { useState, useEffect } from "react";
import * as S from "./style";
import { getStudentNotices } from "../../apis/notice";
import type { GetNotice } from "../../types/notice";

const dummyNotices: GetNotice[] = [
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

const Notice = () => {
  const [notices, setNotices] = useState<GetNotice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<GetNotice | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getStudentNotices();
        if (data && data.length > 0) {
          setNotices(data);
          setSelectedNotice(data[0]);
        } else {
          setNotices(dummyNotices);
          setSelectedNotice(dummyNotices[0]);
        }
      } catch (error) {
        console.error("Failed to fetch notices:", error);
        setNotices(dummyNotices);
        setSelectedNotice(dummyNotices[0]);
      }
    };

    fetchNotices();
  }, []);

  if (!selectedNotice) {
    return <div>공지사항을 불러오는 중입니다...</div>;
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.NoticeDetails>
          <S.Title>{selectedNotice.title}</S.Title>
          <S.Date>
            {new Date(selectedNotice.created_at).toLocaleDateString()}
          </S.Date>
          <S.Divider />
          <S.Content>
            {selectedNotice.content.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </S.Content>
          {/* {selectedNotice.file && (
            <S.Attachments>
              <S.AttachmentsTitle>첨부파일</S.AttachmentsTitle>
              <S.AttachmentFile>
                <S.FileIcon>📄</S.FileIcon>
                <S.FileName>{selectedNotice.file}</S.FileName>
              </S.AttachmentFile>
            </S.Attachments>
          )} */}
        </S.NoticeDetails>
        <S.NoticeList>
          {notices.map((notice) => (
            <S.NoticeItem
              key={notice.notice_id}
              active={selectedNotice.notice_id === notice.notice_id}
              onClick={() => setSelectedNotice(notice)}
            >
              <S.NoticeItemTitleWrapper>
                {notice.important && <S.Badge>중요</S.Badge>}
                <S.NoticeItemTitle>{notice.title}</S.NoticeItemTitle>
              </S.NoticeItemTitleWrapper>
              <S.NoticeItemDate>
                {new Date(notice.created_at).toLocaleDateString()}
              </S.NoticeItemDate>
            </S.NoticeItem>
          ))}
        </S.NoticeList>
      </S.Container>
    </S.Wrapper>
  );
};

export default Notice;
