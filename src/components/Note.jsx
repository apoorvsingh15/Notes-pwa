import React from "react";
import Close from "@material-ui/icons/Close";
import Grade from "@material-ui/icons/Grade";
const Note = props => {
  return (
    <div
      className="effect5"
      style={{
        padding: 10,
        margin: 15,
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
      }}
    >
      <Grade
        style={
          props.importance === "important"
            ? {
                marginRight: 10,
                marginBottom: "-6px",
                cursor: "pointer",
                color: "red"
              }
            : props.importance === "medium"
            ? {
                marginRight: 10,
                marginBottom: "-6px",
                cursor: "pointer",
                color: "yellow"
              }
            : {
                marginRight: 10,
                marginBottom: "-6px",
                cursor: "pointer",
                color: "green"
              }
        }
      />
      {props.content}
      <Close
        style={{ marginLeft: 10, marginBottom: "-6px", cursor: "pointer" }}
        onClick={() => props.onPressDelete(props.timeOfCreation, props.note)}
      />
    </div>
  );
};

export default Note;
