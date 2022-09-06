import '../../../commonstyles.css'
import './style.css'
import React, {useState}  from 'react';
import {FromInputToString} from '../../../Utils/DateMnager'

const WAddTask = (props) => {
    const [Task, setTask] = useState(' ')
    const [Deadline, setDeadline] = useState(' ')


return(
    <div className="ModalWindowWrap">
             <div className="TaskAddModalWindow">
                 <h2>Добавить задачу</h2>
                 <div className="MRow">
                     <div className='WRowTitle'>
                     <span>Задача</span>
                     </div>
                     <div className='WRowInput'>
                     <input onChange={e=> {setTask(e.target.value)}} className='MyInput' type="text"></input>
                     </div>
                 </div>
                
                 <div className="MRow">
                    <div className='WRowTitle'><span>Срок исполнения</span></div>
                     
                     <div className='WRowInput'> <input required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" onChange={e=>{setDeadline(e.target.value)}} type="date" className='MyData'></input></div>
                 </div>
                 <div className="buttoncontaner">
      
      <button onClick={()=>{props.CloseCallback()}} className="whitebutton">Отмена</button>
      <button onClick={()=> {props.AddCallback(Task, FromInputToString(Deadline))}} className="whitebutton">Добавить</button>
  </div>
  </div>
  </div>
);
}

export default WAddTask