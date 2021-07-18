import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default class InputModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }
  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal show={true} onHide={toggle}>
        <Modal.Header> Todo Item </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="completed">
                <Form.Check
                  type="checkbox"
                  type="checkbox"
                  label="Completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
