'use client';

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import BasicDatePicker from './rewind';
import Status from './status';
import HeightLimit from '../height_limit_scrollable/heightLimit';
import { useRouter } from 'next/navigation';

export default function Statusman({ setRefreshCont, refreshCont }) {
   const [dateCurr, setDateCurr] = useState(dayjs());
   const [hw, setHw] = useState('50vh');
   const smRatio = 258.1;
   const lgRatio = 0.13;
   const router = useRouter();

   // useEffect(()=>{
   //     console.log("Here is datequer ", dateQuer)
   // },[dateQuer])

   useEffect(() => {
      HeightLimit({ setHw, smRatio, lgRatio });
      //console.log('statusman')
      return () => {
         window.removeEventListener('resize', {});
      };
   }, []);

   let month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
   ][dateCurr.month()];

   useEffect(() => {
      month = [
         'Jan',
         'Feb',
         'Mar',
         'Apr',
         'May',
         'Jun',
         'Jul',
         'Aug',
         'Sep',
         'Oct',
         'Nov',
         'Dec',
      ][dateCurr.month()];
   }, [dateCurr]);

   function renderSwitch(param) {
      if (Math.floor(param / 10) == 1) return 'th';
      else {
         switch (param % 10) {
            case 1:
               return 'st';
            case 2:
               return 'nd';
            case 3:
               return 'rd';
            default:
               return 'th';
         }
      }
   }

   function handleDateDisp() {
      if (dateCurr.format('DD-MM-YYYY') !== dayjs().format('DD-MM-YYYY')) {
         return (
            <>
               {dateCurr.date()}
               <span className="font-extralight text-[rgba(125,125,125,1)]">
                  {renderSwitch(dateCurr.date() % 100)} {month}
               </span>
            </>
         );
      } else {
         return 'Today';
      }
   }
   return (
      <div className="flex h-full flex-col">
         <div className="flex items-center justify-center max-sm:mb-3">
            <div className="flex-1">
               <span className="text-[4vw] font-light max-sm:text-6xl">
                  {handleDateDisp()}
               </span>
            </div>
            <div className="flex items-center justify-end">
               <BasicDatePicker dateCurr={dateCurr} setDateCurr={setDateCurr} />
            </div>
         </div>
         <div className="flex flex-1 pt-[0.5px]" id="victim">
            <Status
               dateCurr={dateCurr}
               refreshCont={refreshCont}
               setRefreshCont={setRefreshCont}
               hw={hw}
            />
         </div>
      </div>
   );
}
