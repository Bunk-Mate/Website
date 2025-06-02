'use client';

import SlideInNotifications from '@/components/notifications/slide_in_notification';
import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export const useNotifications = () => {
   const context = useContext(NotificationContext);
   if (!context)
      throw new Error(
         'useNotifications must be used within NotificationProvider'
      );
   return context;
};

export const NotificationProvider = ({ children }) => {
   const [notifications, setNotifications] = useState([]);

   const addNotification = useCallback((text) => {
      const id = Date.now();
      setNotifications((prev) => [{ id, text }, ...prev]);
      setTimeout(() => {
         setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000);
   }, []);

   const removeNotification = useCallback((id) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
   }, []);

   return (
      <NotificationContext.Provider value={{ addNotification }}>
         <SlideInNotifications
            notifications={notifications}
            removeNotification={removeNotification}
         />
         {children}
      </NotificationContext.Provider>
   );
};
