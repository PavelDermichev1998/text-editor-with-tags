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
            let newTag = {
                id: v1(),
                title: action.title.slice(tagIndex, action.title.length)
            }
            if (!state[action.todolistId].map(t => t.title).join().includes(newTag.title) && tagIndex !== -1) {
                const tags = stateCopy[action.todolistId];
                const newTags = [newTag, ...tags];
                stateCopy[action.todolistId] = newTags;
                return stateCopy;
            }
            return state
        }
        case 'CHANGE-TAG-TITLE': {
            let todolistTags = state[action.todolistId];
            let tagIndex = action.newTitle.indexOf('#');
            let newTagsArray = todolistTags
                .map(t => action.newTitle.includes(t.title) ? {...t, title: action.newTitle.slice(tagIndex, action.newTitle.length)} : t);
            state[action.todolistId] = newTagsArray;
            return ({...state});
        }
        case 'REMOVE-TAG': {
            const stateCopy = {...state}
            const tags = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tags.filter(t => t.id !== action.tagId);
            return stateCopy;
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
type ActionsType = AddTagActionType | RemoveTagActionType | ChangeTagTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType