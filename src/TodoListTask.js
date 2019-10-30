import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    state = {
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
    }


    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
    }

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    }

    render = () => {

        let classForDone = this.props.task.isDone === true ? 'todoList-task done' : 'todoList-task'

        return (

            <div className={classForDone}>
                <input type="checkbox" checked={this.props.task.isDone} onChange={this.onIsDoneChanged}/>
                {this.state.editMode
                    ? <input
                        onChange={this.onTitleChanged}
                        onBlur={this.deactivateEditMode}
                        value={this.props.task.title}
                        autoFocus={true}/>
                    : <span onClick={this.activateEditMode}>{this.props.task.id}-{this.props.task.title}, </span>
                }priority: {this.props.task.priority}
            </div>
        );
    }
}

export default TodoListTask;

