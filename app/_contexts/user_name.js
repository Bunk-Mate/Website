'use client';

import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../_utils/api_constants';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [userID, setUserID] = useState();

   useEffect(() => {
      if (localStorage.getItem(ACCESS_TOKEN_NAME)) {
         const header = {
            Authorization:
               'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
         };

         axios
            .get(API_BASE_URL + '/user_details', { headers: header })
            .then(function (response) {
               if (response.status === 200) {
                  setUserID(response.data.username);
               }
            })
            .catch(function (error) {
               console.error('Error fetching data:', error);
            });
      }
   }, [userID]);

   return (
      <UserContext.Provider value={{ userID, setUserID }}>
         {children}
      </UserContext.Provider>
   );
};
