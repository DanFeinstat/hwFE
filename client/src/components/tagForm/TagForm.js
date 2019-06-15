import React, { useState } from "react";
import styles from "./TagForm.module.css";

const TagForm = ({ addTag, index }) => {
  const [newTag, setNewTag] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addTag(newTag, index);
        setNewTag("");
      }}
    >
      <input
        className={styles.input}
        placeholder="Add a tag"
        type="text"
        value={newTag}
        onChange={e => {
          setNewTag(e.target.value);
        }}
      />
      <input className={styles.tagSubmit} type="submit" />
    </form>
  );
};

export default TagForm;
