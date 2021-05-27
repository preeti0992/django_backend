import React, { Component } from "react";
import InputModal from "./components/InputModal";
import axios from "axios";
import styled from "styled-components";
import {
  PBLUE,
  SBLUE,
  WHITE,
  BLACK,
  PLIGHTBLUE,
  PDARKBLUE,
  REDDANGER,
} from "./colorConstants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
      todoList: [],
    };
    // this.url = "http://localhost:8000/api/todos/"
    this.url = "http://127.0.0.1:8000/api/todos/";
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(this.url)
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ inputModal: !this.state.inputModal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`${this.url + item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios.post(this.url, item).then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios.delete(`${this.url + item.id}`).then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, inputModal: !this.state.inputModal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, inputModal: !this.state.inputModal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    const TabDiv = styled.div`
      margin: 1em 0em 0.2em 0em;
    `;

    const TabSpan = styled.span`
      padding: 0.25em 1em;
      margin-right: 0.1em;
      align-self: center;
      flex: 2;
      font-size: 1.2em;
      color: ${WHITE};
      background-color: ${(props) => (props.active ? PLIGHTBLUE : PDARKBLUE)};
      border: 2px solid ${(props) => (props.active ? PLIGHTBLUE : PDARKBLUE)};
      border-radius: 5px 5px 0px 0px;
    `;

    return (
      <TabDiv>
        <TabSpan
          onClick={() => this.displayCompleted(false)}
          active={!this.state.viewCompleted}
        >
          Incomplete
        </TabSpan>
        <TabSpan
          onClick={() => this.displayCompleted(true)}
          active={this.state.viewCompleted}
        >
          Complete
        </TabSpan>
      </TabDiv>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    const Button = styled.button`
      color: ${WHITE};
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      background-color: ${SBLUE};
      border: 2px solid ${SBLUE};
      border-radius: 3px;
    `;

    const DeleteButton = styled.button`
      color: ${WHITE};
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      background-color: ${REDDANGER};
      border: 2px solid ${REDDANGER};
      border-radius: 3px;
    `;

    const Li = styled.li`
      color: ${BLACK};
      background-color: ${WHITE};
      margin: 1em;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
    `;

    const TextSpan = styled.span`
      padding: 0.25em 1em;
      align-self: center;
      flex: 2;
      font-size: 1.2em;
      text-decoration: ${(props) => (props.lineThrough ? "line-through" : "")};
    `;

    return newItems.map((item) => (
      <Li
        key={item.id}
        // className="list-group-item d-flex justify-content-between align-items-center"
      >
        <TextSpan
          lineThrough={this.state.viewCompleted}
          title={item.description}
        >
          {item.title}
        </TextSpan>
        <span>
          <Button onClick={() => this.editItem(item)}> Edit </Button>
          <DeleteButton onClick={() => this.handleDelete(item)}>
            Delete
          </DeleteButton>
        </span>
      </Li>
    ));
  };

  render() {
    const H1 = styled.h1`
      color: ${WHITE};
      // margin: 1em;
      padding: 0.25em 1em;
      background-color: ${PBLUE};
      border: 2px solid ${PBLUE};
    `;

    const Ul = styled.ul`
      color: ${WHITE};
      // margin: 1em;
      padding: 0em 0em;
      border: 2px solid ${PLIGHTBLUE};
      list-style-type: none;
    `;

    const Div = styled.div`
      color: ${WHITE};
      margin: 1em;
      padding: 0.25em 1em;
    `;

    const Button = styled.button`
      color: ${WHITE};
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      background-color: ${SBLUE};
      border: 2px solid ${SBLUE};
      border-radius: 3px;
    `;

    return (
      <Div>
        <H1>Todo app</H1>
        <div>
          <div>
            <Button onClick={this.createItem}>Add task</Button>
          </div>
          {this.renderTabList()}
          <Ul>{this.renderItems()}</Ul>
        </div>
        {this.state.inputModal ? (
          <InputModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </Div>
    );
  }
}
export default App;
