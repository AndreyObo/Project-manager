import '../../../commonstyles.css'
import './style.css'
import React, {useState, useEffect}  from 'react';
import {FromInputToString} from '../../../Utils/DateMnager'
import {GetAllUsers} from '../../../http/UserApi'

const WMakeActive = (props) => {
    const [users, setUsers] = useState([]);
    const [Person, setPerson] = useState()

    useEffect(()=>{FetchUsers()}, [])


    const FetchUsers = async () => {
        const UsersList = await GetAllUsers()
        setUsers(UsersList)
    }

    

return(
    <div className="ModalWindowWrap">
             <div className="TaskAddModalWindow">
                 <h2>Взять задачу</h2>
                 <div className="MRow">
                     <div className='WRowTitle'>
                     <span>Ответственный</span>
                     </div>
                     <div className='WRowInput'>
                     <select onChange={e=>{setPerson(e.target.value) }} value={Person} className="MySelect">
                     <option disabled selected value> -- Выберете пользователя -- </option>
                       {users.map(user=> <option value={user.Name}>{user.Name}</option>)}
                    </select>
                     </div>
                 </div>
                
                 <div className="buttoncontaner">
      
      <button onClick={()=>{props.CloseCallback()}} className="whitebutton">Отмена</button>
      <button onClick={()=> {props.AddCallback(Person)}} className="whitebutton">Добавить</button>
  </div>
  </div>
  </div>
);
}

export default WMakeActive