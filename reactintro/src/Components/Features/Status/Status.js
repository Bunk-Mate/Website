import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonField from './RewindTime.js'
import axios from 'axios';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../../constants/apiConstants.js';

export default function Status(props){
    console.log(props, 'hi from status')
    const data=[
    {
        "name": "history",
        "status": "present",
        "session_url": "http://127.0.0.1:8000/session/63171"
    },
    {
        "name": "geography",
        "status": "present",
        "session_url": "http://127.0.0.1:8000/session/63172"
    },
    {
        "name": "world history",
        "status": "present",
        "session_url": "http://127.0.0.1:8000/session/63173"
    },
    {
        "name": "US history",
        "status": "present",
        "session_url": "http://127.0.0.1:8000/session/63174"
    },
    {
        "name": "USn't history",
        "status": "present",
        "session_url": "http://127.0.0.1:8000/session/63174"
    },
    {
        "name": "UShis tory",
        "status": "present",
        "session_url": "http://127.0.0.1:8000/session/63174"
    },
    {
        "name": "UShertory",
        "status": "present",
        "session_url": "http://127.0.0.1:8000/session/63174"
    },
    {
        "name": "history",
        "status": "present",
        "session_url": "http://127.0.0.1:8000/session/63174"
    }
]
    // const data={"p0":{subject:"math",status:['grey','blue','blue'],url:"url1"},
    //             'p1':{subject:'physics',status:['grey','blue','blue'],url:"url1"},
    //             'p2':{subject:'chemistry',status:['grey','blue','blue'],url:"url1"},
    //             'p3':{subject:'english',status:['grey','blue','blue'],url:"url1"},
    //         }
    var [statState, setStatState]=useState(props)
    const color={
        present:["#DDDDDD","black"],
        absent:["#DDDDDD","black","red"],
        cancelled:["#F1F1F1","#BFBFBF"]
    }
    return(
        <>
        <div style={{display:"flex"}}>
            <h2 style={{paddingLeft:"10px", flex:"1"}}>Today's Courses</h2>
            <div style={{backgroundColor:"transparent", display:"flex", flex:"", alignItems:"center", justifyContent:"center"}}>
                <ButtonField/>
            </div>
            </div>
        <table style={{padding:"10px", width:"100%", borderCollapse:"separate", borderSpacing:"0px 4px"}}>
            <thead>
                <tr>
                    <th>Sub</th>
                    <th>Value</th>
                    <th>Helpme</th>
                </tr>
                <td colSpan="3" style={{backgroundColor:"black",}}></td>
            </thead>
            <tbody>
                {Object.keys(statState).map((key, index) => (
                    <>
                 console.log(count)   {/* {statState[key].status==='cancelled'?
                    <tr style={{backgroundColor:"transparent", color:"#BFBFBF"}} key={index}> 
                        <td style={{backgroundColor:'#F1F1F1', textAlign:"center", borderTopLeftRadius:"20px", borderBottomLeftRadius:"20px"}}>P{key}</td>
                        <td style={{backgroundColor:'#F1F1F1'}}>{statState[key].name}</td>
                        <td style={{backgroundColor:"#F1F1F1", borderTopRightRadius:"20px", borderBottomRightRadius:"20px"}}>
                            <div style={{display:"flex", flexDirection:"column"}}>
                                <button style={{backgroundColor:'transparent', border:"none", borderRadius:"20px", padding:"4px"}} onClick={()=>setStatState({...statState,[key]:{...statState[key], status:'present'}})}>Present</button>
                                <button style={{backgroundColor:'transparent', border:"none", borderRadius:"20px", padding:"4px"}} onClick={()=>setStatState({...statState,[key]:{...statState[key], status:'absent'}})}>Absent</button>
                                <button style={{backgroundColor:'#DDDDDD', border:"none", borderRadius:"20px", padding:"4px"}} onClick={()=>setStatState({...statState,[key]:{...statState[key], status:'cancelled'}})}>Canceled</button>
                            </div>
                        </td>
                    </tr>
                    : */}
                    <tr style={{backgroundColor:"transparent"}} key={index}> 
                        <td style={{backgroundColor:color[statState[key].status][0], color:color[statState[key].status][1], textAlign:"center", borderLeft:"1px", borderTopLeftRadius:"20px", borderBottomLeftRadius:"20px"}}>P{key}</td>
                        <td style={{backgroundColor:color[statState[key].status][0], color:color[statState[key].status][1],}}>{statState[key].name}</td>
                        <td style={{backgroundColor:color[statState[key].status][0], color:color[statState[key].status][1], borderTopRightRadius:"20px", borderBottomRightRadius:"20px"}}>
                            <div style={{display:"flex", flexDirection:"column"}}>
                                <button style={{backgroundColor:statState[key].status==='present'?'rgb(100,255,10)':'transparent', border:"none", borderRadius:"20px", padding:"4px"}} onClick={()=>setStatState({...statState,[key]:{...statState[key], status:'present'}})}>Present</button>
                                <button style={{backgroundColor:statState[key].status==='absent'?'red':'transparent', border:"none", borderRadius:"20px", padding:"4px"}} onClick={()=>setStatState({...statState,[key]:{...statState[key], status:'absent'}})}>Absent</button>
                                <button style={{backgroundColor:statState[key].status==='cancelled'?'#DDDDDD':'transparent', border:"none", borderRadius:"20px", padding:"4px"}} onClick={()=>setStatState({...statState,[key]:{...statState[key], status:'cancelled'}})}>Canceled</button>
                            </div>
                        </td>
                    </tr>
                    {/* } */}
                    </>
                ))}
            </tbody>
        </table>
    </>
    )
}

