import '../../commonstyles.css'
import './style.css'
import React, {useEffect, useRef, useState}  from 'react';
import {FromInputToString, FromInputToTime, FromTimeToDate, FromDateToString, FromStringToIso} from '../../Utils/DateMnager'
import {GetAllUsers} from '../../http/UserApi'
import {GetAllOrg} from '../../http/OrganizationApi'

const AddWindow = (props) => {
    const Delusers = useRef([])
    const [editmode, setEditMode] = useState(false)

   // const [pagetitle, setPagetitle] = useState('')
    const [editid, setEditid] = useState(-1)
    const [name, setName] = useState('')
    const [manager, setManager] = useState(true)
    const [choseorgs, SetChoseorgs] = useState(true)
    const [groupe, setGroupe] = useState([])
    const [startdate, setStartdate] = useState('')
    const [finishdate, setFinishdate] = useState('')
    const [descript, setDescript] = useState(' ')

    const [users, setUsers] = useState([]);
    const [orgs, setOrgs] = useState([])

    const [selwguser, setSelwguser] = useState(null)

    const [wguser, setWguser] = useState(-1)

    useEffect(()=> {
      //  if(props.Mode == 'New') {
       //     setPagetitle("Создать проект")
     //   }
        if(props.Mode == 'Edit') {
            setEditMode(true)
           // setPagetitle("Редактировать проект")
         //   console.log('Рабочая группа')
            console.log(props.TemplateProject.wglist)
            setEditid(props.TemplateProject.id)
            setName(props.TemplateProject.name)
            SetChoseorgs(props.TemplateProject.org)
            setManager(props.TemplateProject.manager)
            setGroupe(props.TemplateProject.wglist)
            setDescript(props.TemplateProject.discript)

          //  console.log(FromStringToIso(props.TemplateProject.startdate))
          //  console.log(FromStringToIso(props.TemplateProject.finishdate))
           setStartdate(FromStringToIso(props.TemplateProject.startdate))
           setFinishdate(FromStringToIso(props.TemplateProject.finishdate))
           // setGroupe([...groupe, {id:wguser.Id, name:wguser.Name}])
        }
    },[])

    useEffect(()=>{FetchUsers()}, [])
    useEffect(()=>{FetchOrgs()}, [])


    const FetchUsers = async () => {
        const UsersList = await GetAllUsers()
        setUsers(UsersList)
    }

    const FetchOrgs = async () => {
        const OrgList = await GetAllOrg()
        setOrgs(OrgList)
    }

    const CreateProj = () => {
     //  var d = FromInputToTime(startdate)
       const Project = {
           Name:name,
           Manager:manager,
           Organization:choseorgs,
           Groupe:groupe.map(item=>item.id),
           StartDate:FromInputToTime(startdate),
           FinishDate:FromInputToTime(finishdate),
           Description:descript
       }
       props.AddProjectCallback(Project)
    }

    const UpdateProject =() => {
        const Project = {
            id:editid,
            Name:name,
            Manager:manager,
            Organization:choseorgs,
            Groupe:groupe.map(item=>item.id),
            StartDate:FromInputToTime(startdate),
            FinishDate:FromInputToTime(finishdate),
            DelItems:Delusers.current,
            Description:descript
        }
        props.UpdateProjectCallback(Project)
    }

    const AddGropueUser =()=> {
        if(wguser == null) {
            alert("Пользователь не выбран!")
            return
        }
        let exist = false
        groupe.forEach(item=>{
              if(item.id == wguser.Id)
              {
                  alert("Сотрудник уже в рабочей группе")
                  exist = true
                  return
              }
            })
        if(!exist) {
         setGroupe([...groupe, {id:wguser.Id, name:wguser.Name}])
        }
   
    }

    const SetWgSel =(event) => {
        let name =  event.nativeEvent.target[event.nativeEvent.target.selectedIndex].text
        let id = event.target.value
        console.log(name)
        console.log(id)
        setWguser({Id:id, Name: name})
      //  console.log(wguser)
    }

    const DelWg =() => {
        let arr = groupe.filter(function( obj ) {
            return obj.id != selwguser;
        });
        
        if(!Delusers.current.includes(selwguser)) {
           Delusers.current.push(selwguser)
        }
        setGroupe(arr)
    }

return(
    <div className='ModalWindowWrap'>
      <div className="ProjModalWindow">
           <h2>{editmode ? <span>Редактировать проект</span> : <span>Новый проект</span>}</h2>
           <div className="MRow">
                     <div className='WRowTitle'>
                     <span >Название проекта</span>
                     </div>
                     <div className='WRowInput'>
                     <input onChange={e=> setName(e.target.value)} value={name} className='MyInput' type="text"></input>
                     </div>
                 </div>
                 <div className="MRow">
                    <div className='WRowTitle'>
                    <span>Организация</span>
                    </div>
                    <div className='WRowInput'>
                    <select onChange={(e)=>SetChoseorgs(e.target.value)} value={choseorgs} className="MySelect">
                    <option disabled selected value> -- Выберете организацию -- </option>
                     {orgs.map(item=> <option value={item.Id}>{item.Title}</option>)}
                    </select>
                     </div>
                 </div>
                 <div className="MRow">
                    <div className='WRowTitle'>
                    <span>Руководитель проекта</span>
                    </div>
                    <div className='WRowInput'>
                     <select onChange={e=>{setManager(e.target.value) }} className="MySelect">
                     <option disabled selected value> -- Выберете пользователя -- </option>
                       {users.map(user=> <option value={user.Id}>{user.Name}</option>)}
                    </select>
                     </div>
                 </div>
                 <div className="MRow">
                    <div className='WRowTitle'>
                    <span>Рабочая группа</span>
                    </div>
                    <div className='WRowInput'>
                        <div className="WGBox">
                            <div className="UserSelecter">
                                <select onChange={e=>{SetWgSel(e)}} className="WGMySelect">
                                       <option disabled selected value> -- Выберете пользователя -- </option>
                                       {users.map(user=> <option value={user.Id}>{user.Name}</option>)}
                               </select>
                               <button onClick={AddGropueUser} className="whitebutton">Добавить</button>
                            </div>
                        
                         <select onChange={(e)=>setSelwguser(e.target.value)} multiple className="MyListBox">
                            {groupe.map(item=> <option value={item.id}>{item.name}</option>)}
                    
                        </select>
                        <div onClick={DelWg} className="PDelB"><button className="whitebutton">Удалить</button></div>
                        </div>
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
                    <div className='WRowTitle'><span>Описание</span></div>
                     
                     <div className='WRowInput'><textarea value={descript} onChange={e=>setDescript(e.target.value)} className='DescriptInput' type="text"></textarea></div>
                 </div>
            
               

                 <div className="buttoncontaner">
      
                <button onClick={()=>props.AbortCallback()} className="whitebutton">Отмена</button>
                <button onClick={()=>editmode ? UpdateProject() : CreateProj()} className="whitebutton">
                   {editmode ? <span>Сохранить</span> : <span>Создать</span>}
                    </button>
                  </div>
      </div>
    </div>
);
}

export default AddWindow