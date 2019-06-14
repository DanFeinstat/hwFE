import React, { useState, useEffect } from "react";
import StudentDataCard from "./components/studentDataCard/StudentDataCard";
import ContentFilter from "./components/contentFilter/ContentFilter";
import styles from "./App.module.css";

function App() {
  const [studentData, setStudentData] = useState([]);
  const [nameFilter, setNameFilter] = useState([]);
  const nameFilterFunction = str => {
    let newNameFilter = [];
    studentData.map(student => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      if (fullName.includes(str)) {
        newNameFilter.push(student);
      }
    });
    setNameFilter(newNameFilter);
  };
  async function fetchUrl(url) {
    const response = await fetch(url);
    const newStudentData = await response.json();

    setStudentData(newStudentData.students);
    setNameFilter(newStudentData.students);
  }
  useEffect(() => {
    fetchUrl(`https://www.hatchways.io/api/assessment/students`);
  }, []);
  return (
    <div className={styles.App}>
      <div className={styles.contentContainer}>
        <ContentFilter filterFunction={nameFilterFunction} type={`name`} />
        {nameFilter.map((student, index) => {
          function findAverage(array) {
            let sum = 0;
            for (let i = 0; i < array.length; i++) {
              sum += parseInt(array[i]);
            }
            let average = sum / array.length;
            return average;
          }
          const averageGrade = findAverage(student.grades);
          return (
            <StudentDataCard
              key={index}
              img={student.pic}
              firstName={student.firstName}
              lastName={student.lastName}
              email={student.email}
              company={student.company}
              skill={student.skill}
              grades={student.grades}
              averageGrade={averageGrade}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
