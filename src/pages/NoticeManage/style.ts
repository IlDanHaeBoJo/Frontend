import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 40px;
  background-color: #fcfcff;
`;

export const FormSection = styled.div`
  width: 650px;
  background-color: #ffffff;
  border: 1px solid #e5edff;
  border-radius: 16px;
  padding: 30px;
`;

export const FormTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #1a1a33;
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
  color: #33334d;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: #fcfcff;
  border: 1px solid #d9e5f2;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
`;

export const Select = styled.select`
  width: 180px;
  height: 50px;
  padding: 0 15px;
  background-color: #fcfcff;
  border: 1px solid #d9e5f2;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 250px;
  padding: 15px;
  background-color: #fcfcff;
  border: 1px solid #d9e5f2;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  resize: vertical;
`;

export const FileInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: #fcfcff;
  border: 1px solid #d9e5f2;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #9999b2;
`;

export const FileButton = styled.button`
  background-color: #3366cc;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 15px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
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
  background-color: #f2f2f2;
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
  background-color: #3366cc;
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
`;

export const ListSection = styled.div`
  width: 640px;
  background-color: #ffffff;
  border: 1px solid #e5edff;
  border-radius: 16px;
  padding: 30px;
`;

export const ListTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #1a1a33;
  margin-bottom: 30px;
`;

export const NoticeCard = styled.div`
  background-color: #fcfcff;
  border: 1px solid #e5edff;
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
  color: #1a1a33;
  margin: 0 0 10px 0;
`;

export const ImportantBadge = styled.span`
  background-color: #e53333;
  color: #ffffff;
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
  color: #808099;
  margin-bottom: 15px;
`;

export const StatusBadge = styled.span`
  background-color: #29a645;
  color: #ffffff;
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
  background-color: #3366cc;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  background-color: #e53333;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  cursor: pointer;
`;
