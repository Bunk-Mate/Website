'use client';

import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../_utils/apiConstants';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SlideInNotifications from '@/components/notifications/side_notification';

export default function Homepage() {
   const router = useRouter();
   const notificationRef = useRef(null);
   useEffect(() => {
      const header = {
         Authorization:
            'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
      };
      //console.log('header',header)
      axios
         .get(API_BASE_URL + '/courses', { headers: header })
         .then(function (response) {
            if (response.status === 200) {
               router.push('/dashboard/home');
            }
         })
         .catch(function (error) {
            if (error.response.status == 401) {
               router.push('/login');
            }
            if (error.response.status == 404) {
               router.push('/add');
            } else {
               if (notificationRef.current) {
                  notificationRef.current.addNotif(
                     Math.random(),
                     'Some error has occurred.'
                  );
               }
               //console.log('status',error.response.status)
               //console.log(JSON.stringify(error));
            }
         });
   }, []);
   return (
      <>
         <div className="flex h-screen w-full items-center justify-center break-normal text-[2vw]">
            Welcome to the dashboard. You will be redirected shortly.
         </div>
         <SlideInNotifications ref={notificationRef} />
      </>
   );
}
