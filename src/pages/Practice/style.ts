import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 100px 50px;
  background-color: ${colors.white};
`;

export const OptionBox = styled.div`
  width: 460px;
  height: 400px;
  padding: 20px;
  background-color: ${colors.cloudBlue1};
  border: 1px solid ${colors.lavenderBlue3};
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
  color: ${colors.black};
  margin-bottom: 20px;
`;

export const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  color: ${colors.gray600};
  margin-bottom: 30px;
`;

export const Dropdown = styled.div<{ isHidden?: boolean }>`
  width: 380px;
  height: 50px;
  padding: 0 20px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray400};
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
    color: ${colors.gray500};
  }
`;

export const StartButton = styled.button`
  width: 380px;
  height: 60px;
  background-color: ${colors.blue};
  border: none;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: ${colors.white};
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkBlue};
  }
`;
