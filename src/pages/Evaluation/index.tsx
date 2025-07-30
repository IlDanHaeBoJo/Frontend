import React from "react";
import * as S from "./style";

const Evaluation = () => {
  const students = [
    {
      id: 1,
      name: "이영훈",
      studentId: "2024001234",
      practiceCount: 5,
      averageScore: "F",
      lastPracticeDate: "2024.01.15",
    },
    {
      id: 2,
      name: "김민준",
      studentId: "2024001235",
      practiceCount: 8,
      averageScore: "B+",
      lastPracticeDate: "2024.01.14",
    },
    {
      id: 3,
      name: "박서아",
      studentId: "2024001236",
      practiceCount: 3,
      averageScore: "A",
      lastPracticeDate: "2024.01.13",
    },
    {
      id: 4,
      name: "최지우",
      studentId: "2024001237",
      practiceCount: 10,
      averageScore: "A+",
      lastPracticeDate: "2024.01.16",
    },
  ];

  return (
    <S.Container>
      <S.Title>👨‍🏫 학생 테스트 평가 관리</S.Title>
      <S.StudentGrid>
        {students.map((student) => (
          <S.StudentCard key={student.id}>
            <S.StudentName>{student.name}</S.StudentName>
            <S.StudentId>학번: {student.studentId}</S.StudentId>
            <S.Stats>
              <S.Stat>
                <S.StatValue>{student.practiceCount}</S.StatValue>
                <S.StatLabel>실습 횟수</S.StatLabel>
              </S.Stat>
              <S.Stat>
                <S.StatValue>{student.averageScore}</S.StatValue>
                <S.StatLabel>평균 점수</S.StatLabel>
              </S.Stat>
            </S.Stats>
            <S.LastPractice>
              최근 실습: {student.lastPracticeDate}
            </S.LastPractice>
            <S.EvalButton>📝 평가하기</S.EvalButton>
          </S.StudentCard>
        ))}
      </S.StudentGrid>
    </S.Container>
  );
};

export default Evaluation;
