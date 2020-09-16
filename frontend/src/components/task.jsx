import React, { Component, Fragment } from "react";

class Task extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <div key={this.props.task.id} className="task-wrapper flex-wrapper">
          <div
            style={{ flex: 7 }}
            onClick={() => this.props.stikeUnstrike(this.props.task)}
          >
            {this.props.task.completed == false ? (
              <span>{this.props.task.title}</span>
            ) : (
              <strike>{this.props.task.title}</strike>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <button
              className="btn btn-sm btn-outline-info"
              onClick={() => this.props.handelEdit(this.props.task)}
            >
              Edit
            </button>
          </div>

          <div style={{ flex: 1 }}>
            <button
              className="btn btn-sm btn-outline-dark delete"
              onClick={() => this.props.handelDelete(this.props.task)}
            >
              Delete
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Task;
