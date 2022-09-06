import { host } from "./index";

export const GetAllProj = async () => {
    const {data} = await host.get('/app/projects/get_all')
    return data
}

export const CreateProject = async (project) => {
    const {data} = await host.post('/app/projects/create', {
        name: project.Name,
        orgid: project.Organization,
        muserid: project.Manager,
        sdata: project.StartDate,
        fdata: project.FinishDate,
        description: project.Description

    })
    return data
}

export const UpdateProject = async (project) => {
    const {data} = await host.post('/app/projects/update', {
        id:project.id,
        name: project.Name,
        orgid: project.Organization,
        muserid: project.Manager,
        sdata: project.StartDate,
        fdata: project.FinishDate,
        description: project.Description

    })
    return data
}
export const GetProjBreakpoints = async (pid) => {
    const {data} = await host.get('/app/breakpoints/get',{params:{proj_id:pid}})
    return data
}

export const DeleteProjectById =async(pid) => {
    const {data} = await host.delete('/app/projects/delete',{params:{id:pid}})
    return data
}

