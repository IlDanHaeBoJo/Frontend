import React from "react";
import * as S from "./style";

const PracticeProgress = () => {
  return (
    <S.Container>
      <S.ControlSection>
        <S.Timer>00:00</S.Timer>
        <S.Button>실습 시작</S.Button>
        <S.Button disabled>실습 종료</S.Button>
        <S.SubmitButton>✅ 제출</S.SubmitButton>
      </S.ControlSection>
      <S.PracticeArea>
        <S.PatientVideoArea>
          <S.PatientAvatar>👨‍💼</S.PatientAvatar>
          <S.PatientName>김민준 (45세)</S.PatientName>
          <S.StatusBadge>🟢 대화 준비 완료</S.StatusBadge>
        </S.PatientVideoArea>
        <S.InfoPanel>
          <S.InfoCard>
            <S.CardHeader>
              <span>📋</span>
              <span>환자 정보</span>
            </S.CardHeader>
            <S.InfoGrid>
              <p>👤 이름: 김민준 (45세 남성)</p>
            </S.InfoGrid>
          </S.InfoCard>
          <S.NotesCard>
            <S.CardHeader>
              <span>✍️</span>
              <span>메모장</span>
            </S.CardHeader>
            <S.NotesArea>
              • 환자와의 대화 내용을 실시간으로 기록합니다
              <br />
              • 주요 증상과 관찰 사항을 정리하세요
              <br />
              • 진단 과정과 감별진단을 작성하세요
              <br />
              <br />
              📝 메모 작성 영역:
              <br />
              _________________________________
              <br />
              _________________________________
              <br />
              _________________________________
              <br />
              _________________________________
            </S.NotesArea>
          </S.NotesCard>
        </S.InfoPanel>
      </S.PracticeArea>
    </S.Container>
  );
};

export default PracticeProgress;
