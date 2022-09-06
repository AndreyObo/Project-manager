import '../../../commonstyles.css'
import '../style.css'
import React, {useEffect, useState}  from 'react';

const FreeTask = (props) => {
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
    <div onMouseDown={CardClick} draggable='false' className="FreeCard">
        <h3>Задача</h3><span className='TaskText'>{props.Title}</span>
        <h3>Срок исполнения</h3><span className='TaskText'>{props.Deadline}</span>
    </div>
    );
}

export default FreeTask
