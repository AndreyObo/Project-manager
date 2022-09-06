import '../../../commonstyles.css'
import './style.css'
import React, {useState}  from 'react';
import {FromInputToString} from '../../../Utils/DateMnager'

const WProblem = (props) => {
    const [Problem, setProblem] = useState(' ')


return(
    <div className="ModalWindowWrap">
             <div className="TaskAddModalWindow">
                 <h2>Добавить в проблемы</h2>
                 <div className="MRow">
                     <div className='WRowTitle'>
                     <span>Описание проблемы</span>
                     </div>
                     <div className='WRowInput'>
                     <input onChange={e=> {setProblem(e.target.value)}} className='MyInput' type="text"></input>
                     </div>
                 </div>
            
                 <div className="buttoncontaner">
      
      <button onClick={()=>{props.CloseCallback()}} className="whitebutton">Отмена</button>
      <button onClick={()=> {props.AddCallback(Problem)}} className="whitebutton">Добавить</button>
  </div>
  </div>
  </div>
);
}

export default WProblem