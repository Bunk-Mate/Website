import { ACCESS_TIMETABLE_NAME } from '@/app/_utils/api_constants';
import chroma from 'chroma-js';
import { useEffect } from 'react';

export default function Graph({ statData, threshold, setThreshold }) {
   const f = chroma.scale(['red', 'yellow', 'green']);

   useEffect(() => {
      if (sessionStorage.getItem(ACCESS_TIMETABLE_NAME) != null) {
         setThreshold(
            JSON.parse(sessionStorage.getItem(ACCESS_TIMETABLE_NAME)).threshold
         );
      }
   }, []);

   return (
      <div className="my-[2vw] flex size-full flex-col max-sm:gap-y-3">
         {statData.map((key, value) => (
            <div key={value} className="mb-[2vw] flex flex-col text-[1.5vw]">
               <div className="group flex max-sm:flex-col sm:items-center">
                  {/* Sub Name */}
                  <div className="mr-9 flex min-w-[4.6vw] max-sm:m-0 max-sm:min-w-16 max-sm:text-2xl">
                     {/* Desktop */}
                     <p className="flex max-sm:hidden">
                        {key.name.slice(0, 4)}
                        <span className="hidden opacity-0 transition-opacity duration-200 group-hover:block group-hover:opacity-100">
                           {key.name.slice(4)}
                        </span>
                     </p>

                     {/* Mobile */}
                     <p className="flex-1 sm:hidden">
                        <span className="">{key.name}</span>
                     </p>
                     <div className="flex text-[2.5vw] max-sm:text-3xl sm:hidden sm:font-thin">
                        {key.bunks_available}
                        <p className="ml-4 text-[1.5vw] leading-[2vw] max-sm:ml-1 max-sm:text-sm max-sm:leading-4">
                           bunks
                           <br />
                           left
                        </p>
                     </div>
                  </div>

                  {/* Progress Bar */}
                  {parseInt(key.percentage) > threshold ? (
                     <div className="flex flex-1 sm:h-[10vh]">
                        <div className="flex flex-1 items-center justify-start rounded-[5vh] bg-[#55eb50] max-sm:flex-[3] max-sm:justify-end sm:mr-[-10vh]">
                           <p className="flex items-center justify-center text-[2.5vw] font-extralight text-black max-sm:hidden max-sm:text-3xl sm:h-[10vh] sm:p-6">
                              0
                           </p>
                           <p className="text-[2.5vw] font-extralight text-black max-sm:p-3 max-sm:text-3xl sm:hidden sm:p-6">
                              {threshold}
                           </p>
                        </div>
                        {/* <div className='h-[10vh] w-[10vh] flex flex-col items-center justify-center bg-[#55eb50] rounded-e-full'>
                                    <p className='text-black text-[2.5vw] font-extralight p-6 max-sm:text-3xl'>75</p>
                                </div> */}
                        <div className="flex flex-[3] max-sm:flex-[5]">
                           <div
                              id="graph"
                              className="flex items-center justify-center rounded-[5vh] bg-emerald-600 sm:h-[10vh]"
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
                              <p className="flex w-[10vh] items-center justify-center rounded-full bg-[#55eb50]/20 text-left text-[2.5vw] font-extralight text-black max-sm:hidden max-sm:text-3xl sm:h-[10vh] sm:p-6">
                                 {threshold}
                              </p>
                              <p className="flex-1 text-right text-[2.5vw] font-extralight text-black max-sm:p-3 max-sm:text-3xl sm:p-6">
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
                              className="flex min-w-[9.5vh] flex-col items-end justify-center rounded-[5vh] bg-red-500 sm:h-[10vh]"
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

                  {/* Desktop Bunks */}
                  <div className="mx-5 text-center text-[2.5vw] max-sm:hidden max-sm:text-3xl sm:font-thin">
                     {key.bunks_available}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
