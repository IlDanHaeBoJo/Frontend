import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
`;

export const RegistrationBox = styled.div`
  width: 500px;
  padding: 40px;
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

  &::placeholder {
    color: #808080;
  }
`;

export const RegistrationButton = styled.button`
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
  margin-top: 20px;

  &:hover {
    background-color: #254e99;
  }
`;
