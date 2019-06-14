import React from "react";
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
  return (
    <div className={styles.container}>
      <img src={img} className={styles.avatar} alt="avatar" />
      <h1 className={styles.name}>{`${firstName} ${lastName}`}</h1>
      <div className={styles.content}>
        <div>Email: {email}</div>
        <div>Company: {company}</div>
        <div>Skill: {skill}</div>
        <div>Average: {averageGrade}%</div>
      </div>
      <button className={styles.expandBtn}>Btn</button>
    </div>
  );
};

export default UserDataCard;
