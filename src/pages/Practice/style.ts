import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 100px 50px;
  background-color: #ffffff;
`;

export const OptionBox = styled.div`
  width: 460px;
  height: 400px;
  padding: 20px;
  background-color: #f2f7ff;
  border: 1px solid #ccd9ff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Title = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #000000;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  color: #666666;
  margin-bottom: 30px;
`;

export const Dropdown = styled.div<{ isHidden?: boolean }>`
  width: 380px;
  height: 50px;
  padding: 0 20px;
  background-color: #ffffff;
  border: 1px solid #b3b3b3;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  box-sizing: border-box;
  cursor: pointer;
  visibility: ${({ isHidden }) => (isHidden ? "hidden" : "visible")};

  span {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    color: #808080;
  }
`;

export const StartButton = styled.button`
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
