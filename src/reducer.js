import {api} from "./api";

const ADD_TODOLIST = 'ADD_TODOLIST'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK = 'CHANGE_TASK'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const DELETE_TODOLIST = 'DELETE_TODOLIST'
const DELETE_TASK = 'DELETE_TASK'
const CHANGE_FILTER_VALUE = 'CHANGE_FILTER_VALUE'
const SET_TODOLISTS = 'SET_TODOLISTS'
const SET_TODOTASKS = 'SET_TODOTASKS'

const initialState = {
    todolists: [],
    filterValue: 'All'
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(t => ({...t, tasks: []}))
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [action.newTodolist, ...state.todolists ]
            }
        case ADD_TASK:
            return {
                ...state, todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        case SET_TODOTASKS:
            return {
                ...state, todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolists) {
                        return {...tl, tasks: action.tasks.map(task => task)}
                    } else {
                        return tl
                    }
                })
            }
        case CHANGE_TASK:
            return {
                ...state, todolists: state.todolists.map(todolist => {
                    if (todolist.id !== action.task.todoListId) {
                        return todolist
                    } else {
                        return {
                            ...todolist, tasks: todolist.tasks.map(task => {
                                if (task.id !== action.task.id) {
                                    return task
                                } else {
                                    return {...task, title: action.task.title, status: action.task.status}
                                }
                            })
                        }
                    }
                })
            }
        case CHANGE_TODOLIST_TITLE:
            return {
                ...state, todolists: state.todolists.map(todolist => {
                    if (todolist.id !== action.todoListId) {
                        return todolist
                    } else {
                        return {
                            ...todolist, title: action.title
                        }
                    }
                })
            }
        case CHANGE_FILTER_VALUE:
            return {
                ...state, filterValue: action.newFilterValue
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(t => t.id !== action.todolistId),
            }
        case DELETE_TASK: {
            return {
                ...state, todolists: state.todolists.map(todolist => {
                        if (todolist.id !== action.todolistId) {
                            return todolist
                        } else {
                            return {
                                ...todolist, tasks: (todolist.tasks.filter(task => task.id !== action.taskId))
                            }
                        }
                    }
                )
            }
        }
    }
    return state
}

export const addTodolistAC = (newTodolist) => {
    return {type: 'ADD_TODOLIST', newTodolist}
}

export const addTaskAC = (newTask, todoListId) => {
    return {type: 'ADD_TASK', newTask, todoListId}
}

export const changeTaskAC = (task) => {
    return {type: 'CHANGE_TASK', task}
}

export const deleteTodolistAC = (todolistId) => {
    return {type: 'DELETE_TODOLIST', todolistId}
}

export const deleteTaskAC = (todolistId, taskId) => {
    return {type: 'DELETE_TASK', todolistId, taskId}
}

export const changeFilterAC = (newFilterValue) => {
    return {type: 'CHANGE_FILTER_VALUE', newFilterValue}
}

export const setTodolistsAC = (todolists) => {
    return {type: 'SET_TODOLISTS', todolists}
}

export const setTasksAC = (tasks, todolists) => {
    return {type: 'SET_TODOTASKS', tasks, todolists}
}

export const changeTodoListTitleAC = (title, todoListId) => {
    return {type: 'CHANGE_TODOLIST_TITLE', title, todoListId}
}

export const loadTodoListThunkAC = () => {
    return (dispatch) => {
        api.loadTodoList().then(response => {
            dispatch(setTodolistsAC(response.data))
        })
    }
}

export const addTodoListThunkAC = (title) => {
    return (dispatch) => {
        api.addTodoList(title).then(response => {
            dispatch(addTodolistAC(response.data.data.item))
        })
    }
}

export const deleteTodoListThunkAC = (todlistId) => {
    return (dispatch) => {
        api.deleteTodoList(todlistId).then(response => {
            if (response.data.resultCode === 0)
            dispatch(deleteTodolistAC(todlistId))
        })
    }
}

export const loadTasksThunkAC = (todolists) => {
    return (dispatch) => {
        api.restoreState(todolists).then(response => {
            dispatch(setTasksAC(response.data.items, todolists))
        })
    }
}

export const addTaskThunkAC = (title, todoListId) => {
    return (dispatch) => {
        api.addTask(title, todoListId).then(response => {
            dispatch(addTaskAC(response.data.data.item, todoListId))
        })
    }
}

export const changeTaskThunkAC = (task) => {
    return (dispatch) => {
        api.changeTask(task).then(response => {
            dispatch(changeTaskAC(response.data.data.item))
        })
    }
}

export const deleteTaskThunkAC = (todolistId, taskId) => {
    return (dispatch) => {
        api.deleteTask(taskId).then(response => {
            if (response.data.resultCode === 0)
            dispatch(deleteTaskAC(todolistId, taskId))
        })
    }
}

export const changeTodoListTitleThunkAC = (title, todoListId) => {
    return (dispatch) => {
        api.changeTodoListTitle(title, todoListId).then(response => {
            debugger
            if (response.data.resultCode === 0)
                dispatch(changeTodoListTitleAC(title, todoListId))
        })
    }
}




export default reducer