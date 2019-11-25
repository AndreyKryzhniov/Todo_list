import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

    state = {
        error: false,
        title: ''
    }

    onAddTaskClick = () => {
        let newText = this.state.title
        if (newText === '') {
            this.setState( {error: true})
        }
            else {
            this.setState( {error: false})
            this.props.AddTask(newText)
            this.state.title = ''
        }
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddTaskClick()
        }
    }

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value, error: false})
    }

        // () => this.setState({error: false})


    render = () => {

        let classForError = this.state.error === true ? 'error' : ''

        return (

                <div className="todoList-header">
                    <h3 className="todoList-header__title">{this.props.title}</h3>
                    <div className="todoList-newTaskForm">
                        <input className={classForError}
                               type="text" placeholder="New task name"
                               onChange={this.onTitleChanged}
                               onKeyPress={this.onKeyPress}
                               value={this.state.title}
                        />
                        <button onClick={this.onAddTaskClick} >Add</button>
                    </div>
                </div>
        );
    }
}

export default TodoListHeader;

