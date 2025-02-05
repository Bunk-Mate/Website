import { useState } from 'react';
import CurvedArrowHead from '../../app/_assets/curved_arrowhead_white.png';
import Image from 'next/image';

export default function MinSubAttendance({ criteria, setCriteria }) {
   const handleChange = (event) => {
      let { value, min, max } = event.target;
      value = Math.max(Number(min), Math.min(Number(max), Number(value)));

      setCriteria({ value: value });
   };
   const handleIncrement = () => {
      setCriteria((prevState) => ({ value: prevState.value + 1 }));
   };
   const handleDecrement = () => {
      setCriteria((prevState) => ({ value: prevState.value - 1 }));
   };
   return (
      <div className="flex items-center">
         <div className="ml-[2vw] mr-[1vw] flex flex-col items-center justify-center max-sm:flex-1">
            <button
               type="button"
               className="-my-2 text-[1.5vw] text-[#727272] hover:text-white"
               onClick={handleIncrement}
            >
               <Image
                  src={CurvedArrowHead}
                  className="-rotate-90"
                  height={50}
               />
            </button>
            <input
               type="number"
               id="criteria"
               placeholder={75}
               min="0"
               max="100"
               value={criteria.value}
               onChange={handleChange}
               className="no-scrollbar min-h-[4vw] max-w-[4vw] rounded-full border-[1px] border-[#3a3a3a] bg-black text-center hover:border-white max-sm:min-h-20 max-sm:min-w-20 max-sm:text-3xl sm:text-[2vw]"
            />
            <button
               type="button"
               className="-my-2 text-[1.5vw] text-[#727272] hover:text-white"
               onClick={handleDecrement}
            >
               <Image src={CurvedArrowHead} className="rotate-90" height={50} />
            </button>
         </div>
         <p className="max-sm:flex-[2] sm:max-w-[20vw]">
            The Attendance criteria.
            <br />
            <span className="text-[#727272]">
               Every subject will have a minimum attendance criteria
            </span>
         </p>
      </div>
   );
}
