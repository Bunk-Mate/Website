'use client';

import { options } from '@/app/_utils/navbarConstants';
import NavMapped from '@/components/nav_select/nav_mapped';
import { usePathname } from 'next/navigation';
import SideMenu from '@/components/nav_select/side_menu';
import Logo from '@/public/assets/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
   API_BASE_URL,
   ACCESS_TOKEN_NAME,
   ACCESS_TIMETABLE_NAME,
} from '@/app/_utils/apiConstants';
import Logout from '@/components/svg/logout';
import { useEffect, useRef } from 'react';
import SlideInNotifications from '@/components/notifications/side_notification';
import DomainChangeModal from '@/components/popup/domain_change/domain_change_modal.jsx';

export default function Layout({ children }) {
   const pathname = usePathname();
   const router = useRouter();
   const notificationRef = useRef(null);

   useEffect(() => {
      if (localStorage.getItem(ACCESS_TOKEN_NAME) == null) {
         router.push('/login');
      }
   });

   function handleLogout() {
      const header = {
         Authorization:
            'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
      };
      if (notificationRef.current) {
         notificationRef.current.addNotif(Math.random(), 'Logging you out...');
      }
      axios
         .post(API_BASE_URL + '/logout', {}, { headers: header })
         .then((response) => {
            if (response.status === 200) {
               if (notificationRef.current) {
                  notificationRef.current.addNotif(
                     Math.random(),
                     'Logged out.'
                  );
               }
               localStorage.removeItem(ACCESS_TOKEN_NAME);
               try {
                  sessionStorage.removeItem(ACCESS_TIMETABLE_NAME);
               } catch {
                  // empty
               }
               router.push('/login');
            } else {
               if (notificationRef.current) {
                  notificationRef.current.addNotif(
                     Math.random(),
                     'Some error has occurred. Please try again.'
                  );
               }
            }
         })
         .catch((error) => {
            if (error.response.status == 401) {
               router.push('/login');
            }
            if (notificationRef.current) {
               notificationRef.current.addNotif(
                  Math.random(),
                  'Some error has occurred. Please try again'
               );
            }
            //console.log(error.response);
         });
   }

   return (
      <div className="flex h-screen flex-col">
         <div className="bg-[#1c1c1c] max-sm:bg-black">
            <nav className="flex h-[5vw] overflow-hidden max-sm:h-[72px]">
               <div className="mb-2 ml-2 flex h-[5vw] items-center p-[1vw] text-[2vw] max-sm:mt-3 max-sm:h-[72px] max-sm:flex-1 max-sm:text-3xl">
                  <Image
                     src={Logo}
                     alt="logo"
                     className="mr-[-0.5vw] max-sm:size-16 sm:size-[4vw]"
                  />
                  {/* <div className="rounded-full h-[3.5vw] w-[3.5vw] border-white border-y-2 max-sm:w-[54px] max-sm:h-[54px] max-sm:hidden"></div> */}
                  <p className="ml-4 max-sm:ml-2 max-sm:flex-1 max-sm:text-4xl">
                     Bunk-Mate
                  </p>
               </div>
               <div className="flex flex-1 justify-center max-sm:hidden">
                  <ul className="flex items-center justify-center text-[1.5vw]">
                     {options.map((option) => (
                        <li key={option.id}>
                           <NavMapped
                              option={option.option}
                              href={option.href}
                              pathname={pathname}
                           />
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="flex items-center justify-end px-5 text-5xl sm:hidden">
                  <SideMenu
                     options={options}
                     pathname={pathname}
                     handleLogout={handleLogout}
                  />
               </div>
               <div className="right-0 flex h-[5vw] items-center justify-end p-[1vw] text-[2vw] max-sm:hidden">
                  <div className="invisible">
                     <Image
                        src={Logo}
                        alt="logo"
                        className="mr-[-0.5vw] max-sm:size-16 sm:size-[4vw]"
                     />
                     <p className="ml-4 max-sm:ml-2 max-sm:flex-1 max-sm:text-4xl">
                        Bunk-Mate
                     </p>
                  </div>
                  <button
                     onClick={handleLogout}
                     title="Logout"
                     className="absolute z-10"
                  >
                     <Logout />
                  </button>
               </div>
            </nav>
         </div>
         <div className="h-full bg-black">{children}</div>
         <SlideInNotifications ref={notificationRef} />
         <DomainChangeModal />
      </div>
   );
}
