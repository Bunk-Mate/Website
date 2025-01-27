'use client';

import { useContext, useState } from 'react';
import HomeDisp from '@/components/home_disp/home_disp';
import { UserContext } from '@/app/_contexts/user_name';

export default function Home() {
   const [curr, setCurr] = useState('Overview');
   const { userID, _ } = useContext(UserContext);

   return (
      <div className="flex h-full flex-col p-[1vw] max-sm:p-0">
         <div className="mb-3 mt-3 flex min-h-16 flex-1 flex-col items-center justify-center p-1 sm:hidden">
            <div className="flex w-60 flex-1 items-center justify-center rounded-[40px] bg-[#1c1c1c]">
               <button
                  onClick={() => {
                     setCurr('Overview');
                  }}
                  className={`${curr == 'Overview' ? 'bg-[#302d2d]' : ''} -mr-3 flex h-full flex-1 items-center justify-center rounded-[40px] text-2xl font-light`}
               >
                  Overview
               </button>
               <button
                  onClick={() => {
                     setCurr('Today');
                  }}
                  className={`${curr == 'Today' ? 'bg-[#302d2d]' : ''} flex h-full flex-1 items-center justify-center rounded-[40px] text-2xl font-light`}
               >
                  Today
               </button>
            </div>
         </div>
         <div className="flex flex-[20]">
            <HomeDisp curr={curr} />
            <p className="text-[9vw] text-white"></p>
         </div>
      </div>
   );
}
