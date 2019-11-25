import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";

class App extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    nextTodoListId = 0

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem('todolists', stateAsString)
    }

    restoreState = () => {
        let state = {
            todolists: []
        }
        let stateAsString = localStorage.getItem('todolists')
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, () => {
            this.state.todolists.forEach(t => {
                if (t.id >= this.nextTodoListId) {
                    this.nextTodoListId = t.id + 1
                }
            })
        })
    }


    addTodoList = (newText) => {
        let newTodoList = {
            id: this.nextTodoListId,
            title: newText,
            tasks: []
        }
        this.nextTodoListId++
        this.props.addTodolist(newTodoList)
    }

    render = () => {
        const todolists = this.props.todolists.map(tl => {
            return <TodoList id={tl.id} title={tl.title} tasks={tl.tasks}/>
        })
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodolist) => {
            const action = {
                type: 'ADD-TODOLIST',
                newTodolist: newTodolist
            }
            dispatch(action)
        },
        deleteTodolist: (todolistId) => {
            const action = {
                type: 'DELETE-TODOLIST',
                todolistId: todolistId
            }
            dispatch(action)
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

