import { host } from "./index";

export const AddUserToWg = async (pid, uid) => {
    const {data} = await host.post('/app/workgroup/add', {progid:pid, userid:uid})
    return data
}

export const GetUsersByProjId = async (pid) => {
    const {data} = await host.get('/app/workgroup/get', {params:{id:pid}})
    return data
}
    
    export const DeleteById = async (pid, uid) => {
        console.log("from api - "+pid+" - "+uid)
        const {data} = await host.delete('/app/workgroup/delete', {progid: pid, userid: uid})
        return data
    }

    export const DbId = async (pd, ud) => {
        const {data} = await host.delete('/app/workgroup/del', {params:{pid:pd, uid:ud }})
        return data
    }
    