import '../../commonstyles.css'
import './style.css'
import React, {useEffect, useRef, useState}  from 'react';
import {FromStringToIso, FromStringToDate, AddDate, FromDateToIso} from '../../Utils/DateMnager'
import {Status} from '../../Utils/Global'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
//import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import Moment from 'moment';
import 'moment/locale/ru';
import { CollectionsOutlined } from '@mui/icons-material';
Moment.locale('ru');

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const WhiteColor='rgb(255, 255, 255)'
const RedColor='rgb(255, 0, 0)'
const GreenColor='rgb(0, 255, 0)'
const YellowColor='rgb(230, 255, 0)'


const ChartWindow =(props) => {

  //const [lables, setLables] = useState([])
 // const [projdata, setProjdata] = useState([])
  const [source, setSource] = useState({})
  const [renderchart, setRenderchart ] = useState(false)
  const [opt, setOpt] = useState({})

  const options = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        min:'2022-02-01',
        type: 'time',
      
        adapters: {
          type: 'time',
         
          time: {
            unit: 'day',
           
          }
        }
      },
      y: {
        display: true,
        padding: {top: 30, left: 0, right: 0, bottom: 0},
    }
    },
       
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display:false,
        position: 'right',
       
      },
      title: {
        display: false,
        text: 'План график',
      },
    },
  };

  useEffect(()=> {
    let lbl =[]
    let pdata = []
    //options
    let op = {
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          min: FromStringToIso(props.Project.startdate),
          type: 'time',
        
          adapters: {
            type: 'time',
           
            time: {
              unit: 'day',
             
            }
          }
        },
        y: {
          display: true,
          padding: {top: 30, left: 0, right: 0, bottom: 0},
      }
      },
         
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        tooltip: {
          enabled: false
        },
        legend: {
          display:false,
          position: 'right',
         
        },
        title: {
          display: false,
          text: 'План график',
        },
      },
    }

    setOpt(op)
    //end options


    let bg =[]
    lbl.push("Старт проекта")
    bg.push(WhiteColor)
    let sd = AddDate(FromStringToDate(props.Project.startdate), 1)
    pdata.push([FromStringToIso(props.Project.startdate), FromDateToIso(sd)])
    for(let bpoint of props.BreakPoinst) {
      lbl.push(bpoint.discription)
      pdata.push([FromStringToIso(bpoint.startdata), FromStringToIso(bpoint.finishdata)])
      switch(bpoint.status) {
        case Status.Active:
           bg.push(YellowColor)
          break
        case Status.Denied:
          bg.push(RedColor)
          break;
          case Status.Done:
            bg.push(GreenColor)
            break;
            default:
              bg.push(WhiteColor)
              break
      }
    }
    lbl.push("Финиш проекта")
    bg.push(WhiteColor)
    let fd = AddDate(FromStringToDate(props.Project.finishdate), 1)
    pdata.push([FromStringToIso(props.Project.finishdate), FromDateToIso(fd)])

    const ps ={
      labels:lbl,
      datasets: [
        {
          label: 'Dataset 1',
          data: pdata,
          backgroundColor:  bg,
          borderColor: 'rgba(255, 99, 132, 0.5)',
        },
       
      ],
    }

    console.log(ps)
    setSource(ps)

   // setLables(lbl)
    //setProjdata(pdata)
   // console.log(lbl)
  //  console.log(pdata)
     setRenderchart(true)
  },[])
  

  const labels = ['Разработка плана \s графика проекта и доработка проекта', 'Этап 2', 'Этап 3', 'Этап 4', 'Этап 5'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [['2022-03-02','2022-03-15'],['2022-03-01','2022-02-12'],['2022-03-23','2022-03-02'], ['2022-03-23','2022-03-02'], ['2022-03-23','2022-03-02']],
        backgroundColor: ['rgb(255, 99, 132)','rgb(100, 59, 34)','rgb(89, 99, 32)','rgb(75, 99, 132)','rgb(55, 97, 32)'],
        borderColor: 'rgba(255, 99, 132, 0.5)',
      },
     
    ],
  };

    return(
        <div className='ModalWindowWrap'>
            <div className="ChartModalWindow">
            <h2>План график проекта</h2>
            <div className="ChartWrap">
              {renderchart ? <Bar options={opt} data={source} />
              :
              <div/> }
            
            </div>
            <div className="buttoncontaner">
               <button onClick={()=>props.ChartCloseCallback()} className="whitebutton">Закрыть</button>
             </div>
            </div>
        </div>
    );
}

export default ChartWindow