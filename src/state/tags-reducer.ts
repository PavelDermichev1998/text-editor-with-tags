import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TagsStateType} from '../Components/App/App';

const tags = require('./tags.json')
const initialState: TagsStateType = tags

export const tagsReducer = (state: TagsStateType = initialState, action: ActionsType): TagsStateType => {
    switch (action.type) {
        case 'ADD-TAG': {
            const stateCopy = {...state}
            const tags = stateCopy[action.todolistId];
            let tagIndex = action.title.indexOf('#');
            let newTag = {
                id: v1(),
                title: action.title.slice(tagIndex, action.title.length),
                selected: true
            }
            const newTags = [newTag, ...tags];
            if (!state[action.todolistId].map(t => t.title).join().includes(newTag.title) && tagIndex !== -1) {
                stateCopy[action.todolistId] = newTags;
                return stateCopy;
            }
            return state
        }
        case 'CHANGE-TAG-TITLE': {
            let todolistTags = state[action.todolistId];
            let tagIndex = action.newTitle.indexOf('#');
            state[action.todolistId] = todolistTags
                .map(t => action.newTitle.includes(t.title) ? {
                    ...t,
                    selected: true,
                    title: action.newTitle.slice(tagIndex, action.newTitle.length)
                } : t);
            return ({...state});
        }
        case 'REMOVE-TAG': {
            const stateCopy = {...state}
            const tags = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tags.filter(t => t.id !== action.tagId);
            return stateCopy;
        }
        case 'SELECT-TAG': {
            let todolistTags = state[action.todolistId];
            state[action.todolistId] = todolistTags
                .map(t => action.value.includes(t.title) ? {...t, selected: !action.select} : t);
            return ({...state});
        }
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
}
export const removeTagAC = (tagId: string, todolistId: string): RemoveTagActionType => {
    return {type: 'REMOVE-TAG', tagId: tagId, todolistId: todolistId}
}
export const changeTagTitleAC = (newTitle: string, todolistId: string): ChangeTagTitleActionType => {
    return {type: 'CHANGE-TAG-TITLE', newTitle: newTitle, todolistId: todolistId}
}
export const selectTagAC = (select: boolean, value: string, todolistId: string): SelectTagActionType => {
    return {type: 'SELECT-TAG', select: select, value: value, todolistId: todolistId}
}


export type AddTagActionType = {
    type: 'ADD-TAG',
    todolistId: string
    title: string
}
export type RemoveTagActionType = {
    type: 'REMOVE-TAG',
    todolistId: string
    tagId: string
}
export type ChangeTagTitleActionType = {
    type: 'CHANGE-TAG-TITLE'
    newTitle: string
    todolistId: string
}
export type SelectTagActionType = {
    type: 'SELECT-TAG'
    select: boolean
    value: string
    todolistId: string
}
type ActionsType = AddTagActionType | RemoveTagActionType | ChangeTagTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SelectTagActionType