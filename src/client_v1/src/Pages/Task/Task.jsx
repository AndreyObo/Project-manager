import '../../commonstyles.css'
import './style.css'
import React, {useEffect, useState, useRef}  from 'react';
import FreeTask from './Cards/FreeTask'
import ActiveTask from './Cards/ActiveTask'
import ProblemTask from './Cards/ProblemTask'
import WAddTask from './Window/WAddTask'
import WMakeActive from './Window/WMakeActive'
import AddTaskCard from './Cards/AddTask'
import WProblem from './Window/WProblem'
import DragIcon from './DragIcon'

const Task = () => {
    const item = useRef(null);

    const None=-1
    const FreeCell=0
    const ActiveCell=1

    const [IsDragg, setIsDragg] = useState(false)
    const [FreeTaskList, SetFreeTaskList] = useState([])
    const [ActiveTaskList, SetActiveTaskList] = useState([])
    const [ProblemTaskList, setProblemTaskList] = useState([])

    const [ShowAddTaskWindow, setShowAddTaskWindow] = useState(false)
    const [ShowAddActiveWindow, setShowAddActiveWindow] = useState(false)
    const [ShowProblemWindow, setShowProblemWindow] = useState(false)
    const [CurrentId, setCurrentId] = useState(1)

    const [FreeActionDrag, setFreeActionDrag] = useState(false)

    const [DraggCell, SetDraggCell] = useState({type:-1, id:null})

    useEffect(()=> {
        //<FreeTask Id='3' MouseDown={(id)=>{console.log('down on card'+id)}} Title="Купить заготовки" Deadline="26.06.1224"/>
        // SetFreeTaskList([
        //     {id:2, title:'task one'},
        //     {id:3, title:'task two'}
        // ])
        item.current.setAttribute(`style`, 'visibility: hidden');
    }, [])

    const ProblemTaskMouseUp =() => {
        if(DraggCell.type == ActiveCell) {
            setShowProblemWindow(true)
        }
        else {
          //  SetDraggCell({type:None, id:null})
        }
    }

    const AddToProblem = (problem) => {
        setShowProblemWindow(false)
        let date=' '
        let action = ' '
        let person = ' '
        for(let item of ActiveTaskList) {
            if(item.id == DraggCell.id) {
                date = item.d_line
                action = item.title
                person = item.Person
                break;
            }
        }

        setProblemTaskList([
            ...ProblemTaskList,
            {id:DraggCell.id, title:action, d_line:date,  Person:person, Problem:problem},
        ])

        SetActiveTaskList(
            ActiveTaskList.filter((item)=> {
                if(item.id != DraggCell.id) {
                    return item
                }
            })
        )
        
       //SetDraggCell({type:None, id:null})
    }

    const ActiveTaskMouseUp = ()=> {
      
        if(DraggCell.type == FreeCell) {
            setShowAddActiveWindow(true)
        }
        else {
           // SetDraggCell({type:None, id:null})
        }
        
    }

    const AddActiveTask =(_person) => {
        setShowAddActiveWindow(false)
        let date=' '
        let action = ' '
        for(let item of FreeTaskList) {
            if(item.id == DraggCell.id) {
                date = item.d_line
                action = item.title
                break;
            }
        }
        SetActiveTaskList([
            ...ActiveTaskList,
            {id:DraggCell.id, title:action, d_line:date,  Person:_person},
        ])

        SetFreeTaskList(
            FreeTaskList.filter((item)=> {
                if(item.id != DraggCell.id) {
                    return item
                }
            })
        )
        
       SetDraggCell({type:None, id:null})
    }

    const FreeTaskMouseDown = (id) => {
       
        SetDraggCell({type:FreeCell, id:id})
        setIsDragg(true)
    }

    const ActiveTaskMouseDown =(id) => {
        SetDraggCell({type:ActiveCell, id:id})
        setIsDragg(true)
    }

    const AddTask = (task, date) => {
       
        setShowAddTaskWindow(false)
        SetFreeTaskList(
            [
                ...FreeTaskList,
                {id:CurrentId, title:task, d_line:date}
            ]
        )
        setCurrentId(CurrentId+1)
        
    }

    const AbrotActiveTask =(id)=> {
        SetActiveTaskList(
            ActiveTaskList.filter((item)=> {
            if(item.id != id) {
                return item
            }
        })
        )
    }

    const MoveToActive =(id) => {
        for(let item of ProblemTaskList) {
            if(item.id == id) {
                SetActiveTaskList([
                    ...ActiveTaskList,
                    {
                        id:item.id,
                        title:item.title,
                        d_line:item.d_line,
                        Person:item.Person
                    }
                ])
            }
        }

        setProblemTaskList( 
            ProblemTaskList.filter((item)=> {
            if(item.id != id) {
                return item
            }
        }))
    }

    const PageMouseMove =(e)=> {
      
        //item.current.setAttribute('style', 'left:'+e.clientX+'px');
        if(IsDragg) {
             item.current.setAttribute(`style`, `visibility: visible; left: ${e.clientX}px; top:${e.clientY}px`);
        }
        
    }

    const PageMouseUp = ()=> {
        item.current.setAttribute(`style`, 'visibility: hidden');
        SetDraggCell({type:None, id:DraggCell.id})
        setIsDragg(false)
    }


    return(
        <div onMouseUp={PageMouseUp} onMouseMove={PageMouseMove} className="Page">
             {ShowAddTaskWindow ? <WAddTask AddCallback={AddTask} CloseCallback={()=>setShowAddTaskWindow(false)}/>:<div/>}
             {ShowAddActiveWindow ? <WMakeActive AddCallback={AddActiveTask} CloseCallback={()=>setShowAddActiveWindow(false)}/>:<div/>}
             {ShowProblemWindow ? <WProblem AddCallback={AddToProblem} CloseCallback={()=>setShowProblemWindow(false)}/> : <div/>}
             <div ref={item}></div>
              <DragIcon Ref={item}/>
            <div className="title"><h1>Доска задач (без сохранения в БД)</h1></div>
             <div className="taskcontainer">
                 <div className="tasklistwrap"><h3>Свободные задачи</h3><div className="tasklist">
                     {
                        FreeTaskList.map((item)=> <FreeTask Id={item.id} MouseDown={(id)=>FreeTaskMouseDown(id)} Title={item.title} Deadline={item.d_line}/>)
                     }
                     <AddTaskCard MouseClick={()=>setShowAddTaskWindow(true)}/>
                     </div>
                    </div>
                 <div  className="tasklistwrap"><h3>На исполнении</h3>
                 <div onMouseUp={ActiveTaskMouseUp} className="tasklist">
                    {
                        ActiveTaskList.map(
                            (item)=><ActiveTask Id={item.id} MouseDown={(id)=>ActiveTaskMouseDown(id)} AbortTask={AbrotActiveTask} Title={item.title} Person={item.Person} Deadline={item.d_line}/>
                        )
                    }
                 </div>
                 </div>
                 <div className="tasklistwrap"><h3>Проблемы</h3>
                 <div onMouseUp={ProblemTaskMouseUp} className="tasklist">
                 {
                        ProblemTaskList.map(
                            (item)=><ProblemTask 
                            Id={item.id}
                            AbortTask={MoveToActive} Title={item.title} 
                            Person={item.Person}
                            Problem={item.Problem}
                            Deadline={item.d_line}/>
                        )
                    }    
                </div></div>
             </div>
        </div>
    );
}

export default Task;