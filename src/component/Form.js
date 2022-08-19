import React, { useRef } from 'react'
import classes from '../component/Form.module.css'
function Form({ fetchZapros }) {
    const divValue = useRef('')
    const onHandlerNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            value: divValue.current.value,
            id: Math.random().toString()
        }
        fetchZapros(newPost)
    }

    return (
        <form className={classes.form}>
            <input className={classes.input} ref={divValue} />
            <button className={classes.button} onClick={onHandlerNewPost}>add</button>
        </form>
    )
}

export default Form