import React, { Component } from "react";
import InputModal from "./components/InputModal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import "./App.css";

const FILTER_OPTIONS = {
  All: "All",
  Completed: "Completed",
  Incomplete: "Incomplete",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectFilter: "All",
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
      todoList: [],
    };
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

  renderItems = () => {
    let newItems = this.state.todoList;
    if (this.state.selectFilter === FILTER_OPTIONS.Completed) {
      newItems = this.state.todoList.filter((item) => item.completed === true);
    } else if (this.state.selectFilter === FILTER_OPTIONS.Incomplete) {
      newItems = this.state.todoList.filter((item) => item.completed === false);
    }
    return newItems.map((item) => {
    return (
        <ListGroup.Item key={item.id}>
          <Container>
            <Row>
              {item.completed ? (
                <Col className="completed-task">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </Col>
              ) : (
                <Col>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </Col>
              )}
              <Col md="auto" className="justify-content-md-right">
                <Button variant="secondary" onClick={() => this.editItem(item)}>
                  {" "}
                  Edit{" "}
                </Button>
              </Col>
              <Col md="auto" className="justify-content-md-right">
                <Button
                  variant="danger"
                  onClick={() => this.handleDelete(item)}
        >
                  {" "}
                  Delete{" "}
                </Button>
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
    );
    });
  };

  renderDropDown = () => {
    return (
      <Dropdown
        onSelect={(e) => {
          this.setState({ selectFilter: e });
        }}
      >
        <Dropdown.Toggle variant="secondary btn-sm" id="dropdown-basic">
          {FILTER_OPTIONS[this.state.selectFilter]}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ backgroundColor: "#73a47" }}>
          {Object.keys(FILTER_OPTIONS).map((op) => {
            return <Dropdown.Item key={op+"_key"} eventKey={op}>{op}</Dropdown.Item>;
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  render() {
    return (
          <div>
        <Container>
          <br />
          <Jumbotron>
            <h1>Todo app</h1>
            <Container>
              <Row>
                <Col>
                  <Button onClick={this.createItem}>
                    Add task
                  </Button>
                </Col>
                <Col md="auto" className="justify-content-md-right">
                  {this.renderDropDown()}
                </Col>
              </Row>
            </Container>
            <ListGroup>{this.renderItems()}</ListGroup>
          </Jumbotron>
        </Container>
        {this.state.inputModal ? (
          <InputModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}
export default App;
