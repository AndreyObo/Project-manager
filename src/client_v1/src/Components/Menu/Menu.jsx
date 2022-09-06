
import { Link } from "react-router-dom";
import {React,useEffect, useState, useMemo} from 'react';
import {useNavigate } from 'react-router-dom'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import './style.css'

const Menu = (props) => {
    const [Pos, setPos] = useState(50)
    const [Cur, setCur] = useState(1)
    const [move, setMove] = useState(false)
 
    const navigate = useNavigate() 


   {/*Функция анимации маркера меню*/}
    const DivClick =(id, link) => {
        if(move == true) {
            return
        }
        {/*Устанавливаем состояние движения, теперь до мента прибытия маркера к выбранному пункту его нельзя изменть*/}
        setMove(true) 
        
        navigate(link)
        var counter = 0
        var cur_pos = Pos
        var target = cur_pos+((id - Cur)*50)
        let timer =setInterval(()=> {
            if(cur_pos == target) {
                clearInterval(timer)
                setCur(id)
                setMove(false)
                return
            }
            if(id > Cur) {
            cur_pos +=1
            }
            if(id < Cur) {
                cur_pos -=1
            }
            setPos(cur_pos)
            counter++
        }, 1)
    }

    return (
        <div>
        <div style={{"position": "absolute", "top": Pos,  "z-index":"1",  "width": "7px",  "background": "#0076DF", "height":"50px"}} ></div>
        <div className="menucontainer">
        {/*Разворачиваем пункты меню*/}
        { props.Items.map(item=> 
            <div className="item" onClick={()=>DivClick(item.id, item.link)}>{item.icon()}<span className="mtitle">{item.text}</span></div>
        )}
       
        </div>
       
        </div>
    );
  };
  
  export default Menu;