'use client'

import { useContext, useState } from "react";
import HomeDisp from "@/components/home_disp/home_disp";
import { UserContext } from "@/app/_contexts/user_name";

export default function Home(){
    const [curr, setCurr]=useState('Overview');
    const { userID, _ } = useContext(UserContext);
    
    return(
        <div className="h-full flex flex-col p-[1vw] max-sm:p-0">
            <div className="flex-1 flex justify-center flex-col items-center min-h-16 p-1 sm:hidden mb-3 mt-3">
                <div className="bg-[#1c1c1c] flex-1 flex justify-center items-center w-60 rounded-[40px]">
                    <button onClick={()=>{setCurr('Overview')}} 
                            className={`${curr=='Overview'?'bg-[#302d2d]':''} -mr-3 h-full flex justify-center items-center flex-1 rounded-[40px] font-light text-2xl`}>
                        Overview
                    </button>
                    <button onClick={()=>{setCurr('Today')}} 
                            className={`${curr=='Today'?'bg-[#302d2d]':''} h-full flex justify-center items-center flex-1 rounded-[40px] font-light text-2xl`}>
                        Today
                    </button>
                </div>
            </div>
            <div className="flex-[20] flex">
                <HomeDisp curr={curr}/><p className="text-[9vw] text-white"></p>
            </div>
        </div>
    );
}