import React, { useState } from "react";
import TagForm from "../tagForm/TagForm";
import Tag from "../tag/Tag";
import OpenIcon from "../icons/OpenIcon";
import CloseIcon from "../icons/CloseIcon";
import styles from "./StudentDataCard.module.css";

const UserDataCard = ({
  index,
  img,
  firstName,
  lastName,
  email,
  company,
  skill,
  averageGrade,
  grades,
  tags,
  addTag,
}) => {
  const [showGrades, setShowGrades] = useState(false);
  return (
    <div className={styles.container}>
      <img src={img} className={styles.avatar} alt="avatar" />
      <h1
        className={styles.name}
      >{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</h1>
      <div className={styles.content}>
        <div>Email: {email}</div>
        <div>Company: {company}</div>
        <div>Skill: {skill}</div>
        <div>Average: {averageGrade}%</div>
        {showGrades && (
          <div className={styles.extendedContent}>
            {grades.map((grade, index) => {
              return (
                <div key={index.toString()}>
                  {`test${index}:\xa0\xa0\xa0\xa0\xa0\xa0${grade}%`}
                </div>
              );
            })}
            {tags.length > 0
              ? tags.map((tag, index) => {
                  return <Tag key={index.toString()} tag={tag} />;
                })
              : null}
            <TagForm index={index} addTag={addTag} />
          </div>
        )}
      </div>
      {showGrades ? (
        <CloseIcon
          className={styles.expandBtn}
          setShowGrades={setShowGrades}
          showGrades={showGrades}
        />
      ) : (
        <OpenIcon
          className={styles.expandBtn}
          setShowGrades={setShowGrades}
          showGrades={showGrades}
        />
      )}
    </div>
  );
};

export default UserDataCard;
