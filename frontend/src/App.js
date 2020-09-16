import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Tasks from "./components/tasks";

class App extends Component {
  state = {
    todoList: [],
    activeItem: {
      id: null,
      title: "",
      completed: false,
    },
    editing: false,
  };
  getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };
  componentDidMount() {
    this.fetchTasks();
  }
  fetchTasks = () => {
    console.log("fetching...");

    fetch("http://127.0.0.1:8000/api/tasks/")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          todoList: data,
        })
      );
  };
  handelChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: value,
      },
    });
  };
  handelSubmit = (e) => {
    e.preventDefault();
    var csrftoken = this.getCookie("csrftoken");
    let url = "http://127.0.0.1:8000/api/tasks/create/";

    if (this.state.editing) {
      url =
        "http://127.0.0.1:8000/api/tasks/update/" + this.state.activeItem.id;
      this.setState({
        editing: false,
      });

      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(this.state.activeItem),
      }).then((response) => {
        this.fetchTasks();
        this.setState({
          activeItem: {
            id: null,
            title: "",
            completed: false,
          },
        });
      });
      return;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(this.state.activeItem),
    }).then((response) => {
      this.fetchTasks();
      this.setState({
        activeItem: {
          id: null,
          title: "",
          completed: false,
        },
      });
    });
  };

  handelDelete = (task) => {
    var csrftoken = this.getCookie("csrftoken");
    let url = "http://127.0.0.1:8000/api/tasks/delete/";

    url = url + task.id;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    }).then((response) => {
      this.fetchTasks();
    });
  };
  handelEdit = (task) => {
    this.setState({
      activeItem: task,
      editing: true,
    });
  };

  stikeUnstrike = (task) => {
    task.completed = !task.completed;
    var csrftoken = this.getCookie("csrftoken");
    let url = "http://127.0.0.1:8000/api/tasks/update/" + task.id;
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ title: task.title, completed: task.completed }),
    }).then(() => {
      this.fetchTasks();
    });
  };
  render() {
    let tasks = this.state.todoList;
    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form id="form" onSubmit={this.handelSubmit}>
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input
                    className="form-control"
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Add task here"
                    onChange={this.handelChange}
                    value={this.state.activeItem.title}
                  ></input>
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    id="submit"
                    className="btn btn-warning"
                    type="submit"
                    name="Add"
                    value="Submit"
                  />
                </div>
              </div>
            </form>
          </div>

          <div is="list-wrapper">
            <Tasks
              tasks={tasks}
              stikeUnstrike={this.stikeUnstrike}
              handelEdit={this.handelEdit}
              handelDelete={this.handelDelete}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
