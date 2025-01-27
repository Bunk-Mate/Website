'use client';

import { createContext, useEffect, useState } from 'react';

export const TimetableContext = createContext();

export const TimetableProvider = ({ children }) => {
   const [timetable, setTimetable] = useState([[null, null, null, null, null]]);
   useEffect(() => {
      console.log('Setting timetable context ', timetable);
   }, [timetable]);

   return (
      <TimetableContext.Provider value={{ timetable, setTimetable }}>
         {children}
      </TimetableContext.Provider>
   );
};
