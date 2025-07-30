import styled from "styled-components";

export const Container = styled.div`
  padding: 50px;
  background-color: #ffffff;
`;

export const Board = styled.div`
  width: 1100px;
  height: 660px;
  margin: 0 auto;
  border: 1px solid #e6e6e6;
`;

export const BoardHeader = styled.div`
  display: flex;
  background-color: #f2f7ff;
  height: 50px;
  align-items: center;
  padding: 0 20px;
`;

export const HeaderItem = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  text-align: center;
  flex: 1;
`;

export const BoardRow = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f2f7ff;
  }
`;

export const RowItem = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #000000;
  text-align: center;
  flex: 1;
`;

export const StatusTag = styled.div<{ status: string }>`
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  display: inline-block;

  ${({ status }) => {
    switch (status) {
      case "진행중":
        return `
          background-color: #e5f2ff;
          color: #3366cc;
        `;
      case "완료":
        return `
          background-color: #d9ffe5;
          color: #1a8033;
        `;
      case "이의신청":
        return `
          background-color: #ffe5cc;
          color: #cc6600;
        `;
      case "교수님 확인":
        return `
          background-color: #f2e5ff;
          color: #6633cc;
        `;
      default:
        return "";
    }
  }}
`;

// Modal Styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalWrapper = styled.div`
  width: 1200px;
  height: 90vh;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ModalContent = styled.div`
  padding: 40px;
  overflow-y: auto;
  position: relative;
  flex-grow: 1;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

export const ConversationSectionContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
`;

export const Section = styled.div<{ flex?: number }>`
  margin-bottom: 30px;
  ${({ flex }) => flex && `flex: ${flex};`}
`;

export const SectionTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin: 5px 0 20px;
  color: #000000;
  margin-bottom: 20px;
`;

export const ConversationBox = styled.div`
  background-color: #fafafa;
  padding: 20px;
  border-radius: 8px;
  min-height: 250px;
  p {
    margin: 0 0 10px 0;
    font-size: 16px;
  }
`;

export const FeedbackSection = styled(Section)`
  border: 1px solid #e6e6e6;
  padding: 30px;
  border-radius: 8px;
`;

export const ProfessorFeedbackSection = styled(FeedbackSection)`
  background-color: #f2fff2;
  border-color: #cce5cc;
`;

export const FeedbackContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  strong {
    font-size: 20px;
    display: block;
    margin-bottom: 10px;
  }
  p {
    margin: 0 0 20px 0;
  }
`;

export const PdfButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: #4d4d4d;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  display: block;
  margin: 40px auto 0;
`;

export const LoadingSpinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
  margin: auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Pagination Styles
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const PageButton = styled.button<{ isActive: boolean }>`
  padding: 8px 12px;
  margin: 0 5px;
  background-color: ${({ isActive }) => (isActive ? "#3366cc" : "#ffffff")};
  color: ${({ isActive }) => (isActive ? "#ffffff" : "#333333")};
  border: 1px solid #cccccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f2f2f2;
  }
`;
