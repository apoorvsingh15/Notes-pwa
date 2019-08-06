import React from "react";
import Close from "@material-ui/icons/Close";
const Note = props => {
  return (
    <div
      className="effect5"
      style={
        props.importance === "important"
          ? {
              padding: 10,
              margin: 15,
              boxShadow:
                "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
            }
          : props.importance === "medium"
          ? {
              padding: 10,
              margin: 15,
              boxShadow:
                "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
            }
          : {
              padding: 10,
              margin: 15,
              boxShadow:
                "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
            }
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
