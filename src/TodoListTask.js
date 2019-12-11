import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    state = {
        title: this.props.task.title,
        editMode: false
    }


    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.changeTitle(this.props.task, this.state.title)
    }


    onIsDoneChanged = (e) => {
        this.setState({
            title: e.currentTarget.checked
        })
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    }

    onTitleChanged = (e) => {
        this.setState({
            title: e.currentTarget.value
        })
        // this.props.changeTitle(this.props.task, e.currentTarget.value)
    }

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id, this.props.id)
    }

    render = () => {

        let classForDone = this.props.task.status === true ? 'todoList-task done' : 'todoList-task'
        return (

            <div className={classForDone}>
                <input type="checkbox" checked={this.props.task.status} onChange={this.onIsDoneChanged}/>
                {this.state.editMode
                    ? <input
                        onChange={this.onTitleChanged}
                        onBlur={this.deactivateEditMode}
                        value={this.state.title}
                        autoFocus={true}/>
                    : <span onClick={this.activateEditMode}>{this.props.task.id}-{this.props.task.title}, </span>
                }priority: {this.props.task.priority}
                <button onClick={this.deleteTask}>x</button>
            </div>
        );
    }
}

export default TodoListTask;

