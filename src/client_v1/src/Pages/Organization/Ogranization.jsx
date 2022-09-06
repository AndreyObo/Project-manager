import '../../commonstyles.css'
import React, {useState, useEffect} from 'react';
import Loader from '../../Components/Loader/Loader'
import {GetAllOrg, GetTypeById, CreateOrg, DeleteOrgById} from '../../http/OrganizationApi'
import AddWindow from './AddWindow'
import {Columns, Rows} from './datasource'
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const Ogranization = () => {
    const [data, setData] = useState([]);
    const [orgid, setOrgid] = useState(-1)
    const [wmodal, setWmodal] = useState(false)
    const [fethcing, setFething] = useState(false)

    useEffect(()=>{FetchOrgs()}, [])
    //useEffect(()=>{FetchTypes()}, [])

    const FetchOrgs = async () => {
        const OrgList = await GetAllOrg()
        
        const list_data=[]

        for(let org of OrgList) {
            let org_type = await GetTypeById(org.orgTypeId)
            list_data.push({id:org.Id, title:org.Title,type:org_type.Type})
        }
        console.log("List data")
        console.log(list_data)
        setData(list_data)
        setFething(true)
    }

    const AddOrg = async (title,type) => {
        const res = await CreateOrg(title, type)
        if(res.Message =="DataError") {
            alert("Ошибка. Запиись не добавленна")
            return;
        }
        FetchOrgs()
        setWmodal(false)
    }

    const DeleteOrg = async (id)=> {
        if(id !=-1) {
        var res = await DeleteOrgById(id)
        FetchOrgs()
        }
    }

    return (
     <div className="Page">
         {wmodal ? <AddWindow AddCallback={AddOrg} AbortCallback={()=>setWmodal(false)}/>:<div/>}
         <div className="title"><h1>Организации</h1></div>
         <div className="gridwrap">

        {fethcing ?  <DataGrid
        className="datagrid"
        rows={data}
        columns={Columns}
        onCellClick={(e)=>setOrgid(e.id)}
        pageSize={10}
      /> : <Loader/>
      
      }
       
      </div>
      <div className="buttoncontaner">
          <button className="delbutton" onClick={()=>DeleteOrg(orgid)}>Удалить</button>
          <button  className="addbutton" onClick={()=>setWmodal(true)}>Добавить</button>
       
      </div>
     </div>
    );
  };
  
  export default Ogranization;