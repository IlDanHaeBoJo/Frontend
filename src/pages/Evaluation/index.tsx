import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { getStudents } from "../../apis/user";
import { getAdminCpxResults } from "../../apis/cpx";
import { User } from "../../types/user";
import { CpxResult } from "../../types/result";

const Evaluation = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [practiceCounts, setPracticeCounts] = useState<{
    [key: number]: number;
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, resultsData] = await Promise.all([
          getStudents(),
          getAdminCpxResults(),
        ]);

        setStudents(studentsData);

        const counts = resultsData.reduce(
          (acc: { [key: number]: number }, result: CpxResult) => {
            acc[result.student_id] = (acc[result.student_id] || 0) + 1;
            return acc;
          },
          {}
        );
        setPracticeCounts(counts);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <S.Container>
      <S.Title>👨‍🏫 학생 테스트 평가 관리</S.Title>
      <S.StudentGrid>
        {students.map((student) => (
          <S.StudentCard key={student.id}>
            <S.StudentName>{student.name}</S.StudentName>
            <S.StudentId>학번: {student.student_id || "N/A"}</S.StudentId>
            <S.Stats>
              <S.StatLabel>실습 횟수 :</S.StatLabel>
              <S.StatValue>{practiceCounts[student.id] || 0} 회</S.StatValue>
            </S.Stats>
            {/* <S.LastPractice>
              최근 실습:{" "}
              {new Date(student.last_practice_date).toLocaleDateString()}
            </S.LastPractice> */}
            <S.EvalButton onClick={() => navigate(`/result/${student.id}`)}>
              📝 평가하기
            </S.EvalButton>
          </S.StudentCard>
        ))}
      </S.StudentGrid>
    </S.Container>
  );
};

export default Evaluation;
