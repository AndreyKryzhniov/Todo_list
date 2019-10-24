import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    }



    render = () => {

        let classForDone = this.props.task.isDone === true ? 'todoList-task done' : 'todoList-task'

        return (

            <div className={classForDone}>
                <input type="checkbox" checked={this.props.task.isDone} onChange={this.onIsDoneChanged}/>
                <span>{this.props.task.title}, </span>
                <span>priority: {this.props.task.priority}</span>
            </div>
        );
    }
}

export default TodoListTask;

