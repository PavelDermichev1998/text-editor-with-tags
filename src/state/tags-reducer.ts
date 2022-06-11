import {TagType} from '../Todolist';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TagsStateType} from '../App';


const tags = require('./tags.json')
const initialState: TagsStateType = tags

export const tagsReducer = (state: TagsStateType = initialState, action: ActionsType): TagsStateType => {
    switch (action.type) {
        case 'ADD-TAG': {
            const stateCopy = {...state}
            let tagIndex = action.title.indexOf('#');
            const newTag: TagType = {
                id: v1(),
                title: action.title.slice(tagIndex, action.title.length)
            }
            if (!state[action.todolistId].map(t => t.title).join().includes(newTag.title)) {
                const tags = stateCopy[action.todolistId];
                const newTags = [newTag, ...tags];
                stateCopy[action.todolistId] = newTags;
                return stateCopy;
            }
            return state

        }/*
        case 'CHANGE-TAG': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }*/
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}


export const addTagAC = (title: string, todolistId: string): AddTagActionType => {
    return {type: 'ADD-TAG', title, todolistId}
}/*
export const changeTagAC = (taskId: string, todolistId: string, title: string): ChangeTagActionType => {
    return {type: 'CHANGE-TAG', todolistId, taskId, title}
}
*/
export type AddTagActionType = {
    type: 'ADD-TAG',
    todolistId: string
    title: string
}
/*

export type ChangeTagActionType = {
    type: 'CHANGE-TAG',
    todolistId: string
    taskId: string
    title: string
}
*/


type ActionsType = AddTagActionType
    /*| ChangeTagActionType*/
    | AddTodolistActionType
    | RemoveTodolistActionType