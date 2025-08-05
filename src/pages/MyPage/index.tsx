import React from "react";
import * as S from "./style";
import { useUser } from "../../store/UserContext";

const MyPage = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <S.Container>
        <p>사용자 정보를 불러오는 중입니다...</p>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ProfileSection>
        <S.ProfileImage />
        <div>
          <S.UserName>{user.name}</S.UserName>
          <S.UserEmail>{user.email}</S.UserEmail>
        </div>
      </S.ProfileSection>
      <S.InfoSection>
        <S.InfoCard>
          <S.CardTitle>기본 정보</S.CardTitle>
          <S.InfoItem>
            <S.InfoLabel>이름</S.InfoLabel>
            <S.InfoValue>{user.name}</S.InfoValue>
          </S.InfoItem>
          {user.role === "student" && (
            <>
              <S.InfoItem>
                <S.InfoLabel>학번</S.InfoLabel>
                <S.InfoValue>{user.student_id || "N/A"}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>전공</S.InfoLabel>
                <S.InfoValue>{user.major || "N/A"}</S.InfoValue>
              </S.InfoItem>
            </>
          )}
          <S.InfoItem>
            <S.InfoLabel>이메일</S.InfoLabel>
            <S.InfoValue>{user.email}</S.InfoValue>
          </S.InfoItem>
        </S.InfoCard>
        <S.InfoCard>
          <S.CardTitle>실습 통계</S.CardTitle>
          <S.InfoItem>
            <S.InfoLabel>총 실습 횟수</S.InfoLabel>
            <S.InfoValue>5회</S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>평균 점수</S.InfoLabel>
            <S.InfoValue>A- (87점)</S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>최고 점수</S.InfoLabel>
            <S.InfoValue>A (94점)</S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>최근 실습일</S.InfoLabel>
            <S.InfoValue>2024.01.15</S.InfoValue>
          </S.InfoItem>
        </S.InfoCard>
        <S.InfoCard>
          <S.CardTitle>비밀번호 변경</S.CardTitle>
          <S.InputLabel>현재 비밀번호</S.InputLabel>
          <S.Input type="password" />
          <S.InputLabel>새 비밀번호</S.InputLabel>
          <S.Input type="password" />
          <S.InputLabel>비밀번호 확인</S.InputLabel>
          <S.Input type="password" />
          <S.Button>변경사항 저장</S.Button>
        </S.InfoCard>
      </S.InfoSection>
    </S.Container>
  );
};

export default MyPage;
