import React, {useCallback} from 'react'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import IconButton from '@mui/material/IconButton';
import {Delete} from '@mui/icons-material';
import {Task} from './Task'
import {FilterValuesType} from './App';
import {Tags} from "./Tags";

export type TaskType = {
    id: string
    title: string
}

export type TagType = {
    id: string
    title: string
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    tags: Array<TagType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTag: (tagId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist called')

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id),
        [props.id, props.changeFilter])
    const onTagFilterClickHandler = useCallback((tagTitle: string) => {
        props.changeFilter(tagTitle, props.id)
    }, [props.id, props.changeFilter])


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
                    />
                )
            }
        </div>
        <div>Tags:</div>
        <button onClick={onAllClickHandler}>
            All
        </button>
        {
            props.tags.map(tag => <Tags key={tag.id} tag={tag} todolistId={props.id} removeTag={props.removeTag}
                                             onTagFilterClickHandler={onTagFilterClickHandler}
                />
            )
        }
    </div>
})


