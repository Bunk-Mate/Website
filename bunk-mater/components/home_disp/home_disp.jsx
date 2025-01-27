import { useState, useEffect } from 'react';
import Statusman from '@/components/statusman/statusman';
import Data from '@/components/statistics/data';

export default function HomeDisp({ curr }) {
   const [smWind, setSmWind] = useState();
   const [refreshCont, setRefreshCont] = useState();
   useEffect(() => {
      setSmWind(window.innerWidth < 640);
      window.addEventListener('resize', () => {
         setTimeout(() => {
            if (window.innerWidth < 640) {
               setSmWind(true);
            } else {
               setSmWind(false);
            }
         }, 100);
      });
      //console.log('home_disp')
   }, []);
   return (
      <div className="flex flex-1 overflow-hidden">
         {smWind != undefined ? (
            smWind == true ? (
               curr == 'Today' ? (
                  <div className="mx-[1px] flex-[4] bg-[#1c1c1c] px-5 max-sm:rounded-t-[40px] max-sm:px-3 max-sm:pt-5">
                     <Statusman />
                  </div>
               ) : (
                  <div className="mx-[1px] flex flex-[9] bg-[#1c1c1c] max-sm:m-0 max-sm:rounded-t-[40px]">
                     <Data />
                  </div>
               )
            ) : (
               <>
                  <div className="mx-[1px] flex-[4] rounded-[20px] bg-[#1c1c1c] px-5">
                     <Statusman
                        setRefreshCont={setRefreshCont}
                        refreshCont={refreshCont}
                     />
                  </div>
                  <div className="mx-[1px] flex flex-[9] rounded-[20px] bg-[#1c1c1c]">
                     <Data refreshCont={refreshCont} />
                  </div>
               </>
            )
         ) : (
            <></>
         )}
      </div>
   );
}
