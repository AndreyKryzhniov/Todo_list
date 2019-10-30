import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    nextTaskId = 0

    state = {
        tasks: [],
        filterValue: ''
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem('our-state', stateAsString)
    }

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        }
        let stateAsString = localStorage.getItem('our-state')
        if (stateAsString != null) {state = JSON.parse(stateAsString)}
        this.setState(state, ()=> {
            this.state.tasks.forEach( t => {
                if (t.id >= this.nextTaskId){
                    this.nextTaskId = t.id+1
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
        let newTasks = [...this.state.tasks, newTask]
        this.setState(
            {
                tasks: newTasks
            }, () => {this.saveState()})

    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {this.saveState()})
    }

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t
            } else {
                return {...t, ...obj}
            }
        })
        this.setState({
            tasks: newTasks
        }, () => {this.saveState()})
    }

    changeStatus = (taskId, isDone) => {
this.changeTask(taskId, {isDone})
    }

    changeTitle = (taskId, title) => {
this.changeTask(taskId, {title})
    }

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader AddTask={this.AddTask}/>
                    <TodoListTasks
                        changeStatus={this.changeStatus}
                        changeTitle={this.changeTitle}
                        tasks={this.state.tasks.filter(t => {
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

export default App;

