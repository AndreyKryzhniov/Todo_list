import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        let tasksElement = this.props.tasks.map(task => <TodoListTask task={task}
                                                                      deleteTask={this.props.deleteTask}
                                                                      changeTitle={this.props.changeTitle}
                                                                      changeStatus={this.props.changeStatus}/>)
        return (
                    <div className="todoList-tasks">
                        {tasksElement}
                    </div>
        );
    }
}

export default TodoListTasks;

