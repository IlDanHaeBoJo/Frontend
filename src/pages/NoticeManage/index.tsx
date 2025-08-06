import React, { useState } from "react";
import * as S from "./style";
import { createNotice } from "../../apis/notice";
import { useUser } from "../../store/UserContext";

const NoticeManage = () => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);

  const handlePublish = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      await createNotice({
        title,
        content,
        important,
        author_id: user.id,
      });
      alert("공지사항이 성공적으로 게시되었습니다.");
      // Optionally, refresh the list of notices or clear the form
      setTitle("");
      setContent("");
      setImportant(false);
    } catch (error) {
      console.error("Failed to publish notice:", error);
      alert("공지사항 게시에 실패했습니다.");
    }
  };

  const notices = [
    {
      id: 1,
      important: true,
      title: "CPX 실습 일정 변경 안내",
      date: "2024.01.15",
      views: 234,
      status: "게시중",
    },
    {
      id: 2,
      important: false,
      title: "CPX 평가 기준 업데이트 안내",
      date: "2024.01.10",
      views: 156,
      status: "게시중",
    },
    {
      id: 3,
      important: false,
      title: "시스템 점검 안내 (1월 20일 02:00~04:00)",
      date: "2024.01.08",
      views: 89,
      status: "게시중",
    },
  ];

  return (
    <S.Container>
      <S.FormSection>
        <S.FormTitle>✍️ 새 공지사항 작성</S.FormTitle>
        <S.InputGroup>
          <S.Label>제목 *</S.Label>
          <S.Input
            placeholder="공지사항 제목을 입력하세요..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label>중요도</S.Label>
          <S.Select
            value={important ? "중요" : "일반"}
            onChange={(e) => setImportant(e.target.value === "중요")}
          >
            <option>일반</option>
            <option>중요</option>
          </S.Select>
        </S.InputGroup>
        <S.InputGroup>
          <S.Label>내용 *</S.Label>
          <S.Textarea
            placeholder="공지사항 내용을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label>첨부파일</S.Label>
          <S.FileInput>
            <span>파일을 선택하거나 드래그하세요 (최대 10MB)</span>
            <S.FileButton>📎 파일선택</S.FileButton>
          </S.FileInput>
        </S.InputGroup>
        <S.ButtonSection>
          {/* <S.DraftButton>💾 임시저장</S.DraftButton> */}
          <S.PublishButton onClick={handlePublish}>🚀 게시하기</S.PublishButton>
        </S.ButtonSection>
      </S.FormSection>
      <S.ListSection>
        <S.ListTitle>📋 기존 공지사항 관리</S.ListTitle>
        {notices.map((notice) => (
          <S.NoticeCard key={notice.id}>
            <S.NoticeTitle>
              {notice.important && <S.ImportantBadge>중요</S.ImportantBadge>}
              {notice.title}
            </S.NoticeTitle>
            <S.NoticeInfo>
              <span>{notice.date} 작성</span>
              <span>•</span>
              <span>조회 {notice.views}회</span>
              <S.StatusBadge>{notice.status}</S.StatusBadge>
            </S.NoticeInfo>
            <S.ActionButtons>
              <S.EditButton>✏️ 편집</S.EditButton>
              <S.DeleteButton>🗑️ 삭제</S.DeleteButton>
            </S.ActionButtons>
          </S.NoticeCard>
        ))}
      </S.ListSection>
    </S.Container>
  );
};

export default NoticeManage;
