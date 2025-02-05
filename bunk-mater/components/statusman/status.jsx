'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '@/app/_utils/apiConstants.js';
import AddNewSubs from './add_new_sub';
import SlideInNotifications from '../notifications/side_notification';

export default function Status({ dateCurr, refreshCont, setRefreshCont, hw }) {
   const thirdparty = useRef([]);
   const notificationRef = useRef(null);
   const statusMap = {
      present: 'bunked',
      bunked: 'cancelled',
      cancelled: 'present',
   };
   const [dateQuery, setDateQuery] = useState([
      // {
      //     "name": "history",
      //     "status": "present",
      //     "session_url": "http://127.0.0.1:8000/session/63171"
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
   }, [dateCurr]);

   useEffect(() => {
      thirdparty.current = [];
   }, []);

   useEffect(() => {
      if (thirdparty.current.length > 0 && dateQuery.length > 0) {
         console.log('updating', dateQuery);
         console.log('hhhh', color[dateQuery[0].status][2], thirdparty.current);
         update(
            refreshCont,
            dateCurr,
            dateQuery,
            setRefreshCont,
            thirdparty,
            notificationRef
         );
      } else {
         // console.log(
         //    'first rend',
         //    dateQuery,
         //    dateQuery.length,
         //    thirdparty.current
         // );
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
            <AddNewSubs
               dateCurr={dateCurr}
               dateQuery={dateQuery}
               refreshCont={refreshCont}
               setRefreshCont={setRefreshCont}
            />
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
                     <div className="m-[1px]">
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
         <SlideInNotifications ref={notificationRef} />
      </div>
   );
}

function update(
   refreshCont,
   dateCurr,
   dateQuery,
   setRefreshCont,
   thirdparty,
   notificationRef
) {
   //console.log("this is update", thirdparty.current)
   // console.log(dateQuery[thirdparty.current[1]].session_url, thirdparty.current[1])
   console.log(thirdparty.current[1], thirdparty.current[1], dateQuery);
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
            if (notificationRef.current) {
               notificationRef.current.addNotif(
                  Math.random(),
                  'Updated attendance status.'
               );
            }
         }
         //console.log(response.status, response.data)
         if (refreshCont == []) {
            setRefreshCont(['hello']);
         } else {
            setRefreshCont([]);
         }
         //console.log("set refreshCont")
      })
      .catch((error) => {
         if (error.response) {
            if (error.response.status == 401) {
               router.push('/login');
            }
         }
         if (notificationRef.current) {
            notificationRef.current.addNotif(
               Math.random(),
               'Request failed. Please try again.'
            );
         }
         //console.log("caught an error in post\n",error)
      });
}
