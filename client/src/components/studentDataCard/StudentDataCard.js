import React, { useState } from "react";
import TagForm from "../tagForm/TagForm";
import Tag from "../tag/Tag";
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
                <div key={index.toString()}>
                  test{index}: {grade}%
                </div>
              );
            })}
            {tags.length > 0
              ? tags.map((tag, index) => {
                  return (
                    <Tag key={index.toString()} tag={tag} />
                    // <div className={styles.tag} key={index.toString()}>
                    //   {tag}
                    // </div>
                  );
                })
              : null}
            <TagForm index={index} addTag={addTag} />
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
