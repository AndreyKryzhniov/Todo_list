import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskThunkAC,
    changeFilterAC,
    changeTaskThunkAC,
    deleteTaskThunkAC,
    deleteTodoListThunkAC,
    loadTasksThunkAC
} from "./reducer";


class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        this.props.loadTasks(this.props.id)
    }

    addTask = (newText) => {
        this.props.addTask(newText, this.props.id)
    }

    changeFilter = (newFilterValue) => {
        this.props.changeFilter(newFilterValue)
    }

    changeTask = (task) => {
        this.props.changeTask(task)
    }

    changeStatus = (task, status) => {
        let newTask = {...task, status: status ? 2 : 0}
        this.changeTask(newTask)
    }

    changeTitle = (task, title) => {
        let newTask = {...task, title: title}
        this.changeTask(newTask)
    }

    deleteTodolist = (id) => {
        this.props.deleteTodolist(id)
    }

    deleteTask = (taskId) => {
                    this.props.deleteTask(this.props.id, taskId)
    }

    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="App">
                <div className="todoList">
                    <div className='todoList-header'>
                        <TodoListTitle title={this.props.title} id={this.props.id} deleteTodolist={this.deleteTodolist}/>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks
                        deleteTask={this.deleteTask}
                        changeStatus={this.changeStatus}
                        changeTitle={this.changeTitle}
                        tasks={tasks.filter(t => {
                            if (this.props.filterValue === 'All') {
                                return true
                            }
                            if (this.props.filterValue === 'Completed') {
                                return t.isDone
                            }
                            if (this.props.filterValue === 'Active') {
                                return t.isDone === false
                            }
                        })}/>
                    <TodoListFooter changeFilter={this.props.changeFilter} filterValue={this.props.filterValue}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filterValue: state.filterValue,
        taskId: state.taskId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTask(task) {
            const thunk = changeTaskThunkAC(task)
            dispatch(thunk)
        },
        deleteTodolist(todolistId) {
            const thunk = deleteTodoListThunkAC(todolistId)
            dispatch(thunk)
        },
        changeFilter(newFilterValue) {
            const action = changeFilterAC(newFilterValue)
            dispatch(action)
        },
        loadTasks(todolistId) {
            const thunk = loadTasksThunkAC(todolistId)
            dispatch(thunk)
        },
        addTask(newTask, todoListId) {
            const thunk = addTaskThunkAC(newTask, todoListId)
            dispatch(thunk)
        },
        deleteTask(todolistId, taskId) {
            const thunk = deleteTaskThunkAC(todolistId, taskId)
            dispatch(thunk)
        }
    }
}

const ConnectedTodolist = connect(mapStateToProps, mapDispatchToProps)(TodoList)

export default ConnectedTodolist;

