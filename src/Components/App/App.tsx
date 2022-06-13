import React, {useCallback} from 'react'
import './App.module.scss';
import {TagType, TaskType, Todolist} from '../Todolist/Todolist';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from '../../state/todolists-reducer';
import {addTaskAC, changeTaskTitleAC, removeTaskAC} from '../../state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {addTagAC, changeTagTitleAC, removeTagAC, selectTagAC} from "../../state/tags-reducer";


export type TodolistType = {
    id: string
    title: string
    filter: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TagsStateType = {
    [key: string]: Array<TagType>
}

function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const tags = useSelector<AppRootStateType, TagsStateType>(state => state.tags)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId));
    }, [dispatch]);
    const removeTag = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTagAC(id, todolistId));
    }, [dispatch]);
    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId));
        dispatch(addTagAC(title, todolistId));
    }, [dispatch]);
    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId));
        dispatch(changeTagTitleAC(newTitle, todolistId));
        dispatch(addTagAC(newTitle, todolistId));
    }, [dispatch]);
    const selectTag = useCallback(function (select: boolean, value: string, todolistId: string) {
        dispatch(selectTagAC(select, value, todolistId));
    }, [dispatch]);
    const changeFilter = useCallback(function (value: string, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, [dispatch]);
    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistAC(id));
    }, [dispatch]);
    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleAC(id, title));
    }, [dispatch]);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Notes
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let allTodolistTags = tags[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        tags={allTodolistTags}
                                        removeTask={removeTask}
                                        removeTag={removeTag}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        selectTag={selectTag}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
