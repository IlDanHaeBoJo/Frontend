import React, { useState, useEffect } from "react";
import * as S from "./style";
import { getPrivacyPolicy } from "../../apis/privacy";
import { PrivacyPolicyResponse } from "../../types/privacy";

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState<PrivacyPolicyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const responseData: PrivacyPolicyResponse[] = await getPrivacyPolicy();
        console.log("API로부터 받은 데이터:", responseData);
        if (responseData && responseData.length > 0) {
          setPolicy(responseData[0]);
        } else {
          setError("개인정보 처리방침 데이터를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("Failed to fetch privacy policy:", err);
        setError("개인정보 처리방침을 불러오는 데 실패했습니다.");
      }
    };

    fetchPolicy();
  }, []);

  if (error) {
    return (
      <S.Container>
        <S.Content>{error}</S.Content>
      </S.Container>
    );
  }

  if (!policy) {
    return (
      <S.Container>
        <S.Content>로딩 중...</S.Content>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <h1>{policy.title}</h1>
      <S.Content>
        {policy.content.split("\n").map((line, index) => {
          if (line.trim().startsWith("□")) {
            return (
              <React.Fragment key={index}>
                <br />
                <strong>{line}</strong>
                <br />
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          );
        })}
      </S.Content>
    </S.Container>
  );
};

export default PrivacyPolicy;
