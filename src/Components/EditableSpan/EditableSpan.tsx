import React, { ChangeEvent, useState } from 'react';
import style from './EditableSpan.module.scss'

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    selectTag?: (select: boolean, value: string, todolistId: string) => void
    todolistId?: string
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
        if(props.selectTag && props.todolistId) {
            props.selectTag(true, props.value, props.todolistId)
        }

    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
        if(props.selectTag && props.todolistId) {
            props.selectTag(false, props.value, props.todolistId)
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} className={style.tags_active}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
});
