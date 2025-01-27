'use client';

import Link from 'next/link';
import { useState } from 'react';
import Bars from '../svg/bars-3';

export default function SideMenu({ options, href, pathname, handleLogout }) {
   const [open, setOpen] = useState(false);
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
            className={`fixed left-0 top-0 z-10 flex h-[calc(100%)] w-full justify-end bg-[rgba(20,20,20,0.5)] backdrop-blur-sm ${open ? '' : 'hidden'}`}
         >
            <div className="w-44 rounded-l-3xl bg-black p-4">
               <button
                  className="text-5xl"
                  onClick={() => {
                     setOpen(false);
                  }}
               >
                  X
               </button>
               <ul className="mt-3 flex flex-col justify-center text-4xl">
                  {options.map((option) => (
                     <li key={option.id} className="mt-1">
                        <Link onClick={() => setOpen(false)} href={option.href}>
                           {option.option}
                        </Link>
                     </li>
                  ))}
               </ul>
               <ul className="absolute bottom-0 mb-4">
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
