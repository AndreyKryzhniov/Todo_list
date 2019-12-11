import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoListThunkAC, loadTodoListThunkAC} from "./reducer";

class App extends React.Component {

    componentDidMount() {
        this.loadTodoList()
    }

    loadTodoList = () => {
        this.props.loadTodoListThunk()
    }

    addTodoList = (title) => {
        this.props.addTodoListThunk(title)
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
        todolists: state.todolists,
        todolistId: state.todolistId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoListThunk: (newTodolist) => {
            const thunk = addTodoListThunkAC(newTodolist)
            dispatch(thunk)
        },
        loadTodoListThunk: () => {
            const thunk = loadTodoListThunkAC()
            dispatch(thunk)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


