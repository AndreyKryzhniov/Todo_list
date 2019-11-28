import React from 'react';
import './App.css'

class TodoListTitle extends React.Component {

    state = {
        error: false,
        title: ''
    }

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }



    render = () => {

        return (
            <div>
                <span className="todoList-header__title">{this.props.title} </span>
                <button onClick={this.deleteTodolist}>x</button>
            </div>
        );
    }
}

export default TodoListTitle;

