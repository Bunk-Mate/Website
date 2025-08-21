'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SineWaveLoader } from '@/components/ui/sine_loader';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '@/app/_utils/api_constants';
import axios from 'axios';
import Image from 'next/image';
import { useNotifications } from '@/app/_contexts/notification';
import { NOTIF_TYPE } from '../_enums/notification';

export default function Dashboard() {
   const router = useRouter();
   const [progress, setProgress] = useState(0.7);
   const { addNotification } = useNotifications();

   useEffect(() => {
      addNotification('Redirecting..');
      const header = {
         Authorization:
            'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
      };
      axios
         .get(API_BASE_URL + '/courses', { headers: header })
         .then(function (response) {
            if (response.status === 200) {
               router.push('/dashboard/home');
               setProgress(1);
            }
         })
         .catch(function (error) {
            if (error.response.status == 401) {
               addNotification('Session expired', NOTIF_TYPE.ERROR);
               router.push('/login');
            }
            if (error.response.status == 404) {
               setProgress(1);
               router.push('/add');
            } else {
               addNotification(
                  'Something went wrong. ' + error.response.status,
                  NOTIF_TYPE.ERROR
               );
            }
         });
   }, []);

   return (
      <div className="absolute top-0 flex min-h-dvh min-w-[100vw] justify-center bg-black">
         <div className="flex h-screen flex-col items-center justify-center break-normal text-[2vw] text-white max-sm:text-3xl">
            <div className="flex items-center">
               <div className="flex flex-col">
                  <Image
                     src={'/assets/construction.png'}
                     width={1}
                     height={1}
                     alt="construction-har"
                     className="relative z-20 mb-[-4.8vw] ml-[-0.2vw] w-[8vw] -rotate-12 transition duration-300 hover:translate-x-[-1.5vw] hover:-rotate-45 max-sm:mb-[-57px] max-sm:ml-[-3px] max-sm:max-h-[65px] max-sm:w-[96px] max-sm:hover:translate-x-[-20px]"
                     unoptimized
                  />

                  <Image
                     src="/assets/logo.png"
                     width={1}
                     height={1}
                     alt="logo"
                     className="min-h-[8vw] min-w-[8vw] max-sm:min-h-[95px] max-sm:min-w-[95px]"
                     unoptimized
                  />
               </div>
               {'Redirecting...'}
            </div>
            <div className="min-w-[30vw] max-sm:min-w-[90vw]">
               <SineWaveLoader progress={progress} />
            </div>
         </div>
      </div>
   );
}
