import { host } from "./index";

export const GetAllUsers = async () => {
    const {data} = await host.get('/app/user/get_all')
    return data
}


export const GetUserById = async (id) => {
    const {data} = await host.get('/app/user/get_user', {params:{id}})
    return data
}


export const GetAllProfession = async () => {
    const {data} = await host.get('/app/proff/get_all')
    return data
}

export const DeleteById = async (id) => {
    const {data} = await host.delete('/app/user/delete', {params:{id}})
    return data
}

export const GetProfessionById = async (id) => {
    const {data} = await host.get('/app/proff/get_id', {params:{id}})
    return data
}

export const CreateUser = async (u_name, p_id, u_birthday) => {
    const {data} = await host.post('/app/user/create', {name:u_name, proff_id: p_id, birtday:u_birthday})
    return data
}
