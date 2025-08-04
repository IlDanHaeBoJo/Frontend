import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

export const RegistrationBox = styled.div`
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
  margin: 20px 0;

  &:hover {
    background-color: #254e99;
  }
`;

export const ToggleButtonContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  width: 190px;
  height: 50px;
  background-color: ${(props) => (props.active ? "#3366cc" : "#f0f2f5")};
  color: ${(props) => (props.active ? "#ffffff" : "#333333")};
  border: 1px solid ${(props) => (props.active ? "#3366cc" : "#dcdcdc")};
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-right: none;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:hover {
    background-color: ${(props) => (props.active ? "#254e99" : "#e9ecef")};
  }
`;
