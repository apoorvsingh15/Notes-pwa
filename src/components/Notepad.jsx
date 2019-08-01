import React, { PureComponent } from "react";
import Note from "./Note";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import { green, yellow } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

import { withStyles } from "@material-ui/core/styles";

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
      notes: []
    };
  }

  handleChange = event => {
    const { value } = event.target;

    this.setState({ selectedValue: value });
  };

  handleKeyDown = event => {
    const {
      key,
      target: { value }
    } = event;

    const { selectedValue, notes, noteObject } = this.state;

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
            console.log(this.state.notes, "<-----");

            return localStorage.setItem(
              "note",
              JSON.stringify(this.state.notes)
            );
          })
      );
    }
  };
  render() {
    const { selectedValue, notes } = this.state;
    console.log(selectedValue, notes, "<====firstlog");

    return (
      <Container
        style={{
          background: "transparent"
        }}
        maxWidth="sm"
      >
        <Card>
          <h1 className="header">Elegant Notes</h1>
          <Paper>
            {" "}
            <Input
              placeholder="Place notes here"
              inputProps={{
                "aria-label": "description"
              }}
              onKeyDown={this.handleKeyDown}
            />
            <span>Important</span>
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
            <span>Not Important</span>
            <GreenRadio
              checked={selectedValue === "not-important"}
              onChange={this.handleChange}
              value="not-important"
              name="radio-button-demo"
              inputProps={{ "aria-label": "NOT-IMPORTANT" }}
            />
          </Paper>
          <Paper>
            {JSON.parse(localStorage.getItem("note")) &&
              JSON.parse(localStorage.getItem("note")).map(noteDescription => (
                <Note
                  key={noteDescription.timeOfCreation}
                  content={noteDescription.content}
                  importance={noteDescription.importance}
                />
              ))}
          </Paper>
        </Card>
      </Container>
    );
  }
}
