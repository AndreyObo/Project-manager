import React from 'react';
import TaskIcon from './Task_ic.png'
import './style.css'

const DragIcon =(props) => {
    return(
        <div className='DragIcon' ref={props.Ref}>
            <img src={TaskIcon}/>
        </div>
    )
}

export default DragIcon