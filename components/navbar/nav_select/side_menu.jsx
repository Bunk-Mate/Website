'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import Bars from '@/components/svg/bars-3';
import Logo from '@/public/assets/bunkmate-logo-square.jpg';
import Image from 'next/image';
import { BASE_URL } from '@/app/_utils/api_constants';
import { UserContext } from '@/app/_contexts/user_name';
import X from '@/components/svg/x';
import { SineWaveStatic } from '@/components/ui/sine_wave';

export default function SideMenu({ options, handleLogout }) {
   const [open, setOpen] = useState(false);
   const { userID } = useContext(UserContext);
   return (
      <>
         <button
            className="text-5xl"
            onClick={() => {
               setOpen(true);
            }}
         >
            <Bars />
         </button>
         <div
            className={`fixed left-0 top-0 z-30 flex h-[calc(100%)] w-full justify-end bg-[rgba(20,20,20,0.5)] backdrop-blur-md ${open ? '' : 'hidden'}`}
         >
            <div className="flex min-w-44 flex-col rounded-l-3xl bg-black/90 p-4 shadow-[0px_0px_50px_rgb(50,50,50)]">
               <div className="mb-[2vh] flex w-full">
                  <div className="flex-1">
                     <Link
                        className="rounded-full transition duration-300 hover:rotate-[360deg]"
                        href={BASE_URL}
                     >
                        <Image
                           src={Logo}
                           alt="logo"
                           className="rounded-full max-sm:size-[50px] sm:size-[5vw]"
                        />
                     </Link>
                  </div>
                  <button
                     className="m-[-5px] flex max-sm:size-[65px]"
                     onClick={() => {
                        setOpen(false);
                     }}
                  >
                     <X />
                  </button>
               </div>

               <p className="text-center text-[3vh] text-[#b4b4b4]">{userID}</p>
               <div className="my-[3vw]">
                  <SineWaveStatic />
               </div>
               <ul className="mt-3 flex flex-col justify-center text-4xl">
                  {options.map((option) => (
                     <li key={option.id} className="mt-1">
                        {/* <div className={`mt-[-6vw] text-[#585858]`}>.............................</div> */}

                        <Link onClick={() => setOpen(false)} href={option.href}>
                           {option.option}
                        </Link>
                     </li>
                  ))}
               </ul>
               <div className="flex-1"></div>
               <ul className="mb-4">
                  <li className="my-[3vw]">
                     <SineWaveStatic />
                  </li>
                  <li>
                     <button onClick={handleLogout} className="text-4xl">
                        Logout
                     </button>
                  </li>
               </ul>
            </div>
         </div>
      </>
   );
}
