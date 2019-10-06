"use strict";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };

  } // end constructor

  render() {
    const tasks = this.state.tasks

    const taskListItems = tasks.map((task) => {
      return (
        <Task 
          key={task.id} 
          id={task.id} 
          name={task.name} 
          assignees={task.assignees}
          due_date={task.due_date}
          is_completed={task.is_completed}
      
        />
      );
      
    });

    return (
      <div>
        <p>Tasks</p>
        <ul>
          {taskListItems}
        </ul>
      </div>
    );
  } // end render

  componentDidMount() {
    const tasks = this.state.tasks;

    fetch('/api/tasks', { method: 'GET' })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({ tasks: data.tasks })
      }

      );
  } // end componentDidMount

} // end Index


class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignees: this.props.assignees,
      is_completed: this.props.is_completed,
      due_date: this.props.due_date
    };

  } // end constructor

  const updateTask = (data) => {
    fetch(`/api/tasks/${this.props.id}`, { method: 'PATCH', body: JSON.stringify(data) })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      this.setState({ assignees: data.task.assignees, due_date: data.task.due_date, is_completed: data.task.is_completed })
    }
  } // end updateTask

  const handleCheckboxChange = (event) => {
    // change checkbox
    console.log(event);
    this.setState({is_completed: !this.state.is_completed})

    // update completed_at state
    
    // update task
    const data = {
      'task': {
        'is_completed': this.state.is_completed
      }
    }

    this.updateTask(data)
  } // end handleCheckboxChange
  
  render() {
    const isSelected = this.state.is_completed;

    return (
      <div><input key={this.props.id} type="checkbox" checked={isSelected} onChange={this.handleCheckboxChange} {...this.props} />{this.props.name}</div>
    );
  } // end render



} // end Task



ReactDOM.render(
  <App />,
  document.getElementById("root")
);