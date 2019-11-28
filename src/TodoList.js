import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, deleteTodolistAC} from "./reducer";

class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    nextTaskId = 0

    state = {
        // tasks: [],
        filterValue: ''
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem('our-state' + this.props.id, stateAsString)
    }

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        }
        let stateAsString = localStorage.getItem('our-state' + this.props.id)
        if (stateAsString != null) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if (t.id >= this.nextTaskId) {
                    this.nextTaskId = t.id + 1
                }
            })
        })
    }

    AddTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: 'low'
        }
        this.nextTaskId++
        this.props.addTask(newTask, this.props.id)
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState()
        })
    }

    changeTask = (taskId, obj) => {
        this.props.changeTask(this.props.id, taskId, obj)
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone})
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId,{title})
    }

    deleteTodolist = (todolistId) => {
        this.props.deleteTodolist(todolistId)
    }

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    }

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div className='todoList-header'>
                        <TodoListTitle title={this.props.title} id={this.props.id} deleteTodolist={this.props.deleteTodolist}/>
                        <AddNewItemForm addItem={this.AddTask}/>
                    </div>
                    <TodoListTasks
                        deleteTask={this.deleteTask}
                        changeStatus={this.changeStatus}
                        changeTitle={this.changeTitle}
                        tasks={this.props.tasks.filter(t => {
                            if (this.state.filterValue === 'All') {
                                return true
                            }
                            if (this.state.filterValue === 'Completed') {
                                return t.isDone
                            }
                            if (this.state.filterValue === 'Active') {
                                return t.isDone === false
                            }
                        })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask, todolistId) {
            const action = addTaskAC(newTask, todolistId)
            dispatch(action)
        },
        changeTask(todolistId, taskId, obj) {
            const action = changeTaskAC(todolistId, taskId, obj)
            dispatch(action)
        },
        deleteTodolist(todolistId) {
            const action = deleteTodolistAC(todolistId)
            dispatch(action)
        },
        deleteTask(todolistId, taskId) {
            const action = deleteTaskAC(todolistId, taskId)
            dispatch(action)
        }
    }
}

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList)

export default ConnectedTodolist;

