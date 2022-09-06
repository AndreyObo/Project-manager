import '../../../commonstyles.css'
import '../style.css'
import React, {useEffect, useState}  from 'react';

const ActiveTask = (props) => {
    const [Id, setId] = useState(0)

    const CardClick = () => {
        if(props.MouseDown) {
            props.MouseDown(Id)
        }
    }

    useEffect(()=> {
        setId(props.Id)
    })

    return(
    <div onMouseDown={CardClick} draggable='false' className="Active">
        <h3>Задача</h3><span className='TaskText'>{props.Title}</span>
        <h3>Срок исполнения</h3><span className='TaskText'>{props.Deadline}</span>
        <h3>Ответственный</h3><span className='TaskText'>{props.Person}</span>
        <button onClick={()=>props.AbortTask(Id)}>Снять задачу</button>
    </div>
    );
}

export default ActiveTask
