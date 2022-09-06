import { host } from "./index";

export const GetAllOrg = async () => {
    const {data} = await host.get('/app/org/get_all')
    return data
}

export const GetOrgById = async (id) => {
    const {data} = await host.get('/app/org/get_org', {params:{id}})
    return data
}

export const CreateOrg = async (o_name, t_id) => {
    const {data} = await host.post('/app/org/create', {title:o_name, org_type_id:t_id})
    return data
}

export const GetTypeById = async (id) => {
    const {data} = await host.get('/app/orgtype/get_id', {params:{id}})
    return data
}

export const GetAllOrgType = async () => {
    const {data} = await host.get('/app/orgtype/get_all')
    return data
}

export const DeleteOrgById = async (id) => {
    const {data} = await host.delete('/app/org/delete', {params:{id}})
    return data
}
