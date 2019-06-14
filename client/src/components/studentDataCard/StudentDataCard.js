import React, { useState } from "react";
import styles from "./StudentDataCard.module.css";

const UserDataCard = ({
  img,
  firstName,
  lastName,
  email,
  company,
  skill,
  averageGrade,
  grades,
}) => {
  const [showGrades, setShowGrades] = useState(false);
  return (
    <div className={styles.container}>
      <img src={img} className={styles.avatar} alt="avatar" />
      <h1 className={styles.name}>{`${firstName} ${lastName}`}</h1>
      <div className={styles.content}>
        <div>Email: {email}</div>
        <div>Company: {company}</div>
        <div>Skill: {skill}</div>
        <div>Average: {averageGrade}%</div>
        {showGrades && (
          <div>
            {grades.map((grade, index) => {
              return (
                <div>
                  test{index}: {grade}%
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button
        className={styles.expandBtn}
        onClick={() => {
          setShowGrades(!showGrades);
        }}
      >
        {showGrades ? `-` : `+`}
      </button>
    </div>
  );
};

export default UserDataCard;
