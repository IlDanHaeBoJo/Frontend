import React, { useState } from "react";
import * as S from "./style";

const notices = [
  {
    id: 1,
    title: "[필수] 2024년 1학기 CPX 실습 일정 변경 안내ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ",
    date: "2024.01.15",
    content:
      "코로나19 상황으로 인해 기존 대면 실습에서 온라인 실습으로 변경됩니다. 자세한 내용은 본문을 확인해주세요.\n\n온라인 실습은 Zoom을 통해 진행되며, 실습 링크는 추후 공지될 예정입니다.\n\n실습 관련 문의는 cpx@medicpx.com으로 연락주시기 바랍니다.",
    file: "2024년 1학기 CPX 실습 일정 변경 안내.pdf",
    important: true,
  },
  {
    id: 2,
    title: "CPX 평가 기준 업데이트 안내",
    date: "2024.01.10",
    content:
      "CPX 평가 기준이 업데이트되었습니다. 자세한 내용은 본문을 확인해주세요.",
    file: null,
    important: false,
  },
  {
    id: 3,
    title: "시스템 점검 안내 (1월 20일 02:00~04:00)",
    date: "2024.01.08",
    content: "시스템 점검이 있을 예정입니다. 이용에 참고 부탁드립니다.",
    file: null,
    important: false,
  },
  {
    id: 4,
    title: "신규 업데이트: 음성 인식 기능 개선",
    date: "2024.01.05",
    content: "음성 인식 기능이 개선되었습니다. 많은 이용 바랍니다.",
    file: null,
    important: false,
  },
];

const Notice = () => {
  const [selectedNotice, setSelectedNotice] = useState(notices[0]);

  return (
    <S.Wrapper>
      <S.Container>
        <S.NoticeDetails>
          <S.Title>{selectedNotice.title}</S.Title>
          <S.Date>{selectedNotice.date}</S.Date>
          <S.Divider />
          <S.Content>
            {selectedNotice.content.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </S.Content>
          {selectedNotice.file && (
            <S.Attachments>
              <S.AttachmentsTitle>첨부파일</S.AttachmentsTitle>
              <S.AttachmentFile>
                <S.FileIcon>📄</S.FileIcon>
                <S.FileName>{selectedNotice.file}</S.FileName>
              </S.AttachmentFile>
            </S.Attachments>
          )}
        </S.NoticeDetails>
        <S.NoticeList>
          {notices.map((notice) => (
            <S.NoticeItem
              key={notice.id}
              active={selectedNotice.id === notice.id}
              onClick={() => setSelectedNotice(notice)}
            >
              <S.NoticeItemTitleWrapper>
                {notice.important && <S.Badge>중요</S.Badge>}
                <S.NoticeItemTitle>{notice.title}</S.NoticeItemTitle>
              </S.NoticeItemTitleWrapper>
              <S.NoticeItemDate>{notice.date}</S.NoticeItemDate>
            </S.NoticeItem>
          ))}
        </S.NoticeList>
      </S.Container>
    </S.Wrapper>
  );
};

export default Notice;
