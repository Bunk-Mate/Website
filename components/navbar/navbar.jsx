import { options } from '@/app/_utils/navbarConstants';
import NavMapped from '@/components/navbar/nav_select/nav_mapped';
import { usePathname } from 'next/navigation';
import SideMenu from '@/components/navbar/nav_select/side_menu';
import Logo from '@/public/assets/logo.png';
import Image from 'next/image';
import axios from 'axios';
import {
   API_BASE_URL,
   ACCESS_TOKEN_NAME,
   ACCESS_TIMETABLE_NAME,
} from '@/app/_utils/api_constants';
import Logout from '@/components/svg/logout';
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '@/app/_contexts/user_name';
import User from '@/components/svg/user';
import { useNotifications } from '@/app/_contexts/notification';
import { useRouter } from 'next/router';

export default function NavBar() {
   const pathname = usePathname();
   const { userID } = useContext(UserContext);
   const { addNotification } = useNotifications();
   const router = useRouter;

   function handleLogout() {
      const header = {
         Authorization:
            'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
      };
      addNotification('Logging you out...');
      axios
         .post(API_BASE_URL + '/logout', {}, { headers: header })
         .then((response) => {
            if (response.status === 200) {
               addNotification('Logged out.');
               localStorage.removeItem(ACCESS_TOKEN_NAME);
               try {
                  sessionStorage.removeItem(ACCESS_TIMETABLE_NAME);
               } catch {
                  // empty
               }
               router.push('/login');
            } else {
               addNotification('Some error has occurred. Please try again.');
            }
         })
         .catch((error) => {
            if (error.response.status == 401) {
               router.push('/login');
            }
            addNotification('Some error has occurred. Please try again');
         });
   }
   return (
      <nav className="flex h-[5vw] max-sm:h-[72px]">
         <div className="mb-2 ml-2 flex h-[5vw] flex-1 items-center p-[1vw] text-[2vw] max-sm:mt-3 max-sm:h-[72px] max-sm:flex-1 max-sm:text-3xl">
            <Image
               src={Logo}
               alt="logo"
               className="mr-[-0.5vw] max-sm:size-16 sm:size-[4vw]"
            />
            <p className="ml-4 max-sm:ml-2 max-sm:flex-1 max-sm:text-4xl">
               Bunk-Mate
            </p>
         </div>
         <div className="flex justify-center max-sm:hidden">
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
         <div className="right-0 flex h-[5vw] flex-1 items-center justify-end gap-x-[0.3vw] p-[1vw] text-[2vw] max-sm:hidden">
            <UserMenu userID={userID} />
            <button onClick={handleLogout} title="Logout" className="">
               <Logout />
            </button>
         </div>
      </nav>
   );
}

export function UserMenu({ userID }) {
   const tooltipRef = useRef(null);

   function handlePosition() {
      requestAnimationFrame(() => {
         const tooltip = tooltipRef.current;
         if (!tooltip) return;

         // always reset first
         tooltip.style.transform = 'translateX(-50%)';

         const rect = tooltip.getBoundingClientRect();
         const padding = 10;
         const rightOverflow = window.innerWidth - rect.right;
         const leftOverflow = rect.left;

         if (rightOverflow < padding) {
            tooltip.style.transform = `translateX(calc(-50% + ${rightOverflow - padding}px))`;
         } else if (leftOverflow < padding) {
            tooltip.style.transform = `translateX(calc(-50% + ${padding - leftOverflow}px))`;
         }
      });
   }

   useEffect(() => {
      handlePosition();
   }, [userID]);

   return (
      <div
         className="group relative flex size-11 cursor-pointer items-center justify-center rounded-full bg-[#232222] shadow-lg transition-all duration-200 hover:bg-[#2b2b2b] sm:size-[4vw]"
         onMouseEnter={handlePosition}
      >
         <div className="flex w-full items-center justify-center p-[1.2vw] transition-all duration-300">
            <User />
         </div>
         <div
            ref={tooltipRef}
            className="absolute left-1/2 top-full z-50 mt-2 hidden whitespace-nowrap rounded-md bg-[#2b2b2b] px-3 py-2 text-[1.5vw] group-hover:block"
            style={{ transform: 'translateX(-50%)' }}
         >
            {userID}
         </div>
      </div>
   );
}
