type Student = { name: string; grades: number[] };
type StudentWithAvg = { name: string; grades: number[]; avgGrade: number };

function sortStudents(...students: Student[]): StudentWithAvg[] {
  return students
    .map(s => {
      const avg = s.grades && s.grades.length > 0 ? s.grades.reduce((a, b) => a + b, 0) / s.grades.length : 0;
      return { ...s, avgGrade: +avg.toFixed(2) };
    })
    .sort((a, b) => b.avgGrade - a.avgGrade || a.name.localeCompare(b.name));
}

console.log(
  sortStudents(
    { name: "Peter", grades: [5, 6, 6, 6, 5.60] },
    { name: "Steve", grades: [5, 4, 4.50, 5, 5.30] },
    { name: "Maria", grades: [6, 6, 5, 6] },
    { name: "Clara", grades: [6, 6, 6, 5] }
  )
);