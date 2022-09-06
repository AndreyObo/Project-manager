/*Общие стили*/
import '../../commonstyles.css'
/*Стили для этой страницы*/
import './style.css'
import './gridstyle.css'
import React, {useState, useEffect, useRef } from 'react';
import {Columns, StepColumns, WgColumns} from './datasource'
/*Класс анимированного статуса загрузки*/
import Loader from '../../Components/Loader/Loader'
/*Модальные окна*/
import PWindow from './PWindow'
import ChartWindow from './ChartWindow'
import BreakPointsWindow from './BreakPointsWindow'
import {GetProfessionById, GetUserById} from '../../http/UserApi'
import {GetAllProj, GetProjBreakpoints, CreateProject, DeleteProjectById, UpdateProject} from '../../http/ProjectApi'
import {AddUserToWg, GetUsersByProjId, DeleteById, DbId} from '../../http/WorkGroupeApi'
import {GetOrgById} from '../../http/OrganizationApi'
import {CreateBreakpoint, DeleteBreakpointById, UpdateBreakpoint} from '../../http/BreakpointApi'
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
/*Класс для конвертации разных форматов дат*/
import {FromInputToString, FromInputToTime, FromTimeToDate, FromDateToString, FromTimeToString} from '../../Utils/DateMnager'
/*Класс глобальных констант приложения*/
import {Mode, Status} from '../../Utils/Global'
 /*Класс для создания списка без повторений*/
import {HashTable} from '../../Utils/HashTable'
/*Класс для работы с docx*/
import {DocxManager} from '../../Utils/DocxManager'


const Projects = () => {

    const myValRef = useRef(null);

    const actionColumn = [
        {
          field: "action",
          headerName: "Статус",
          width: 200,
          renderCell: (params) => {
            return (
                <div className="statusCell">
              <div className={GetStatusClass(params.row.status)}></div>{params.row.status}

              </div>
            );
          },
        },
      ];


    const GetStatusClass =(status) => {
        if(status ==Status.Active) {
            return 'active'
        }
        if(status ==Status.Denied) {
            return 'denied'
        }
        if(status ==Status.Done) {
            return 'done'
        }
    }

    const UsersHash = useRef(null)
    const OrgsHash = useRef(null)


    const OrgIdTable = useRef([]);
    const UserIdTable = useRef([]);

    const [bpmode, setBpmode] = useState('')
    const [tbpoint, setTbpoint] = useState(null)

    const [mode, setMode] = useState('')
    const [tproj, setTproj] = useState(null)

    const [wguse, setWguse] = useState(null)

    {/*id активного проекта*/}
    const [selproject, setSelproject] = useState(-1)
    const [showmodal, setShowmodal] = useState(false)
    const [showchart, setShowchart] = useState(false)

     {/*id выбранного этапа*/}
    const [selbpoint, setSelbpoint] = useState(-1)

    const [projects, setProjects] = useState([])
    const [bpoints, setBpoints] = useState([])
    const [wgroup, setWgroup] = useState([])
    const [projfetch, setProjfetch] = useState(true)
    const [pointsfetch, setPointsfetch] = useState(false)

    const [modal, setModal] = useState(false)

    {/*Извлечение проектов с сервера при рендере компонента*/}
    useEffect(()=>{FetchProjects()},[])

     {/*Сохранение в docx*/}
    const CreateDocx =()=> {
        if(selproject == -1) {
            alert("Проект не выбран")
            return
        }
         {/*Создаем экземпляр своего класса для работы с docx*/}
        const manager = new DocxManager()
         {/*Передаем этапы для создания таблицы*/}
        manager.GenerateRows(bpoints)
        let org_id = tproj.org
        let user_id = tproj.manager
        {/*Передаем нименования организаций и пользователей из наших кэшированных списков по id*/}
        manager.CreateDocx({...tproj,
             org:OrgsHash.current.GetValue(org_id),
             manager:UsersHash.current.GetValue(user_id)
            }) 
    }

     {/*Функия для создания новго проекта*/}
    const CreateNewProject = async(project) => {
        const res_id = await CreateProject(project)
        for(let user_id of project.Groupe) {
            await AddUserToWg(res_id, user_id)
        }
        setShowmodal(false)
        FetchProjects()
    }

     {/*Функия обновления проекта*/}
    const UpdateProjectContent = async(project)=> {
        console.log(project.DelItems)
        const res_id = await UpdateProject(project)
        for(let del_id of project.DelItems) {
          //   console.log("p - "+ project.id+"u - "+del_id)
            const r =  await DbId(project.id, del_id)
         
         }
        for(let user_id of project.Groupe) {
            console.log(project.Groupe)
            await AddUserToWg(project.id, user_id)
        
        }
        await FetchWg(project.id)

        setShowmodal(false)
        FetchProjects()
    }

     {/*Функция удаления проекта*/}
    const DeleteProject =async () => {
        if(bpoints.length !=0) {
            alert("В проекте есть этапы. Удаление отменено.")
            return
        }
        if(selproject ==-1) {
            alert("Проект не выбран.")
            return
        }
        let res = await DeleteProjectById(selproject)
        await FetchProjects()
        setSelproject(-1)
    }

     {/*Извлечение проектов с сервера*/}
    const FetchProjects = async () => {
        const ProjectList = await GetAllProj()
        
        {/*Создаем экземпляры своих классов для работы с унакальными кэш списками. 
        Значения в список добавляются в виде ключ-значение (id - наименование), 
        повторяющиеся значения игнорируются. Впоследствии список используеться для 
        минимизирования обращений к серверу за наименование организаций и сотрудников, 
        в других компонентах     
    */}
        UsersHash.current = new HashTable()
        OrgsHash.current = new HashTable()
    
        console.log(UsersHash.current.Get())

      
        const list_data=[]
        OrgIdTable.current = []

        for(let project of ProjectList) {
            let sdata = FromTimeToString(project.StartData)
         
            let edata = FromTimeToString(project.FinishData)

            let mainus = await GetUserById(project.MainUsersId)
            UsersHash.current.Add(mainus.Id, mainus.Name)
            let org = await GetOrgById(project.organizationId)
            OrgsHash.current.Add(org.Id, org.Title)
            
            list_data.push({  
                id:project.Id,
                name:project.ProjectName,
                organization:org.Title,
                manager: mainus.Name,
                startdate:sdata,
                finishdate:edata,
                discript:project.Description
            })
        }

        setProjects(list_data)
        setProjfetch(false)
    }

     {/*При выборе проекта в функции извлекаем с сервера этапы и рабочую группу*/}
    const FetchData = async (e) => {
      
    
        setSelproject(e.id)
         {/*Извлекаем рабочую группу*/}
        await FetchWg(e.id)
         {/*Извлекаем этапы*/}
        await FetchBreackpoints(e.id)
     

        let gr = []
        for(let us of myValRef.current) {
            gr.push({id:us.Id, name:us.Name})
        }
     
        {/*Сохраняем информация о выбранном проекте, при дальнейшей надобности, 
           воспользуемся этим значением без обращения к серверу
    */}
        setTproj({
            id:e.id,
            name:e.row.name,
            org:OrgsHash.current.GetId(e.row.organization),
            manager:UsersHash.current.GetId(e.row.manager),
            startdate:e.row.startdate,
            finishdate:e.row.finishdate,
            discript:e.row.discript,
            wglist:gr
        })
    }

    const FetchWg =async (pid) => {
        const users = await GetUsersByProjId(pid)
        myValRef.current = users
        let list =[]
      
        for(let item of users) {
          
            let proff = await GetProfessionById(item.professionId)
            list.push({id:item.Id, Name:item.Name, Proff:proff.Title})
        }
        setWgroup(list)
       
    }

    const FetchBreackpoints = async (projectid) => {
        setPointsfetch(true)
     
        const breakpoints = await GetProjBreakpoints(projectid)
     
        let list=[]
        for(let point of breakpoints) {
            list.push({
                id:point.Id,
                discription:point.Description,
                startdata:FromTimeToString(point.StartData),
                finishdata:FromTimeToString(point.FinishData),
                status:point.Status
            })
        }
        setBpoints(list)
        setPointsfetch(false)
    }

     {/*Показать модальное окно создания нового проекта*/}
    const NewProjectWindow =() => {
        setMode('New')
        setShowmodal(true)
    }

     {/*Показать модальное окно редактирования проекта*/}
    const EditProjectWindow =() => {
        if(selproject ==-1) {
            alert("Проект не выбран")
            return
        }
        setMode('Edit')
     
        setShowmodal(true)
    }

     {/*Создание этапа, логика открытия окна и валидации в inlline функции обработчика нажатия кнопки*/}
    const CrateStep = async (step)=> {
       
        const res = await CreateBreakpoint({...step, pid:selproject})
        FetchBreackpoints(selproject)
        setModal(false)
    }

     {/*Обновление этапа*/}
    const UpdateStep = async (step)=> {
       
         const res = await UpdateBreakpoint({...step, pointid:selbpoint})
         console.log(res)
         FetchBreackpoints(selproject)
         setModal(false)
     }

    {/*callback функция для кнопки отмены, модального окна создания этапа*/}
    const AbortStepW =() => {
        setModal(false)
    }

     {/*Удаление этапа*/}
    const DeleteBPoint = async()=> {
        if(selbpoint ==-1) {
            alert("Этап не выбран")
            return
        }
        
        const res = await DeleteBreakpointById(selbpoint)
        FetchBreackpoints(selproject)
    }

     {/*Показать диаграмму ганта*/}
    const ShowGant = () =>{
        if(selproject ==-1) {
            alert("Проект не выбран.")
            return
        }
        if(bpoints.length ===0) {
            alert("В проекте нет этапов.")
            return
        }
        setShowchart(true)
    }

    return(
        <div className="Page">
             {/*Блок с компонентами модальных окон*/}

             {/*Окно с диаграммой*/}
            {showchart ?
            <ChartWindow Project={tproj} BreakPoinst={bpoints} ChartCloseCallback={()=> setShowchart(false)}/> : 
            <div/>
            }

            {/*Окно для создания/редактирования этапов*/}
            {modal ? <BreakPointsWindow Mode={bpmode}
              TemplateBreakpoint={tbpoint} 
              CrateStepCallback={CrateStep}
              UpdateStepCallbak={UpdateStep}
              AbortStepCallback={AbortStepW}/>
              : <div/>
              }

            {/*Окно для создания/редактирования проектов*/}

            {showmodal ? <PWindow Mode={mode}
             TemplateProject={tproj} 
             AddProjectCallback={CreateNewProject} 
             UpdateProjectCallback={UpdateProjectContent} 
             AbortCallback={()=>setShowmodal(false)}/> : <div/>}

             <div className="title"><h1>Проекты</h1></div>
             <div className="MainWrap">
           
                 <div className="PTable">
    {/*Таблица проектов, пока проекты не загруженны отображаем индикатор загрузки*/}
                 { projfetch ? <Loader/>
      :
      <DataGrid
      className="datagrid"
      rows={projects}
      columns={Columns}
      onCellClick={(e)=>FetchData(e)}
      pageSize={10}
      rowsPerPageOptions={[5, 10, 20]}
    />
                }
                 </div>
                 <div className="BStack">
                 <button onClick={CreateDocx} className="projbutton">Скачать</button>
                  <button onClick={ShowGant} className="projbutton">График</button>
                  <button onClick={EditProjectWindow} className="projbutton">Редактировать</button>
                  <button onClick={DeleteProject} className="projbutton">Удалить</button>
                  <button onClick={NewProjectWindow} className="projaddbutton">Добавить</button>
                 </div>
             </div>
             <div className="BottomPanel">
             <div className="BPLeft">
             <div className="title"><h2>Этапы проекта</h2></div>
            
                 {/*Таблица этапов*/}
                     {pointsfetch?<Loader/>
                     :
                     <div className="PointTableWrap">
                 <DataGrid
                    className="datagrid"
                    rows={bpoints}
                    columns={StepColumns.concat(actionColumn)}
                    onCellClick={(e)=>{
                        setSelbpoint(e.id)
                        setTbpoint({
                            step:e.row.discription,
                            sdate:e.row.startdata,
                            fdate:e.row.finishdata,
                            status:e.row.status
                        })
                    }}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    />
                    
                    </div>
            }
            <div className="buttoncontaner">
                 <button onClick={()=>{
                      if(selbpoint==-1) {
                          alert("Вы не выбрали этап")
                      }
                      else {
                      setBpmode(Mode.Edit)
                      setModal(true)
                      }
                      }} className="projbutton">Редактировать</button>
                  <button onClick={DeleteBPoint} className="projbutton">Удалить</button>
                  <button onClick={()=>{
                      if(selproject==-1) {
                          alert("Вы не выбрали проект")
                      }
                      else {
                      setBpmode(Mode.Create)
                      setModal(true)
                      }
                      }} className="projaddbutton">Добавить</button>

                 </div>
                 </div>
                 <div className="BPRight"><div className="title"><h2>Рабочая группа</h2></div>
                 <div className="PointTableWrap">
                {/*Таблица рабочей группы*/}
                 <DataGrid
                    className="datagrid"
                    rows={wgroup}
                    columns={WgColumns}
                    onCellClick={(e)=>console.log(e.id)}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    />
                    </div>
                 </div>
                 </div>
               
        </div>
    );
    }

export default Projects