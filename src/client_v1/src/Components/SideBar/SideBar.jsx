
import React, {useRef, useState} from 'react';
/*Импортируем готовые иконки*/
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EditIcon from '@mui/icons-material/Edit';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddTaskIcon from '@mui/icons-material/AddTask';

import MenuIcon from '@mui/icons-material/Menu';
import Menu from '../Menu/Menu'
import './sidebar.css'

const SideBar = () => {
    const [style, setStyle] = useState('Container')
    const MenuToggle = ()=> {
        if(style == 'Container') {
            setStyle('ContainerHide')
        }
        else if(style == 'ContainerHide') {
            setStyle('Container')
        }
    }
    {/*Массив пунктов меню*/}
    const items = [
        {id:1, text:"Сотрудники", link:"/users", icon: ()=><PeopleAltIcon/>},
        {id:2, text:"Организации", link:"/orgs", icon: ()=><ApartmentIcon/>},
        {id:3, text:"Проекты", link:"/proj", icon: ()=><DashboardIcon/>},
        {id:4, text:"Задачи", link:"/tasks", icon: ()=><AddTaskIcon/>},
       
    ]
    return (
        <div className={style}>
        <div >
           <Menu Items={items}/> {/*Создание меню*/}
        </div>
        <div className="MenuButtonWrap">
        <button onClick={MenuToggle} className="MenuButton"><MenuIcon/></button>
        </div>
        </div>
    );
  };
  
  export default SideBar;