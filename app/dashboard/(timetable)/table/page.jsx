'use client';

import { useState, useEffect, useContext } from 'react';
import EditSvg from '@/components/svg/edit.jsx';
import TrashSvg from '@/components/svg/trash.jsx';
import Link from 'next/link.js';
import Popup from '@/components/popup/popup.jsx';
import HeightLimit from '@/components/height_limit_scrollable/heightLimit.js';
import { useRouter } from 'next/navigation';
import { TimetableContext } from '@/app/_contexts/timetable.js';

export default function Table() {
   const { timetable } = useContext(TimetableContext);
   const [delCheck, setDelCheck] = useState(null);
   const [maxHeight, setMaxHeight] = useState('50vh');
   const smRatio = 170;
   const lgRatio = 0.1415;

   const router = useRouter();

   useEffect(() => {
      if (delCheck == 'Delete') {
         router.push('/add');
      }
   }, [delCheck]);

   useEffect(() => {
      56;
      HeightLimit({ setHw: setMaxHeight, smRatio, lgRatio });
      return () => {
         window.removeEventListener('resize', {});
      };
   }, []);

   return (
      <div className="flex h-full flex-col pt-[3vw] max-sm:pt-4">
         {/* Mobile Options */}
         <div className="max-sm:flex max-sm:justify-center sm:hidden">
            <Link
               href={{
                  pathname: '/dashboard/edit',
                  query: { data: JSON.stringify(timetable) },
               }}
               className="flex items-center justify-center overflow-hidden rounded-full max-sm:mx-3 sm:h-16 sm:w-16"
            >
               <EditSvg />
            </Link>
            <button className="flex items-center justify-center overflow-hidden rounded-full max-sm:mx-3 sm:h-16 sm:w-16">
               <Popup
                  compToPass={<TrashSvg />}
                  setDecisionCheck={setDelCheck}
                  message={{
                     message: 'Are you sure you want to delete the timetable?',
                     opt: ['Cancel', 'Delete'],
                  }}
               />
            </button>
         </div>

         {/* Timetable Header */}
         <div className="flex justify-center max-sm:mt-3 max-sm:items-end sm:flex-1">
            <table>
               <thead>
                  <tr className="text-[4vw] text-[#737373] max-sm:text-4xl">
                     {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                        <th
                           key={day}
                           className="w-[13vw] font-light max-sm:w-[19.5vw]"
                        >
                           {day}
                        </th>
                     ))}
                  </tr>
               </thead>
            </table>
         </div>
         <div className="flex flex-[9] justify-center" id="victim">
            <div id="fake-buttons" className="h-16 w-16 max-sm:hidden"></div>

            {/* TimeTable Body */}
            <div
               className="no-scrollbar overflow-auto"
               style={{ maxHeight: `${maxHeight}` }}
            >
               <table className="border-separate">
                  <tbody>
                     {timetable.map((rowVal, rowId) => (
                        <tr
                           key={rowId}
                           className="text-[1.5vw] font-light max-sm:text-lg"
                        >
                           {Object.values(rowVal).map((cellValue, colIndex) => (
                              <td
                                 key={colIndex}
                                 className={`h-[13vw] w-[13vw] text-center ${!timetable[rowId][colIndex] ? 'hover:bg-[#0e0e0f]' : 'bg-[#202224] hover:bg-[#292b2e]'} border border-black max-sm:h-[19.5vw] max-sm:w-[19.5vw]`}
                              >
                                 <div className="flex h-full flex-wrap items-center justify-center break-all">
                                    {timetable[rowId][colIndex]}
                                 </div>
                              </td>
                           ))}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Desktop Options */}
            <div className="max-sm:hidden">
               <button
                  className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full"
                  title="Edit timetable"
               >
                  <Link href={'/dashboard/edit'}>
                     <EditSvg />
                  </Link>
               </button>
               <button
                  className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full"
                  title="Delete current timetable and make a new one"
               >
                  <Popup
                     compToPass={<TrashSvg />}
                     setDecisionCheck={setDelCheck}
                     message={{
                        message:
                           'Are you sure you want to delete the timetable?',
                        opt: ['Cancel', 'Delete'],
                     }}
                  />
               </button>
            </div>
         </div>
      </div>
   );
}
