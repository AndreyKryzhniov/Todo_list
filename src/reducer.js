const ADD_TODOLIST = 'ADD_TODOLIST'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK = 'CHANGE_TASK'
const DELETE_TODOLIST = 'DELETE_TODOLIST'
const DELETE_TASK = 'DELETE_TASK'

const initialState = {
    todolists: [
    //     {
    //         id: 0,
    //         title: 'every day',
    //         tasks: [{id: 0, title: "JS", isDone: true, priority: "low"}, {
    //             id: 1,
    //             title: "HTML",
    //             isDone: false,
    //             priority: "low"
    //         }]
    //     },
    //
    ]
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case ADD_TASK:
            return {
                ...state, todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        case CHANGE_TASK:
            return{
                ...state,
                todolists: state.todolists.map(todolist => {
                    if (todolist.id !== action.todolistId) {
                        return todolist
                    } else {
                        return {
                            ...todolist, tasks: todolist.tasks.map(task => {
                                if (task.id !== action.taskId) {
                                    return task
                                } else {
                                    return {...task, ...action.obj}
                                }
                            })
                        }
                    }
                })
            }
        case DELETE_TODOLIST:
            return {
                ...state, todolists: state.todolists.filter(t => t.id !== action.todolistId)
            }
        case DELETE_TASK: {
            return {
                ...state, todolists: state.todolists.map(todolist => {
                    if (todolist.id !== action.todolistId) {
                        return todolist
                    } else {
                        return {
                            ...todolist, tasks: todolist.tasks.filter(task => task.id !== action.taskId)
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

export const addTaskAC = (newTask, todolistId) => {
    return {type: 'ADD_TASK', newTask, todolistId}
}

export const changeTaskAC = (todolistId, taskId, obj) => {
    return {type: 'CHANGE_TASK', todolistId, taskId, obj}
}

export const deleteTodolistAC = (todolistId) => {
    return {type: 'DELETE_TODOLIST', todolistId}
}

export const deleteTaskAC = (todolistId, taskId) => {
    return {type: 'DELETE_TASK', todolistId, taskId}
}


export default reducer