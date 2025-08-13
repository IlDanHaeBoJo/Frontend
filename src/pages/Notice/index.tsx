import React, { useState, useEffect } from "react";
import * as S from "./style";
import { getStudentNotices } from "../../apis/notice";
import type { GetNotice } from "../../types/notice";
import { dummyNotices } from "../../types/notice";

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
    return <S.Wrapper>공지사항을 불러오는 중입니다...</S.Wrapper>;
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
