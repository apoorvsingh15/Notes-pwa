import React from "react";
import { Button } from "@material-ui/core";

const Note = props => {
  return (
    <div
      style={
        props.importance === "important"
          ? { background: "red" }
          : props.importance === "medium"
          ? { background: "yellow" }
          : { background: "green" }
      }
    >
      {props.content}
      <span
        onClick={() => props.onPressDelete(props.timeOfCreation, props.note)}
      >
        X
      </span>
    </div>
  );
};

export default Note;
