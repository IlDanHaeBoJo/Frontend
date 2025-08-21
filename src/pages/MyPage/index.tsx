import React, { useState, useEffect } from "react";
import * as S from "./style";
import { useUser } from "../../store/UserContext";
import { changePassword } from "../../apis/user";
import { getMyCpxResults, getAdminCpxResults } from "../../apis/cpx";
import { CpxResult, ResultDetail } from "../../types/result";

interface PracticeStats {
  totalPractices: number;
  completedEvaluations: number;
  completedFeedbacks: number;
  recentPracticeDate: string | null;
}

const MyPage = () => {
  const { user } = useUser();
  const [stats, setStats] = useState<PracticeStats>({
    totalPractices: 0,
    completedEvaluations: 0,
    completedFeedbacks: 0,
    recentPracticeDate: null,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        let results: (CpxResult | ResultDetail)[];
        if (user.role === "admin") {
          results = await getAdminCpxResults();
        } else {
          results = await getMyCpxResults();
        }

        const totalPractices = results.length;
        const completedEvaluations = results.filter(
          (r) => r.evaluation_status === "평가 완료"
        ).length;
        const completedFeedbacks = results.filter(
          (r) => r.evaluation_status === "피드백 완료"
        ).length;
        const recentPracticeDate =
          results.length > 0
            ? new Date(results[0].practice_date).toLocaleDateString()
            : null;

        setStats({
          totalPractices,
          completedEvaluations: completedEvaluations + completedFeedbacks,
          completedFeedbacks,
          recentPracticeDate,
        });
      } catch (error) {
        console.error("Failed to fetch practice stats:", error);
      }
    };

    fetchStats();
  }, [user]);

  useEffect(() => {
    if (newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("비밀번호가 일치합니다.");
      }
    } else {
      setPasswordError("");
    }
  }, [newPassword, confirmPassword]);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  if (!user) {
    return (
      <S.Container>
        <p>사용자 정보를 불러오는 중입니다...</p>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ProfileSection>
        <S.ProfileImage>{user.role === "admin" ? "👨‍🏫" : "👤"}</S.ProfileImage>
        <div>
          <S.UserName>{user.name}</S.UserName>
          <S.UserEmail>{user.email}</S.UserEmail>
        </div>
      </S.ProfileSection>
      <S.InfoSection>
        <S.InfoCard>
          <S.CardTitle>기본 정보</S.CardTitle>
          <S.InfoItem>
            <S.InfoLabel>이름</S.InfoLabel>
            <S.InfoValue>{user.name}</S.InfoValue>
          </S.InfoItem>
          {user.role === "student" && (
            <>
              <S.InfoItem>
                <S.InfoLabel>학번</S.InfoLabel>
                <S.InfoValue>{user.student_id || "N/A"}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>전공</S.InfoLabel>
                <S.InfoValue>{user.major || "N/A"}</S.InfoValue>
              </S.InfoItem>
            </>
          )}
          {user.role === "admin" && (
            <S.InfoItem>
              <S.InfoLabel>권한</S.InfoLabel>
              <S.InfoValue>관리자</S.InfoValue>
            </S.InfoItem>
          )}
          <S.InfoItem>
            <S.InfoLabel>이메일</S.InfoLabel>
            <S.InfoValue>{user.email}</S.InfoValue>
          </S.InfoItem>
        </S.InfoCard>
        <S.InfoCard>
          <S.CardTitle>실습 통계</S.CardTitle>
          <S.InfoItem>
            <S.InfoLabel>총 실습 횟수</S.InfoLabel>
            <S.InfoValue>{stats.totalPractices}회</S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>평가 완료</S.InfoLabel>
            <S.InfoValue>{stats.completedEvaluations}회</S.InfoValue>
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoLabel>피드백 완료</S.InfoLabel>
            <S.InfoValue>{stats.completedFeedbacks}회</S.InfoValue>
          </S.InfoItem>
          {user.role === "student" && (
            <S.InfoItem>
              <S.InfoLabel>최근 실습일</S.InfoLabel>
              <S.InfoValue>{stats.recentPracticeDate || "N/A"}</S.InfoValue>
            </S.InfoItem>
          )}
        </S.InfoCard>
        <S.InfoCard>
          <S.CardTitle>비밀번호 변경</S.CardTitle>
          <S.InputLabel>현재 비밀번호</S.InputLabel>
          <S.Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <S.InputLabel>새 비밀번호</S.InputLabel>
          <S.Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <S.InputLabel>비밀번호 확인</S.InputLabel>
          <S.Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordError && (
            <S.PasswordMatchMessage isMatch={newPassword === confirmPassword}>
              {passwordError}
            </S.PasswordMatchMessage>
          )}
          <S.Button onClick={handlePasswordChange}>변경사항 저장</S.Button>
        </S.InfoCard>
      </S.InfoSection>
    </S.Container>
  );
};

export default MyPage;
