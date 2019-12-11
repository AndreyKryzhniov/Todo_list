import React from 'react';
import './App.css'
import {connect} from "react-redux";
import {changeTodoListTitleThunkAC} from "./reducer";

class TodoListTitle extends React.Component {

    state = {
        title: this.props.title,
        editMode: true
    }

    changeEditMode = () => {
        debugger
        if (this.state.editMode) {
            this.setState({
                editMode: false
            })
        } else {this.setState({
            editMode: true
        })
            this.props.changeTodoListTitle(this.state.title, this.props.id)
        }
    }

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }

    changeTodoListTitle = (e) => {
        debugger
        this.setState({
            title: e.currentTarget.value
        })
        // this.props.changeTodoListTitle(e.currentTarget.value, this.props.id)
    }

    render = () => {
        return (
            <div>
                {
                    this.state.editMode ?
                    <span className="todoList-header__title" onClick={this.changeEditMode}>{this.props.title}</span> :
                    <input value={this.state.title} onBlur={this.changeEditMode} onChange={this.changeTodoListTitle}/>
                }
                <button onClick={this.deleteTodolist}>x</button>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        changeTodoListTitle(title, todoListId) {
            debugger
            const thunk = changeTodoListTitleThunkAC(title, todoListId)
            dispatch(thunk)
        }
    }
}

export default connect(null, mapDispatchToProps) (TodoListTitle);

