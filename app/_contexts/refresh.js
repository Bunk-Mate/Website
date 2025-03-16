'use client';

import { createContext, useState } from 'react';

export const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
   const [refreshCont, setRefreshCont] = useState();
   const [refreshCourseList, setRefreshCourseList] = useState([]);

   return (
      <RefreshContext.Provider
         value={{
            refreshCont,
            setRefreshCont,
            refreshCourseList,
            setRefreshCourseList,
         }}
      >
         {children}
      </RefreshContext.Provider>
   );
};
