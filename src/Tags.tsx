import React, {ChangeEvent, useCallback} from 'react'
import {TagType} from './Todolist'
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";

type TagPropsType = {
    tag: TagType
    todolistId: string
    removeTag: (tagId: string, todolistId: string) => void
    onTagFilterClickHandler: (tagTitle: string) => void
}
export const Tags = React.memo((props: TagPropsType) => {

    const onClickHandler = useCallback(() => {
        props.removeTag(props.tag.id, props.todolistId)
    }, [props.tag.id, props.todolistId]);

    const onTagFilterClickHandler = useCallback(() => {
        props.onTagFilterClickHandler(props.tag.title)
    }, [props.tag.title, props.todolistId]);

    return (
        <span key={props.todolistId} style={{paddingRight: '20px'}}>
            <button onClick={onTagFilterClickHandler}>
                {props.tag.title}
            </button>
            <IconButton onClick={onClickHandler} style={{width: '20px', height: '20px'}}>
                <Delete style={{width: '20px', height: '20px'}}/>
            </IconButton>
        </span>

    )
})
