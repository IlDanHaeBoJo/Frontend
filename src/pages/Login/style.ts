import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 90px);
  background-color: #f0f2f5;
`;

export const LoginBox = styled.div`
  width: 500px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #000000;
  margin-bottom: 40px;
`;

export const Input = styled.input`
  width: 380px;
  height: 50px;
  padding: 0 20px;
  background-color: #ffffff;
  border: 1px solid #b2b2b2;
  border-radius: 4px;
  margin-bottom: 20px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  box-sizing: border-box;

  &::placeholder {
    color: #808080;
  }
`;

export const LoginButton = styled.button`
  width: 380px;
  height: 60px;
  background-color: #3366cc;
  border: none;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #254e99;
  }
`;

export const RegisterText = styled.p`
  margin-top: 20px;
  color: #666666;
  cursor: pointer;
  text-decoration: underline;
`;
