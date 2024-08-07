'use client'

import { useState, useEffect } from "react";
import XSvg from '../../components/svg/x.jsx';
import CheckSvg from '../../components/svg/check.jsx';
import PlusSvg from '../../components/svg/plus.jsx';
import TrashSvg from '../../components/svg/trash.jsx';
import Link from "next/link.js";
import Drop from '../../components/drop_select/drop_select.jsx'
import Popup from "@/components/popup/popup.jsx";
import { useRouter } from "next/navigation";
import HeightLimit from "@/components/height_limit_scrollable/heightLimit.js";
import { Fragment } from "react";
import BasicDateTimeRangePicker from "@/components/date_range_picker/date_range_picker.jsx";

export default function Add(){
    const [tableData, setTableData]=useState([
        [
            null,
            null,
            null,
            null,
            null
        ]
    ]);

    const router=useRouter()
    const [saveCheck, setSaveCheck]=useState(null);
    const [hw,setHw]=useState("50vh");
    const smRatio=212;
    const lgRatio=0.1415;

    useEffect(()=>{
        HeightLimit({setHw, smRatio, lgRatio})
        return()=>{
            window.removeEventListener("resize",{});
        }
    },[])

    useEffect(()=>{
        if (saveCheck=="Save"){
            alert("saved");
            router.push('/dashboard/table')
        }else if(saveCheck=="Discard"){
            alert("discarded");
            router.push('/dashboard/table')
        }
    })

    const handleUpdate=({data,row,col})=>{
        var thirdparty=tableData;
        thirdparty[row][col]=data.label;
        setTableData(thirdparty);
    }

    const addRow=(index)=>{
        const thirdparty=tableData;
        setTableData(thirdparty.toSpliced(index,0,[null, null, null, null, null]));
    }

    const delRow=(index)=>{
        const thirdparty=tableData;
        setTableData(thirdparty.toSpliced(index,1))
    }
    const [criteria, setCriteria]=useState({value:75});
    const handleChange=(event)=>{
        let { value, min, max } = event.target;
        value= Math.max(Number(min), Math.min(Number(max), Number(value)));

        setCriteria({ value: value });
    }

    return(
        <div className="flex flex-col h-full pt-[3vw]">
            {/* <div className="flex-1"></div> */}
            <div className="sm:hidden flex mb-5 mt-2">
                <div className="rounded-full flex-1 flex justify-end items-center overflow-hidden mr-1">
                    <Popup compToPass={<div className="bg-[#1c1c1c] h-14 w-24 rounded-full flex justify-center items-center">Save</div>} setDesCheck={setSaveCheck} message={{message:"Are you sure you want to save the changes?", opt:["Cancel", "Save"]}}/>
                </div>
                <div className="rounded-full flex-1 flex justify-start items-center overflow-hidden ml-1">
                    <Popup compToPass={<div className="bg-[#2b1f1f] h-14 w-24 rounded-full flex justify-center items-center">Cancel</div>} setDesCheck={setSaveCheck} message={{message:"Are you sure you want to discard the changes?", opt:["Cancel", "Discard"]}}/>
                </div>
            </div>
            <form className="flex justify-center items-center flex-col">
                <div className="flex justify-center mb-[1vw]">
                    <input type="text" 
                       placeholder="Timetable Name"
                       className=" min-w-[15vw] pl-4 bg-black border-[#3a3a3a] hover:border-white border-[1px] mx-[1vw]" 
                       required
                    />
                    <p>Timetable Name<br/><span className="text-[#727272]">A name for your wonderful timetable.</span></p>
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center mx-[1vw]">
                        <BasicDateTimeRangePicker mssg={"Start date"}/>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <BasicDateTimeRangePicker mssg={"End date"}/>
                    </div>
                    <p className="max-w-[20vw]">Timetable duration.<br/><span className="text-[#727272]">Years? Months? Weeks? Days?</span></p>
                    <div className="flex flex-col justify-center items-center ml-[2vw] mr-[1vw]">
                        <button className="text-[1.5vw] text-[#727272] hover:text-white" onClick={handleIncrement}>+</button>
                        <input type="number" 
                            placeholder="75"
                            min='0'
                            max='100'
                            value={criteria.value}
                            onChange={handleChange}
                            className="no-scrollbar bg-black hover:border-white border-[#3a3a3a] border-[1px] min-h-[4vw] max-w-[4vw] text-center text-[2vw] rounded-full"
                        />
                        <button className="text-[1.5vw] text-[#727272] hover:text-white" onClick={handleDecrement}>-</button>
                    </div>
                    <p className="max-w-[20vw]">The Attendance criteria.<br/><span className="text-[#727272]">Every subject will have a minimum attendance criteria</span></p>
                </div>
            </form>
            <div className="flex justify-center">
                <table>
                    <thead>
                        <tr className="text-[4vw] text-[#737373] max-sm:text-4xl">
                            <th className="font-light w-[13vw] max-sm:w-[19.5vw]">Mon</th>
                            <th className="font-light w-[13vw] max-sm:w-[19.5vw]">Tue</th>
                            <th className="font-light w-[13vw] max-sm:w-[19.5vw]">Wed</th>
                            <th className="font-light w-[13vw] max-sm:w-[19.5vw]">Thu</th>
                            <th className="font-light w-[13vw] max-sm:w-[19.5vw]">Fri</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="flex flex-[9] justify-center " id="victim">
                {/* <div className="h-16 w-16"></div> */}
                <div className="overflow-auto no-scrollbar" style={{maxHeight:`${hw}`}}>
                    <table className="border-separate table-fixed w-[70.4vw] max-sm:w-full">
                        <tbody>
                            {tableData.map((rowVal, rowId)=>(
                                <Fragment key={rowId}>
                                    <tr className="w-[4.7vw] sm:h-[19.5vw] max-sm:w-full max-sm:h-10 sm:hidden">
                                        <td className="rounded-full sm:h-16 sm:w-16 flex flex-1 justify-center h-10 items-end overflow-hidden">
                                            <button onClick={()=>{addRow(rowId)}}><PlusSvg/></button>
                                        </td>
                                        <td className="w-[19.5vw]"></td>
                                        <td className="w-[19.5vw]"></td>
                                        <td className="w-[19.5vw]"></td>
                                        <td className="rounded-full sm:h-16 sm:w-16 flex flex-1 justify-center h-10 items-end overflow-hidden">
                                            <button onClick={()=>{delRow(rowId)}}><TrashSvg/></button>
                                        </td>
                                    </tr>
                                    <tr key={rowId} className="text-[1.5vw] font-light max-sm:text-lg">
                                        <td className="w-[4.7vw] flex flex-col justify-center items-end max-sm:hidden">
                                            <div className="rounded-full h-16 w-16 flex justify-center items-center overflow-hidden">
                                                <button onClick={()=>{addRow(rowId)}}><PlusSvg/></button>
                                            </div>
                                            <div className="rounded-full h-16 w-16 flex justify-center items-center overflow-hidden">
                                                <button onClick={()=>{delRow(rowId)}}><TrashSvg/></button>
                                            </div>
                                        </td>
                                        {Object.values(rowVal).map((cellValue, colIndex) => (
                                            <td key={colIndex} className={`h-[13vw] w-[13vw] max-sm:h-[19.5vw] max-sm:w-[19.5vw] text-center ${tableData[rowId][colIndex]==null?'hover:bg-[#202224] bg-[#0d0e0f]':'hover:bg-[#292b2e] bg-[#202224]'} border border-black`}>
                                                <div>
                                                    <Drop tableData={tableData} handleUpdate={handleUpdate} row={rowId} col={colIndex}/>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                </Fragment>
                            ))}
                            <tr className="text-[1.5vw] font-light">
                                <td className="max-sm:hidden"></td>
                                <td className='h-[13vw] w-[13vw] max-sm:h-[19.5vw] max-sm:w-[19.5vw] text-center border border-black flex'>
                                    <button className="hover:bg-[#202224] bg-[#0d0e0f] flex-1 max-sm:text-3xl max-sm:bg-[#202224]" onClick={()=>{addRow(tableData.length)}}>+</button>
                                </td>
                            </tr>
                            <tr className="h-[50vh]"></tr>
                        </tbody>
                    </table>
                </div>
                <div className="max-sm:hidden">
                    <div className="rounded-full h-16 w-16 flex justify-center items-center overflow-hidden">
                        <Popup compToPass={<CheckSvg/>} setDesCheck={setSaveCheck} message={{message:"Are you sure you want to save the changes?", opt:["Cancel", "Save"]}}/>
                    </div>
                    <div className="rounded-full h-16 w-16 flex justify-center items-center overflow-hidden">
                        <Popup compToPass={<XSvg/>} setDesCheck={setSaveCheck} message={{message:"Are you sure you want to discard the changes?", opt:["Cancel", "Discard"]}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}