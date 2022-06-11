import React from 'react'
import {TagType} from './Todolist'

type TagPropsType = {
    tag: TagType
    todolistId: string
}
export const Tags = React.memo((props: TagPropsType) => {

    /*let createTag = (arr: Array<string>) => {
        let arrTitle = [...arr]
        for (let i = 0; i <= arrTitle.length - 1; i++) {
            let tagIndex = arrTitle[i].indexOf('#');
            if (arrTitle[i].includes('#')) {
                arrTitle[i] = arrTitle[i].slice(tagIndex, arrTitle[i].length)
            } else {
                delete arrTitle[i]
            }
        }
        return arrTitle
    }
    let arrTagsTitle = createTag(props.tasks.map(t => t.title))
    let filterTags = arrTagsTitle.filter((item, index) => arrTagsTitle.indexOf(item) === index)*/


    return (
        <>
            <li key={props.todolistId}>{props.tag.title}</li>
        </>
    )
})
