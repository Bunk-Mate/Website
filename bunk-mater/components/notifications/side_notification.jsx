import React, {
   useImperativeHandle,
   forwardRef,
   useState,
   useEffect,
   useCallback,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SlideInNotifications = forwardRef((props, ref) => {
   const [notifications, setNotifications] = useState([]);

   const removeNotif = useCallback((id) => {
      setNotifications((pv) => pv.filter((n) => n.id !== id));
   }, []);

   const addNotif = (id, text) => {
      setNotifications((pv) => [{ id, text }, ...pv]);
   };

   useImperativeHandle(ref, () => ({
      addNotif,
   }));

   return (
      <div className="pointer-events-none fixed right-2 top-2 z-50 flex w-72 flex-col gap-1">
         <AnimatePresence>
            {notifications.map((n) => (
               <Notification removeNotif={removeNotif} {...n} key={n.id} />
            ))}
         </AnimatePresence>
      </div>
   );
});

SlideInNotifications.displayName = 'SlideInNotifications';
const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, removeNotif }) => {
   useEffect(() => {
      const timeoutRef = setTimeout(() => {
         removeNotif(id);
      }, NOTIFICATION_TTL);

      return () => clearTimeout(timeoutRef);
   }, []);

   return (
      <motion.div
         layout
         initial={{ y: -15, scale: 0.95 }}
         animate={{ y: 0, scale: 1 }}
         exit={{ x: '100%', opacity: 0 }}
         transition={{ duration: 0.35, ease: 'easeOut' }}
         className="pointer-events-auto flex items-start gap-2 rounded bg-indigo-500 p-2 text-xs font-medium text-white shadow-lg"
      >
         <span>{text}</span>
         <button onClick={() => removeNotif(id)} className="ml-auto">
            &times;
         </button>
      </motion.div>
   );
};

export default SlideInNotifications;
