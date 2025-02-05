'use client';

import NavMapped from '@/components/nav_select/nav_mapped';
import { usePathname } from 'next/navigation';
import Logo from '@/public/assets/logo.png';
import Image from 'next/image';

export default function Layout({ children }) {
   const pathname = usePathname();
   return (
      <div className="flex h-screen flex-col bg-[#1c1c1c]">
         <div className="">
            <nav className="flex h-[5vw] overflow-hidden max-md:h-[72px]">
               <div className="mb-2 ml-2 flex items-center p-[1vw] text-[2vw] max-sm:mt-3 max-sm:flex-1 max-sm:text-3xl">
                  <Image
                     src={Logo}
                     className="-mr-[0.5vw] max-sm:h-16 max-sm:w-16 sm:h-[4vw] sm:w-[4vw]"
                  />
                  <p className="ml-4 max-sm:ml-2 max-sm:flex-1 max-sm:text-4xl">
                     Bunk-Mate
                  </p>
               </div>
               <div className="flex flex-1 justify-center max-sm:hidden">
                  <ul className="flex items-center justify-center text-[1.5vw]">
                     <li>
                        <NavMapped
                           option={'Add'}
                           href={'/add'}
                           pathname={pathname}
                        />
                     </li>
                  </ul>
               </div>
               <div className="invisible flex items-center justify-center p-[1vw] text-[2vw] max-sm:hidden">
                  <div className="min-h-16 min-w-16 rounded-full bg-white"></div>
                  <p className="ml-4">Bunk-Mater</p>
               </div>
            </nav>
         </div>
         <div className="flex flex-grow flex-col overflow-hidden bg-black max-sm:rounded-t-[10vw]">
            {children}
         </div>
      </div>
   );
}
