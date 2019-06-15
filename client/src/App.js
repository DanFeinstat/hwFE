import React, { useState, useEffect } from "react";
import StudentDataCard from "./components/studentDataCard/StudentDataCard";
import ContentFilter from "./components/contentFilter/ContentFilter";
import styles from "./App.module.css";
//Chose to use modular css to make the css more obviously tied to the relevant components

function App() {
  //We're using state in this app instead of redux or useReducer+useContext
  //This is because state management is simple in this app
  //and we have a relatively flat component structure
  const [studentData, setStudentData] = useState([]);
  const [filterContent, setFilterContent] = useState([]);
  const [nameFilter, setNameFilter] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);
  // we use nameFilter and tagFilter as references so that
  //both filters can be active simultaneously.
  //If we were to scale this with many more filter options
  //I would consider finding a different solution or
  //building out a library for it.

  const addTag = (str, index) => {
    const tagForStudentData = [...studentData];
    tagForStudentData[index].tags.push(str);
    setStudentData(tagForStudentData);
  };

  // filter functions for sorting content
  const nameFilterFunction = str => {
    let newNameFilter = [];
    studentData.map(student => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      if (fullName.includes(str)) {
        newNameFilter.push(student);
      }
    });
    let contentFilter = [];
    tagFilter.map(student => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      if (fullName.includes(str)) {
        contentFilter.push(student);
      }
    });
    setFilterContent(contentFilter);
    setNameFilter(newNameFilter);
  };

  const tagFilterFunction = str => {
    if (str) {
      let newTagFilter = [];
      let newContentFilter = [];
      studentData.map(student => {
        let tagged = false;
        student.tags.map(tag => {
          if (tag.includes(str)) {
            tagged = true;
          }
        });
        if (tagged) {
          newTagFilter.push(student);
        }
      });
      filterContent.map(student => {
        let tagged = false;
        student.tags.map(tag => {
          if (tag.includes(str)) {
            tagged = true;
          }
        });
        if (tagged) {
          newContentFilter.push(student);
        }
      });
      setFilterContent(newContentFilter);
      setTagFilter(newTagFilter);
    } else {
      setFilterContent(nameFilter);
      setTagFilter(studentData);
    }
  };

  //api call
  async function fetchUrl(url) {
    const response = await fetch(url);
    const json = await response.json();
    let newStudentData = [];
    json.students.map(student => {
      let addTags = student;
      addTags.tags = [];
      newStudentData.push(addTags);
    });
    setStudentData(newStudentData);
    setFilterContent(newStudentData);
    setNameFilter(newStudentData);
    setTagFilter(newStudentData);
  }

  useEffect(() => {
    fetchUrl(`https://www.hatchways.io/api/assessment/students`);
  }, []);
  return (
    <div className={styles.App}>
      <div className={styles.contentContainer}>
        <ContentFilter filterFunction={nameFilterFunction} type={`name`} />
        <ContentFilter filterFunction={tagFilterFunction} type={`tag`} />
        {filterContent.map((student, index) => {
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
              key={index.toString()}
              index={index}
              img={student.pic}
              firstName={student.firstName}
              lastName={student.lastName}
              email={student.email}
              company={student.company}
              skill={student.skill}
              grades={student.grades}
              averageGrade={averageGrade}
              tags={student.tags}
              addTag={addTag}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
