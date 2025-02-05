'use client';

import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import {
   ACCESS_TIMETABLE_NAME,
   ACCESS_TOKEN_NAME,
   API_BASE_URL,
} from '../_utils/apiConstants';
import { useRouter } from 'next/navigation';

export const TimetableContext = createContext();

export const TimetableProvider = ({ children }) => {
   const [timetable, setTimetable] = useState([[null, null, null, null, null]]);
   const router = useRouter();
   useEffect(() => {
      if (sessionStorage.getItem(ACCESS_TIMETABLE_NAME) != null) {
         setTimetable(
            JSON.parse(sessionStorage.getItem(ACCESS_TIMETABLE_NAME))
               .courses_data
         );
      } else {
         const fetchTimetable = async () => {
            try {
               const token = JSON.parse(
                  localStorage.getItem(ACCESS_TOKEN_NAME)
               );
               const headers = { Authorization: `Token ${token}` };
               const response = await axios.get(`${API_BASE_URL}/collection`, {
                  headers,
               });

               if (response.status === 200) {
                  setTimetable(response.data.courses_data);
                  sessionStorage.setItem(
                     ACCESS_TIMETABLE_NAME,
                     JSON.stringify(response.data)
                  );
               } else {
                  console.error('Failed to fetch timetable:', response.data);
               }
            } catch (error) {
               if (error.response?.status === 401) {
                  router.push('/login');
               } else {
                  console.error('Error fetching timetable:', error);
               }
            }
         };

         fetchTimetable();
      }
      console.log('Setting timetable context ', timetable);
   }, []);

   return (
      <TimetableContext.Provider value={{ timetable, setTimetable }}>
         {children}
      </TimetableContext.Provider>
   );
};
