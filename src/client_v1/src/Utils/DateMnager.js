
export const FromInputToString =  (idate) => {
    var sdate = idate.slice(8,10)+"."+idate.slice(5,7)+"."+idate.slice(0,4)
    return sdate
}

export const FromInputToTime =  (idate) => {
    let year = idate.slice(0,4)
    let month = idate.slice(5,7)
    let day = idate.slice(8,10)

    let date = new Date(year, month-1, day)
  //  console.log("Created date------>"+date)
    return date.getTime()
}

export const FromTimeToDate = (time) => {
    let date = new Date(time)
    return date
}

export const FromTimeToString =(time) => {
    let t = Number(time)
    let date = new Date(t)
   // console.log("time - "+t+" date =>"+date)
    let year = date.getFullYear()
    let month = date.getMonth()+1
    if(month <= 9) {
        month = '0'+month
    }
    let day = date.getDate()
    if(day <= 9) {
        day ='0'+day
    }

    let sdate = day+'.'+month+'.'+year
    return sdate
}

export const FromStringToIso = (date) => {
    let year = date.slice(6,10)
    let month = Number(date.slice(3,5))
    let day = Number(date.slice(0,2))
    //console.log("d - "+day+"m - "+month +" y - "+year)

     let cdate = new Date(year, month-1, day+1)
     return cdate.toISOString().substring(0,10);
}

export const FromDateToIso = (date) => {
    return date.toISOString().substring(0,10);
}

export const FromStringToDate = (date) => {
    let year = date.slice(6,10)
    let month = Number(date.slice(3,5))
    let day = Number(date.slice(0,2))
    //console.log("d - "+day+"m - "+month +" y - "+year)

     let cdate = new Date(year, month-1, day+1)
     return cdate
}

export const FromDateToString = (date) => {
    let year = date.getFullYear()
    let month = date.getMonth()+1
    if(month < 9) {
        month = '0'+month
    }
    let day = date.getDate()
    if(day < 9) {
        day ='0'+day
    }

    let sdate = day+'.'+month+'.'+year
    return sdate
}


export const AddDate =(date, days) => {
    let ndate = date
    ndate.setDate(date.getDate()+days)
    return ndate
}

