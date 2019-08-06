import React, { PureComponent } from "react";
import Note from "./Note";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import { green, yellow } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  root: {
    color: yellow[400],
    "&$checked": {
      color: yellow[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

export default class Notepad extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: "important",
      noteObject: {},
      notes: JSON.parse(localStorage.getItem("note")) || [],
      noteValue: ""
    };
  }

  handleChange = event => {
    const { value } = event.target;

    this.setState({ selectedValue: value });
  };

  handleChangeInput = event => {
    const { value } = event.target;

    this.setState({ noteValue: value });
  };

  handleKeyDown = event => {
    const {
      key,
      target: { value }
    } = event;

    const { selectedValue, notes } = this.state;

    if (key === "Enter") {
      this.setState(
        {
          noteObject: {
            content: value,
            timeOfCreation: Date.now(),
            importance: selectedValue
          }
        },
        () =>
          this.setState({ notes: [...notes, this.state.noteObject] }, () => {
            return localStorage.setItem(
              "note",
              JSON.stringify(this.state.notes),
              this.setState({ noteValue: "" })
            );
          })
      );
    }
  };

  onPressDelete = (id, note) => {
    const { notes } = this.state;

    this.setState(
      {
        notes: notes.filter(singleNote => singleNote.timeOfCreation !== id)
      },
      () => {
        return localStorage.setItem("note", JSON.stringify(this.state.notes));
      }
    );
  };
  render() {
    const { selectedValue, notes } = this.state;

    return (
      <Container
        style={{
          background: "transparent"
        }}
        maxWidth="sm"
      >
        <Card className="effect5">
          <h1 className="header">Elegant Notes</h1>
          <Paper>
            {" "}
            <Input
              placeholder="Place notes here"
              name="notesValue"
              value={this.state.noteValue}
              inputProps={{
                "aria-label": "notes"
              }}
              onChange={this.handleChangeInput}
              onKeyDown={this.handleKeyDown}
            />
            <span>High</span>
            <Radio
              checked={selectedValue === "important"}
              onChange={this.handleChange}
              value="important"
              name="radio-button-demo"
              inputProps={{ "aria-label": "IMPORTANT" }}
            />
            <span>Medium</span>
            <YellowRadio
              checked={selectedValue === "medium"}
              onChange={this.handleChange}
              value="medium"
              name="radio-button-demo"
              inputProps={{ "aria-label": "MEDIUM" }}
            />
            <span>Low</span>
            <GreenRadio
              checked={selectedValue === "not-important"}
              onChange={this.handleChange}
              value="not-important"
              name="radio-button-demo"
              inputProps={{ "aria-label": "NOT-IMPORTANT" }}
            />
          </Paper>
          <Paper style={{ maxHeight: "50vh", overflow: "scroll" }}>
            {notes && notes.length
              ? notes.map(noteDescription => (
                  <Note
                    onPressDelete={this.onPressDelete}
                    note={noteDescription}
                    key={noteDescription.timeOfCreation}
                    timeOfCreation={noteDescription.timeOfCreation}
                    content={noteDescription.content}
                    importance={noteDescription.importance}
                  />
                ))
              : null}
          </Paper>
          <Button
            style={{ padding: 20, width: "100%" }}
            onClick={() =>
              this.setState({ notes: [] }, () => localStorage.clear())
            }
          >
            Clear All
          </Button>
        </Card>
      </Container>
    );
  }
}
