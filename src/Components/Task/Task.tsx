import React, { useCallback } from 'react'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {TaskType} from '../Todolist/Todolist'

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    selectTag: (select: boolean, value: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
        }, [props]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props]);

    return <div key={props.task.id}>
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} selectTag={props.selectTag} todolistId={props.todolistId}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
