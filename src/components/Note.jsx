import React from "react";
import Close from "@material-ui/icons/Close";
const Note = props => {
  return (
    <div
      style={
        props.importance === "important"
          ? { background: "red", padding: 10, margin: 5 }
          : props.importance === "medium"
          ? { background: "yellow", padding: 10, margin: 5 }
          : { background: "green", padding: 10, margin: 5 }
      }
    >
      {props.content}
      <Close
        style={{ marginLeft: 10, marginBottom: "-6px", cursor: "pointer" }}
        onClick={() => props.onPressDelete(props.timeOfCreation, props.note)}
      />
    </div>
  );
};

export default Note;
