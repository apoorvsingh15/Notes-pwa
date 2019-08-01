import React from "react";

const Note = props => {
  return (
    <div>
      {props.content}
      <span>{props.importance}</span>
    </div>
  );
};

export default Note;
