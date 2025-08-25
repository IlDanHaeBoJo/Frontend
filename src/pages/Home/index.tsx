import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../store/UserContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Main>
        <Title>
          번거롭던 CPX 준비,
          <br />
          이제 AI와 함께 하세요
        </Title>
        <Description>
          MediCPX는 AI와 함께하는 CPX 실습 플랫폼입니다.
          <br />
          언제 어디서든 실제와 같은 CPX 실습을 경험하고, AI의 객관적인 피드백을
          통해 실력을 향상시키세요.
        </Description>
        <Features>
          <Feature>
            <FeatureTitle>AI 환자 시뮬레이션</FeatureTitle>
            <FeatureDescription>
              다양한 시나리오의 AI 환자를 통해 실제와 같은 CPX 실습을 경험할 수
              있습니다.
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureTitle>피드백</FeatureTitle>
            <FeatureDescription>
              실습 중 AI가 실시간으로 피드백을 제공하여, 부족한 부분을 바로잡을
              수 있습니다.
            </FeatureDescription>
          </Feature>
          <Feature>
            <FeatureTitle>체계적인 평가</FeatureTitle>
            <FeatureDescription>
              실습이 끝나면 AI가 체계적으로 평가하여, 자신의 실력을 객관적으로
              파악할 수 있습니다.
            </FeatureDescription>
          </Feature>
        </Features>
        {!isAuthenticated && (
          <LoginButton onClick={handleLoginClick}>로그인 하러 가기</LoginButton>
        )}
      </Main>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fcfcff;
`;

const LoginButton = styled.button`
  margin-top: 50px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  background-color: #3366cc;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 700;
  color: #1a1a33;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666666;
  margin-bottom: 40px;
`;

const Features = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
`;

const Feature = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e5edff;
  border-radius: 12px;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a33;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #666666;
`;
