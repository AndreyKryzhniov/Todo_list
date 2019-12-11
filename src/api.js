import axios from "axios"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/todo-lists/",
    withCredentials: true,
    headers: {"API-KEY": '31066793-0c82-43e0-88fb-db49a2d80799'}
})

export const api = {
    loadTodoList() {
        return instance.get('')
    },
    addTodoList(title) {
        return instance.post('', {title: title})
    },
    addTask(title, todoListId) {
       return instance.post( `${todoListId}/tasks`,{title: title})
    },
    restoreState(todoListId) {
        return instance.get( `${todoListId}/tasks`)
    },
    changeTask(task) {
        return instance.put( `tasks/`, task)
    },
    deleteTask(taskId) {
        return instance.delete( `tasks/${taskId}`)
    },
    deleteTodoList(id) {
        return instance.delete( `${id}`)
    },
    changeTodoListTitle(title, todoListId) {
        debugger
        return instance.put( `${todoListId}`, {title: title})
    },
}