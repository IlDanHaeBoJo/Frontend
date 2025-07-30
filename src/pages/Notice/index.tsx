import React from "react";
import * as S from "./style";

const Notice = () => {
  const notices = [
    {
      id: 1,
      important: true,
      title: "[필수] 2024년 1학기 CPX 실습 일정 변경 안내",
      date: "2024.01.15",
      content:
        "코로나19 상황으로 인해 기존 대면 실습에서 온라인 실습으로 변경됩니다. 자세한 내용은 본문을 확인해주세요.",
    },
    {
      id: 2,
      important: false,
      title: "CPX 평가 기준 업데이트 안내",
      date: "2024.01.10",
      content:
        "2024학년도부터 적용될 새로운 CPX 평가 기준에 대해 안내드립니다.",
    },
    {
      id: 3,
      important: false,
      title: "시스템 점검 안내 (1월 20일 02:00~04:00)",
      date: "2024.01.08",
      content:
        "정기 시스템 점검으로 인해 해당 시간 동안 서비스 이용이 제한됩니다.",
    },
    {
      id: 4,
      important: false,
      title: "신규 업데이트: 음성 인식 기능 개선",
      date: "2024.01.05",
      content:
        "CPX 실습 중 음성 인식 정확도가 크게 향상되었습니다. 더욱 자연스러운 대화가 가능합니다.",
    },
  ];

  return (
    <S.Container>
      <S.Title>📢 공지사항</S.Title>
      {notices.map((notice) => (
        <S.NoticeCard key={notice.id}>
          <S.CardHeader>
            <S.NoticeTitle>
              {notice.important && <S.ImportantBadge>중요</S.ImportantBadge>}
              {notice.title}
            </S.NoticeTitle>
            <S.NoticeDate>{notice.date}</S.NoticeDate>
          </S.CardHeader>
          <S.NoticeContent>{notice.content}</S.NoticeContent>
        </S.NoticeCard>
      ))}
    </S.Container>
  );
};

export default Notice;
