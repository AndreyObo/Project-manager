import { host } from "./index";

export const CreateBreakpoint = async (breakpoint) => {
    const {data} = await host.post('/app/breakpoints/add', {projectid: breakpoint.pid, 
        description:breakpoint.title,
        startd: breakpoint.stdate,
        finishd: breakpoint.fhdate,
        status: breakpoint.sstatus
    })
    return data
}

export const DeleteBreakpointById = async (id) => {
    const {data} = await host.delete('/app/breakpoints/delete', {params:{id}})
    return data
}

export const UpdateBreakpoint = async (breakpoint) => {
    const {data} = await host.post('/app/breakpoints/update', {id: breakpoint.pointid, 
        description:breakpoint.title,
        startd: breakpoint.stdate,
        finishd: breakpoint.fhdate,
        status: breakpoint.sstatus
    })
    return data
}