import { ACCESS_TIMETABLE_NAME } from '@/app/_utils/apiConstants';
import chroma from 'chroma-js';
import { useState, useEffect } from 'react';

export default function Graph({ statData, threshold, setThreshold }) {
   const f = chroma.scale(['red', 'yellow', 'green']);
   const handleGraphWidth = (key) => {
      if (parseInt(key.percentage) < 75) {
         return parseInt(key.percentage).toString().concat('%');
      } else {
         return '100%';
      }
   };
   useEffect(() => {
      if (sessionStorage.getItem(ACCESS_TIMETABLE_NAME) != null) {
         setThreshold(
            JSON.parse(sessionStorage.getItem(ACCESS_TIMETABLE_NAME)).threshold
         );
      }
   }, []);

   useEffect(() => {
      //console.log(threshold, 'updates')
      //console.log(statData,'here is statData')
   }, [threshold]);
   useEffect(() => {
      // console.log(threshold, 'updates')
      //console.log(statData,'here is statData')
   }, [statData]);

   return (
      <div className="my-[2vw] h-full w-full">
         {statData.map((key, value) => (
            <div
               key={value}
               className="mb-[2vw] flex flex-1 flex-col text-[1.5vw]"
            >
               <div className="flex items-center">
                  <div className="mr-9 min-w-[4.6vw] max-sm:m-0 max-sm:min-w-16 max-sm:text-2xl">
                     {key.name.slice(0, 4)}
                  </div>
                  {parseInt(key.percentage) > threshold ? (
                     <div className="flex h-[10vh] flex-1">
                        <div className="flex flex-1 items-center justify-start rounded-[5vh] bg-[#55eb50] max-sm:flex-[3] max-sm:justify-end sm:mr-[-10vh]">
                           <p className="flex h-[10vh] items-center justify-center p-6 text-[2.5vw] font-extralight text-black max-sm:hidden max-sm:text-3xl">
                              0
                           </p>
                           <p className="p-6 text-[2.5vw] font-extralight text-black max-sm:text-3xl sm:hidden">
                              {threshold}
                           </p>
                        </div>
                        {/* <div className='h-[10vh] w-[10vh] flex flex-col items-center justify-center bg-[#55eb50] rounded-e-full'>
                                    <p className='text-black text-[2.5vw] font-extralight p-6 max-sm:text-3xl'>75</p>
                                </div> */}
                        <div className="flex flex-[3] max-sm:flex-[5]">
                           <div
                              id="graph"
                              className="flex h-[10vh] items-center justify-center rounded-[5vh] bg-emerald-600"
                              style={{
                                 minWidth: (4 * (parseInt(key.percentage) - 75))
                                    .toString()
                                    .concat('%'),
                                 backgroundColor: f(
                                    0.01 *
                                       4 *
                                       (
                                          parseInt(key.percentage) - 75
                                       ).toString()
                                 ),
                              }}
                           >
                              <p className="flex h-[10vh] w-[10vh] items-center justify-center rounded-full bg-[#55eb50] bg-opacity-20 p-6 text-left text-[2.5vw] font-extralight text-black max-sm:hidden max-sm:text-3xl">
                                 {threshold}
                              </p>
                              <p className="flex-1 p-6 text-right text-[2.5vw] font-extralight text-black max-sm:text-3xl">
                                 {key.percentage}
                              </p>
                           </div>
                           <div className="flex-1"></div>
                        </div>
                     </div>
                  ) : (
                     <div className="flex flex-1">
                        <div className="flex-1 max-sm:flex-[3]">
                           <div
                              className="flex h-[10vh] min-w-[9.5vh] flex-col items-end justify-center rounded-[5vh] bg-red-500"
                              style={{
                                 maxWidth: (key.percentage * 2)
                                    .toString()
                                    .concat('%'),
                              }}
                           >
                              <p className="p-6 text-[2.5vw] font-extralight text-black max-sm:text-3xl">
                                 {key.percentage}
                              </p>
                           </div>
                        </div>
                        <div className="flex-[3] max-sm:flex-[5]"></div>
                     </div>
                  )}
                  <div className="mx-5 text-center text-[2.5vw] max-sm:text-3xl sm:font-thin">
                     {key.bunks_available}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
