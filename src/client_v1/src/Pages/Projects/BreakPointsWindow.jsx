import '../../commonstyles.css'
import './style.css'
import React, {useEffect, useRef, useState}  from 'react';
import {FromInputToTime, FromStringToIso} from '../../Utils/DateMnager'
import {Status, Mode} from '../../Utils/Global'

const BreakPointsWindow = (props) => {
    const [editmode, setEditMode] = useState(false)
    const [steptitle,setSteptitle] = useState('')
    const [startdate, setStartdate] = useState('')
    const [finishdate, setFinishdate] = useState('')
    const [status, setStatus] = useState(Status.Active)

    useEffect(()=> {
        if(props.Mode ==Mode.Edit) {
            setEditMode(true)
          //  console.log(props.TemplateBreakpoint)
           setSteptitle(props.TemplateBreakpoint.step)
           setStartdate(FromStringToIso(props.TemplateBreakpoint.sdate))
           setFinishdate(FromStringToIso(props.TemplateBreakpoint.fdate))
           setStatus(props.TemplateBreakpoint.status)
        }
    },[])

    const CreateStep =() => {
        let step = {
            title:steptitle,
            stdate:FromInputToTime(startdate),
            fhdate:FromInputToTime(finishdate),
            sstatus:status
        }
        if(editmode) {
            props.UpdateStepCallbak(step)
        }
        else {
            props.CrateStepCallback(step)
        }
    }

    return(
        <div className='ModalWindowWrap'>
            <div className="BreakModalWindow">
            <h2>{editmode ? <span>Редактировать этап</span> : <span>Новый этап</span>}</h2>
            <div className="MRow">
                     <div className='WRowTitle'>
                     <span >Название этапа</span>
                     </div>
                     <div className='WRowInput'>
                     <input onChange={e=> setSteptitle(e.target.value)} value={steptitle} className='MyInput' type="text"></input>
                     </div>
                 </div>
            <div className="MRow">
                    <div className='WRowTitle'><span>Дата начала</span></div>
                     
                     <div className='WRowInput'><input value={startdate} onChange={e=>setStartdate(e.target.value)} required type="date" className='MyData'></input></div>
            </div>
            <div className="MRow">
                  <div className='WRowTitle'><span>Дата завершения</span></div>
                     
                     <div className='WRowInput'> <input value={finishdate} onChange={e=>setFinishdate(e.target.value)} required type="date" className='MyData'></input></div>
                 </div>   
            <div className="MRow">
                    <div className='WRowTitle'>
                    <span>Статус</span>
                    </div>
                    <div className='WRowInput'>
                     <select onChange={e=>{setStatus(e.target.value) }} value={status} className="MySelect">
                         <option value={Status.Active}>{Status.Active}</option>
                         <option value={Status.Done}>{Status.Done}</option>
                         <option value={Status.Denied}>{Status.Denied}</option>
                    </select>
                     </div>
            </div>
      <div className="buttoncontaner">
      <button onClick={()=>props.AbortStepCallback()} className="whitebutton">Отмена</button>
      <button onClick={CreateStep} className="whitebutton">
          {editmode ? <span>Сохранить</span> : <span>Создать</span>}
          </button>
      </div>
            </div>
        </div>
    );
}

export default BreakPointsWindow