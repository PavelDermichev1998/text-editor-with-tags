import React, {useCallback} from 'react'
import {TagType} from '../Todolist/Todolist'
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import style from './Tag.module.scss'

type TagPropsType = {
    tag: TagType
    todolistId: string
    removeTag: (tagId: string, todolistId: string) => void
    onTagFilterClickHandler: (tagTitle: string) => void
}
export const Tag = React.memo((props: TagPropsType) => {

    const onClickHandler = useCallback(() => {
        props.removeTag(props.tag.id, props.todolistId)
    }, [props]);

    const onTagFilterClickHandler = useCallback(() => {
        props.onTagFilterClickHandler(props.tag.title)
    }, [props]);

    return (
        <span key={props.todolistId} style={{paddingRight: '20px'}}>
            <button onClick={onTagFilterClickHandler} className={`${style.tag} ${props.tag.selected ? '' : style.tag_select}`}>
                {props.tag.title}
            </button>
            <IconButton onClick={onClickHandler} size = 'small'>
                <Delete style={{width: '20px', height: '20px'}}/>
            </IconButton>
        </span>

    )
})
