import React, { useState, useEffect } from "react";
import * as S from "./style";
import {
  createNotice,
  getAdminNotices,
  updateNotice,
  deleteNotice,
} from "../../apis/notice";
import { useUser } from "../../store/UserContext";
import { GetNotice, dummyNotices } from "../../types/notice";

const NoticeManage = () => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [notices, setNotices] = useState<GetNotice[]>([]);
  const [editingNotice, setEditingNotice] = useState<GetNotice | null>(null);

  const fetchNotices = async () => {
    try {
      const data = await getAdminNotices();
      if (data && data.length > 0) {
        setNotices(data);
      } else {
        setNotices(dummyNotices);
      }
    } catch (error) {
      console.error("Failed to fetch notices:", error);
      setNotices(dummyNotices);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handlePublish = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const noticeData = {
      title,
      content,
      important,
      author_id: user.id,
    };

    try {
      if (editingNotice) {
        await updateNotice(editingNotice.notice_id, {
          title,
          content,
          important,
        });
        alert("공지사항이 성공적으로 수정되었습니다.");
      } else {
        await createNotice(noticeData);
        alert("공지사항이 성공적으로 게시되었습니다.");
      }
      resetForm();
      fetchNotices();
    } catch (error) {
      console.error("Failed to publish notice:", error);
      alert("공지사항 처리에 실패했습니다.");
    }
  };

  const handleEditClick = (notice: GetNotice) => {
    setEditingNotice(notice);
    setTitle(notice.title);
    setContent(notice.content);
    setImportant(notice.important);
  };

  const resetForm = () => {
    setEditingNotice(null);
    setTitle("");
    setContent("");
    setImportant(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
      try {
        await deleteNotice(id);
        alert("공지사항이 삭제되었습니다.");
        fetchNotices();
      } catch (error) {
        console.error("Failed to delete notice:", error);
        alert("공지사항 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <S.Container>
      <S.FormSection>
        <S.FormTitle>
          {editingNotice ? "✍️ 공지사항 수정" : "✍️ 새 공지사항 작성"}
        </S.FormTitle>
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
            <S.FileButton>📎파일선택</S.FileButton>
          </S.FileInput>
        </S.InputGroup>
        <S.ButtonSection>
          {editingNotice && (
            <S.CancelButton onClick={resetForm}>취소</S.CancelButton>
          )}
          <S.PublishButton onClick={handlePublish}>
            {editingNotice ? "💾 수정하기" : "🚀 게시하기"}
          </S.PublishButton>
        </S.ButtonSection>
      </S.FormSection>
      <S.ListSection>
        <S.ListTitle>📋 기존 공지사항 관리</S.ListTitle>
        {notices.map((notice) => (
          <S.NoticeCard key={notice.notice_id}>
            <S.NoticeTitle>
              {notice.important && <S.ImportantBadge>중요</S.ImportantBadge>}
              {notice.title}
            </S.NoticeTitle>
            <S.NoticeInfo>
              <span>
                {new Date(notice.created_at).toLocaleDateString()} 작성
              </span>
              <span>•</span>
              <span>조회 {notice.view_count}회</span>
              <S.StatusBadge>게시중</S.StatusBadge>
            </S.NoticeInfo>
            <S.ActionButtons>
              <S.EditButton onClick={() => handleEditClick(notice)}>
                ✏️ 편집
              </S.EditButton>
              <S.DeleteButton onClick={() => handleDelete(notice.notice_id)}>
                🗑️ 삭제
              </S.DeleteButton>
            </S.ActionButtons>
          </S.NoticeCard>
        ))}
      </S.ListSection>
    </S.Container>
  );
};

export default NoticeManage;
