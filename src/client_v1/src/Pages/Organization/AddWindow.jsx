import '../../commonstyles.css'
import './style.css'
import React, {useEffect, useState}  from 'react';
import {GetAllOrgType} from '../../http/OrganizationApi'

const AddWindow = (props) => {
    const[types, setTypes] = useState([])
    const [oname, setOname] = useState(' ')
    const [listp, setListp] = useState(1)

    useEffect(()=>{FetchTypes()}, [])

    const FetchTypes = async () => { 
        const tp = await GetAllOrgType()
        setTypes(tp)
    }

return(
    <div className='ModalWindowWrap'>
      <div className="AddModalWindow">
           <h2>Добавить организацию</h2>
           <div className="MRow">
                     <div className='WRowTitle'>
                     <span >Название</span>
                     </div>
                     <div className='WRowInput'>
                     <input onChange={(e)=>setOname(e.target.value)} className='MyInput' type="text"></input>
                     </div>
                 </div>
                 <div className="MRow">
                 <div className='WRowTitle'>
                 <span >Направление</span>
                 </div>
                 <div className='WRowInput'>
                 <select onChange={(event)=>setListp(event.target.value)} value={listp} className="MySelect">
                 {types.map(item=> <option value={item.Id}>{item.Type}</option>)}
                 </select>
                 </div>
                 </div>
                 <div className="buttoncontaner">
      
                <button onClick={()=>props.AbortCallback()} className="whitebutton">Отмена</button>
                <button onClick={()=>props.AddCallback(oname, listp)}  className="whitebutton">Добавить</button>
                  </div>
      </div>
    </div>
);
}

export default AddWindow