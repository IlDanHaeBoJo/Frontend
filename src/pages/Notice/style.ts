import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Wrapper = styled.div`
  background-color: ${colors.whiteBlue};
  height: calc(100vh - 90px);
`;

export const Container = styled.main`
  display: flex;
  gap: 40px;
  margin: 0 auto;
  width: 1440px;
  padding: 40px;
`;

export const NoticeDetails = styled.div`
  width: 750px;
  height: 100%;
  min-height: 300px;
  padding: 40px;
  background-color: ${colors.white};
  border: 1px solid ${colors.cloudBlue2};
  border-radius: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.black};
  margin-bottom: 10px;
`;

export const Date = styled.p`
  font-size: 16px;
  color: ${colors.indigoGray2};
  margin-bottom: 20px;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.gray300};
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
  color: ${colors.black};
  margin-bottom: 20px;
`;

export const AttachmentFile = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: ${colors.whiteBlue};
`;

export const FileIcon = styled.span`
  font-size: 20px;
`;

export const FileName = styled.a`
  font-size: 16px;
  color: ${colors.blue};
  text-decoration: none;
`;

export const NoticeList = styled.div`
  width: 490px;
  height: calc(100vh - 220px);
  padding: 20px;
  background-color: ${colors.white};
  border: 1px solid ${colors.cloudBlue2};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;

export const NoticeItem = styled.div<{ active?: boolean }>`
  padding: 20px;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? "#f8f8ff" : colors.white)};
  border: 1px solid ${colors.cloudBlue2};
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
  background-color: ${colors.red};
  color: ${colors.white};
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
`;

export const NoticeItemTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: ${colors.indigoGray4};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NoticeItemDate = styled.div`
  font-size: 14px;
  color: ${colors.indigoGray2};
`;
