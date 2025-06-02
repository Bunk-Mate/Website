'use client';

import { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '@/app/_utils/apiConstants.js';
import AddNewSubs from './add_new_sub';
import { useRouter } from 'next/navigation';
import { RefreshContext } from '@/app/_contexts/refresh';
import { useNotifications } from '@/app/_contexts/notification';

export default function Status({ dateCurr, hw }) {
   const thirdparty = useRef([]);
   const { addNotification } = useNotifications();
   const router = useRouter();
   const statusMap = {
      present: 'bunked',
      bunked: 'cancelled',
      cancelled: 'present',
   };
   // eslint-disable-next-line prettier/prettier
   const { refreshCont, setRefreshCont, refreshCourseList } = useContext(RefreshContext);
   const [dateQuery, setDateQuery] = useState([
      // {
      //    jession_url": "http://127.0.0.1:8000/session/63171"
      // },
   ]);
   const color = {
      present: ['bg-black', 'text-white', 'bg-[#5aad70]', 'text-black'],
      bunked: ['bg-black', 'text-white', 'bg-[#cc4e4e]', 'text-black'],
      cancelled: ['bg-[#272727]', 'text-[#9e9e9e]', '', 'text-[#9e9e9e]'],
   };

   const header = {
      Authorization:
         'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
   };
   useEffect(() => {
      axios
         .get(
            API_BASE_URL + '/datequery?date=' + dateCurr.format('YYYY-MM-DD'),
            {
               headers: header,
            }
         )
         .then(function (response) {
            if (response.status === 200) {
               setDateQuery(response.data);
            } else {
               //console.log(response.data)
            }
         })
         .catch(function (error) {
            if (error.response.status == 401) {
               router.push('/login');
            }
            //console.log(JSON.stringify(error));
         });
   }, [dateCurr, refreshCourseList]);

   useEffect(() => {
      thirdparty.current = [];
   }, []);

   useEffect(() => {
      if (thirdparty.current.length > 0 && dateQuery.length > 0) {
         UpdateStatus(
            dateQuery,
            thirdparty,
            addNotification,
            router,
            refreshCont,
            setRefreshCont
         );
      }
   }, [dateQuery]);

   const handleStatusChange = (key) => {
      if (statusMap[dateQuery[key].status]) {
         let updatedQuery = [...dateQuery];
         updatedQuery[key].status = statusMap[dateQuery[key].status];
         thirdparty.current = [updatedQuery[key].status, key];
         setDateQuery(updatedQuery);
      }
   };

   return (
      <div
         className={`flex flex-1 flex-col overflow-hidden`}
         style={{ height: hw }}
      >
         <div className="no-scrollbar flex-1 overflow-auto">
            <AddNewSubs dateCurr={dateCurr} dateQuery={dateQuery} />
            {Object.keys(dateQuery).map((key, index) => (
               <div className="mt-1 flex h-[8.9vw] max-sm:h-[15vh]" key={index}>
                  <div
                     className={`flex flex-1 items-center text-[1.5vw] ${color[dateQuery[key].status][0]} ${color[dateQuery[key].status][1]} rounded-l-lg pl-[3vw] max-sm:text-3xl max-sm:font-light`}
                  >
                     {dateQuery[key].name}
                  </div>
                  <div
                     className={`flex h-full ${color[dateQuery[key]?.status][0]} ${color[dateQuery[key].status][1]} rounded-r-lg`}
                  >
                     <div className="m-px">
                        <button
                           className={`flex h-full w-[12vw] items-center justify-center overflow-hidden ${color[dateQuery[key].status][2]} rounded-lg max-sm:w-[15vh]`}
                           onClick={() => {
                              handleStatusChange(key);
                           }}
                           title={dateQuery[key].status}
                        >
                           <p
                              className={`text-[9vw] font-light uppercase leading-none ${color[dateQuery[key].status][3]} max-sm:text-[17vh]`}
                           >
                              {dateQuery[key].status[0]}
                           </p>
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

function UpdateStatus(
   dateQuery,
   thirdparty,
   addNotification,
   router,
   refreshCont,
   setRefreshCont
) {
   const header = {
      Authorization:
         'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
   };
   axios
      .patch(
         dateQuery[thirdparty.current[1]].session_url,
         {
            status: thirdparty.current[0],
         },
         { headers: header }
      )
      .then((response) => {
         if (response.status == 200) {
            addNotification('Updated attendance status.');
         }
         if (refreshCont == []) {
            setRefreshCont(['hello']);
         } else {
            setRefreshCont([]);
         }
      })
      .catch((error) => {
         if (error.response) {
            if (error.response.status == 401) {
               router.push('/login');
            }
         }
         addNotification('Request failed. Please try again.');
      });
}
