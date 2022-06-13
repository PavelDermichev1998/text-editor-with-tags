import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import { combineReducers, createStore } from 'redux';
import {tagsReducer} from "./tags-reducer";

const rootReducer = combineReducers({
    tags: tagsReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>

