import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 1440px;
  //height: 1024px;
  background-color: #fcfcff;
`;

export const Container = styled.main`
  display: flex;
  gap: 40px;
  padding: 40px;
`;

export const NoticeDetails = styled.div`
  width: 750px;
  height: 100%;
  padding: 40px;
  background-color: #ffffff;
  border: 1px solid #e5edff;
  border-radius: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 10px;
`;

export const Date = styled.p`
  font-size: 16px;
  color: #808099;
  margin-bottom: 20px;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #d9d9d9;
  margin-bottom: 30px;
`;

export const Content = styled.p`
  font-size: 16px;
  color: #666680;
  line-height: 1.5;
`;

export const Attachments = styled.div`
  margin-top: 40px;
`;

export const AttachmentsTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 20px;
`;

export const AttachmentFile = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: #fafaff;
`;

export const FileIcon = styled.span`
  font-size: 20px;
`;

export const FileName = styled.a`
  font-size: 16px;
  color: #3366cc;
  text-decoration: none;
`;

export const NoticeList = styled.div`
  width: 490px;
  height: calc(100vh - 220px);
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e5edff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;

export const NoticeItem = styled.div<{ active?: boolean }>`
  padding: 20px;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? "#f8f8ff" : "#ffffff")};
  border: 1px solid #e5edff;
  cursor: pointer;
`;

export const NoticeItemTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  height: 17px;
  background-color: #e53333;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
`;

export const NoticeItemTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: #1a1a33;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NoticeItemDate = styled.div`
  font-size: 14px;
  color: #808099;
`;
