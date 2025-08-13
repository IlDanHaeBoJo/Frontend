import React, { useState } from "react";
import * as S from "./style";
import { requestPasswordReset, verifyPasswordResetCode } from "../../apis/user";

interface Props {
  onClose: () => void;
}

const ResetPasswordModal: React.FC<Props> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = async () => {
    try {
      await requestPasswordReset({ username, email });
      setIsCodeSent(true);
      alert("인증 코드가 전송되었습니다.");
    } catch (error) {
      alert("사용자 정보가 일치하지 않습니다.");
    }
  };

  const handleResetPassword = async () => {
    try {
      await verifyPasswordResetCode({ email, code });
      alert("인증에 성공했습니다. 메일을 확인해주세요.");
      onClose();
    } catch (error) {
      alert("인증 코드가 일치하지 않습니다.");
    }
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <S.Title>비밀번호 찾기</S.Title>
        <S.Input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          disabled={isCodeSent}
        />
        <S.Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          disabled={isCodeSent}
        />
        <S.LoginButton onClick={handleSendCode} disabled={isCodeSent}>
          본인 확인 코드 전송
        </S.LoginButton>
        {isCodeSent && (
          <>
            <br />
            <br />
            <S.Input
              type="text"
              placeholder="본인 확인 코드"
              value={code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCode(e.target.value)
              }
            />
            <S.LoginButton onClick={handleResetPassword}>
              비밀번호 재설정
            </S.LoginButton>
          </>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ResetPasswordModal;
