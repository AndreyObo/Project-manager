import '../../../commonstyles.css'
import '../style.css'
import React, {useEffect, useState}  from 'react';
import AddIcon from './add_ic.png'

const AddTaskCard = (props) => {
    const [Id, setId] = useState(-1)

    const CardClick = () => {
        if(props.MouseClick) {
            props.MouseClick(Id)
        }
    }

    useEffect(()=> {
        setId(props.Id)
    })

    return(
    <div onClick={CardClick} draggable='false' className="AddCard">
       <img src={AddIcon}></img>
    </div>
    );
}

export default AddTaskCard
