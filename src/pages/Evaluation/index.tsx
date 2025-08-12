import React, { useState, useEffect } from "react";
import * as S from "./style";
import { getStudents } from "../../apis/user";
import { User } from "../../types/user";

const Evaluation = () => {
  const [students, setStudents] = useState<User[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
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
              <S.Stat>
                <S.StatValue>null</S.StatValue>
                <S.StatLabel>실습 횟수</S.StatLabel>
              </S.Stat>
              <S.Stat>
                <S.StatValue>null</S.StatValue>
                <S.StatLabel>피드백</S.StatLabel>
              </S.Stat>
            </S.Stats>
            {/* <S.LastPractice>
              최근 실습:{" "}
              {new Date(student.last_practice_date).toLocaleDateString()}
            </S.LastPractice> */}
            <S.EvalButton>📝 평가하기</S.EvalButton>
          </S.StudentCard>
        ))}
      </S.StudentGrid>
    </S.Container>
  );
};

export default Evaluation;
