import './style.css'
import '../../commonstyles.css'
import React, {useState, useEffect} from 'react';
import Loader from '../../Components/Loader/Loader'
import {Columns, Rows} from './datasource'
import {GetAllUsers, CreateUser, GetAllProfession, GetProfessionById, DeleteById} from '../../http/UserApi'
import {GetAllOrgType} from '../../http/OrganizationApi'
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import 'antd/dist/antd.min.css'
import { DatePicker, Space } from 'antd';

import {FromInputToString} from '../../Utils/DateMnager'


const Users = () => {
    const [data, setData] = useState(Rows);
    const [modaladd, setModaladd] = useState(false)
    const [uname, setUname] = useState(' ')
    const [ubirthday, setUbirthday] = useState(' ')
    const [proff, setProff] = useState([])
    const [listp, setListp] = useState(2)
    const [selid, setSelid] = useState(-1)
    const [fethcing, setFething] = useState(false)

    useEffect(()=>{FetchUsers()}, [])
    useEffect(()=>{FetchProff()}, [])

    function handleChange(value) {
        console.log(`selected is${value}`);
    }
    const onchange = (event) => {
        setListp(event.target.value)
        console.log(event.target.value)
      };

      const FetchProff = async () => { 
          const pr = await GetAllProfession()
          setProff(pr)
      }

      const GetProff = async (id) => {
          const proff_name= await GetProfessionById(id)
          console.log(proff_name)
          return proff_name.Title
      }
     
    {/*Извлечение сотрудников из базы*/}
     const FetchUsers = async () => {
        const UsersList = await GetAllUsers()
       
        const list_data=[]

        for(let user of UsersList) {
            let proff = await GetProff(user.professionId)
            list_data.push({  id:user.Id,
                name:user.Name,
                proffesion:proff,
                birthday:user.Birthday})
        }
      

        setData(list_data)
        setFething(true)
    }

    {/*Создание сотрудника*/}
    const CreateNewUser = async ()=> {
     
        var dt = FromInputToString(ubirthday) 
        const res = await CreateUser(uname, listp, dt)
        if(res.Message =="DataError") {
            alert("Ошибка. Запиись не добавленна")
            return;
        }
        setModaladd(false)
        FetchUsers()
        console.log(res)
    }

    {/*Удаление сотрудника*/}
    const DeleteUser = async (id)=> {
        if(id !=-1) {
        var res = await DeleteById(id)
        if(res.Message=="ActiveUser") {
            alert("Пользователь зарегистрирован в проектах!")
            return
        }
        FetchUsers()
        }
    }


    return (
     <div className="Page">
         {modaladd ? <div className="ModalWindowWrap">
             <div className="UAddModalWindow">
                 <h2>Добавить сотрудника</h2>
                 <div className="MRow">
                     <div className='WRowTitle'>
                     <span >Имя</span>
                     </div>
                     <div className='WRowInput'>
                     <input onChange={e=> setUname(e.target.value)} className='MyInput' type="text"></input>
                     </div>
                 </div>
                 <div className="MRow">
                 <div className='WRowTitle'>
                 <span >Должность</span>
                 </div>
                 <div className='WRowInput'>
                 <select onChange={onchange} value={listp} className="MySelect">
                     {proff.map(item=> <option value={item.Id}>{item.Title}</option>)}
</select>
</div>
                 </div>
                 <div className="MRow">
                    <div className='WRowTitle'><span>Дата рождения</span></div>
                     
                     <div className='WRowInput'> <input required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" onChange={e=>setUbirthday(e.target.value)} type="date" className='MyData'></input></div>
                 </div>
                 <div className="buttoncontaner">
      
      <button onClick={()=>setModaladd(false)} className="whitebutton">Отмена</button>
      <button onClick={()=>CreateNewUser()} className="whitebutton">Добавить</button>
  </div>
             </div>
         </div> : <div/>}
         <div className="None"></div>
         <div className="title"><h1>Сотрудники</h1></div>
         <div className="gridwrap">
         {fethcing ? <DataGrid 
         className="datagrid"
         rows={data}
         columns={Columns}
         onCellClick={(e)=>setSelid(e.id)}
         pageSize={10}/> :
         <Loader/>

         }
        
      </div>
      <div className="buttoncontaner">
          <button onClick={()=>DeleteUser(selid)} className="delbutton">Удалить</button>
          <button onClick={()=>setModaladd(true)} className="addbutton" onChange={()=>console.log('gdfgfdg')}>Добавить</button>
       
      </div>

     </div>
    );
  };
  
  export default Users;