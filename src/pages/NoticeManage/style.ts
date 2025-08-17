import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  gap: 40px;
  max-width: fit-content;
  min-height: calc(100vh - 170px);
  margin: 0 auto;
  padding: 40px;
  background-color: ${colors.whiteBlue};
`;

export const FormSection = styled.div`
  width: 650px;
  min-width: 520px;
  background-color: ${colors.white};
  border: 1px solid ${colors.cloudBlue2};
  border-radius: 16px;
  padding: 30px;
`;

export const FormTitle = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: ${colors.indigoGray4};
  margin-bottom: 30px;
`;

export const InputGroup = styled.div`
  margin-bottom: 25px;
`;

export const Label = styled.label`
  display: block;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: ${colors.indigoGray3};
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: ${colors.whiteBlue};
  border: 1px solid ${colors.cloudBlue3};
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  box-sizing: border-box;
`;

export const Select = styled.select`
  width: 180px;
  height: 50px;
  padding: 0 15px;
  background-color: ${colors.whiteBlue};
  border: 1px solid ${colors.cloudBlue3};
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 250px;
  padding: 15px;
  background-color: ${colors.whiteBlue};
  border: 1px solid ${colors.cloudBlue3};
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  resize: vertical;
  box-sizing: border-box;
`;

export const FileInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: ${colors.whiteBlue};
  border: 1px solid ${colors.cloudBlue3};
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: ${colors.indigoGray1};
  box-sizing: border-box;
`;

export const FileButton = styled.button`
  background-color: ${colors.cloudBlue3};
  color: ${colors.gray600};
  border: none;
  border-radius: 6px;
  padding: 8px 15px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2952a3;
  }
`;

export const FileList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f8f9ff;
  border: 1px solid #e5edff;
  border-radius: 6px;
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FileName = styled.span`
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

export const FileSize = styled.span`
  font-size: 12px;
  color: #666;
`;

export const RemoveFileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  border-radius: 4px;
  color: #e53333;

  &:hover {
    background-color: #ffe6e6;
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;

export const DraftButton = styled.button`
  width: 130px;
  height: 50px;
  background-color: ${colors.gray100};
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #666680;
  cursor: pointer;
`;

export const PublishButton = styled.button`
  width: 130px;
  height: 50px;
  background-color: ${colors.blue};
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${colors.white};
  cursor: pointer;
`;

export const CancelButton = styled.button`
  width: 130px;
  height: 50px;
  background-color: ${colors.gray100};
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #666680;
  cursor: pointer;
`;

export const ListSection = styled.div`
  width: 640px;
  background-color: ${colors.white};
  border: 1px solid ${colors.cloudBlue2};
  border-radius: 16px;
  padding: 30px;
  height: calc(100vh - 220px);
  overflow-y: auto;
`;

export const ListTitle = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: ${colors.indigoGray4};
  margin-bottom: 30px;
`;

export const NoticeCard = styled.div`
  background-color: ${colors.whiteBlue};
  border: 1px solid ${colors.cloudBlue2};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const NoticeTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 17px;
  color: ${colors.indigoGray4};
  margin: 0 0 10px 0;
`;

export const ImportantBadge = styled.span`
  background-color: ${colors.red};
  color: ${colors.white};
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
`;

export const NoticeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  color: ${colors.indigoGray2};
  margin-bottom: 15px;
`;

export const StatusBadge = styled.span`
  background-color: ${colors.green};
  color: ${colors.white};
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const EditButton = styled.button`
  background-color: ${colors.blue};
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  cursor: pointer;
`;

export const ReadOnlyInput = styled(Input)`
  background-color: #f5f5f5;
  cursor: default;
`;

export const ReadOnlySelect = styled(Select)`
  background-color: #f5f5f5;
  cursor: default;
`;

export const ReadOnlyTextarea = styled(Textarea)`
  background-color: #f5f5f5;
  cursor: default;
  min-height: 200px;
`;

export const ProgressBarContainer = styled.div`
  margin-top: 4px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin-bottom: 2px;
`;

export const Progress = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: ${(props) =>
    props.progress === 100 ? colors.green : colors.blue};
  border-radius: 2px;
  transition: width 0.3s ease;
`;

export const ProgressStatus = styled.div<{ progress: number }>`
  font-size: 11px;
  color: ${(props) => (props.progress === 100 ? colors.green : colors.blue)};
  font-weight: bold;
`;

export const AttachmentListContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AttachmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f8f9ff;
  border: 1px solid #e5edff;
  border-radius: 6px;
`;

export const AttachmentName = styled.span`
  color: ${colors.blue};
`;

export const AttachmentSize = styled.span`
  color: ${colors.gray600};
  margin-left: 10px;
`;

export const AttachmentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AttachmentDate = styled.span`
  color: #888;
  font-size: 12px;
`;

export const DownloadButton = styled.button`
  background: ${colors.green};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
`;

export const DeleteAttachmentButton = styled.button`
  background: ${colors.red};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
`;

export const RefreshButton = styled.button`
  margin-left: 10px;
  padding: 4px 8px;
  background: ${colors.green};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
`;

export const AttachmentInfoBox = styled.div`
  padding-bottom: 4px;
  background-color: ${colors.whiteBlue};
  border-radius: 4px;
  font-size: 12px;
`;

export const AttachmentInfoText = styled.span`
  color: ${colors.gray600};
  font-weight: bold;
`;

export const AttachmentLink = styled.a`
  color: ${colors.blue};
  text-decoration: none;
  margin-left: 4px;
`;

export const NoAttachmentsBox = styled.div`
  margin-top: 8px;
  padding: 8px;
  background-color: #f9f9f9;
  border-radius: 4px;
  font-size: 12px;
  color: #999;
`;

export const DeleteButton = styled.button`
  background-color: ${colors.red};
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  cursor: pointer;
`;
