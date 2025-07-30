import React from "react";
import * as S from "./style";

const MyPage = () => {
  return (
    <S.Container>
      <S.ProfileSection>
        <S.ProfileImage />
        <div>
          <S.UserName>홍길동</S.UserName>
          <S.UserEmail>hong@university.ac.kr</S.UserEmail>
        </div>
      </S.ProfileSection>
      <S.InfoSection>
        <S.InfoCard>
          <S.CardTitle>기본 정보</S.CardTitle>
          <S.InfoItem>
            <S.InfoLabel>이름</S.InfoLabel>
            <S.InfoValue>홍길동</S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>학번</S.InfoLabel>
            <S.InfoValue>2024001234</S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>이메일</S.InfoLabel>
            <S.InfoValue>hong@university.ac.kr</S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>전공</S.InfoLabel>
            <S.InfoValue>의학과</S.InfoValue>
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
