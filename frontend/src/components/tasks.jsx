import React, { Component, Fragment } from "react";
import Task from "./task";

class Tasks extends Component {
  render() {
    let tasks = this.props.tasks;
    return (
      <Fragment>
        {tasks.map((task) => (
          <Task
            stikeUnstrike={this.props.stikeUnstrike}
            handelEdit={this.props.handelEdit}
            handelDelete={this.props.handelDelete}
            task={task}
          />
        ))}
      </Fragment>
    );
  }
}

export default Tasks;
