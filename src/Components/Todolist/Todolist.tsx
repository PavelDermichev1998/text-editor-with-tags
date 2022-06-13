import React, {useCallback} from 'react'
import {AddItemForm} from '../AddItemForm/AddItemForm'
import {EditableSpan} from '../EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton';
import {Delete} from '@mui/icons-material';
import {Task} from '../Task/Task'
import {Tag} from "../Tag/Tag";
import style from './Todolist.module.scss'

export type TaskType = {
    id: string
    title: string
}

export type TagType = {
    id: string
    title: string
    selected: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    tags: Array<TagType>
    changeFilter: (value: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTag: (tagId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    selectTag: (select: boolean, value: string, todolistId: string) => void
    filter: string
}

export const Todolist = React.memo(function (props: PropsType) {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id),
        [props])
    const onTagFilterClickHandler = useCallback((tagTitle: string) => {
        props.changeFilter(tagTitle, props.id)
    }, [props])

    let tasksForTodolist = props.tasks

    if (props.filter !== 'all') {
        tasksForTodolist = props.tasks.filter(t => t.title.includes(props.filter))
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                selectTag={props.selectTag}/>)
            }
        </div>
        <div>Tags:</div>
        <button onClick={onAllClickHandler} className={style.todolist_tags_btn}>
            All
        </button>
        <div className={style.todolist_tags}>
            {
                props.tags.map(tag => <Tag key={tag.id}
                                           tag={tag}
                                           todolistId={props.id}
                                           removeTag={props.removeTag}
                                           onTagFilterClickHandler={onTagFilterClickHandler}/>)
            }
        </div>
    </div>
})


