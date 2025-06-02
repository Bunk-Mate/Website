import { AnimatePresence, motion } from 'framer-motion';

export default function SlideInNotifications({
   notifications,
   removeNotification,
}) {
   return (
      <div className="pointer-events-none fixed right-2 top-2 z-50 flex w-72 flex-col gap-1">
         <AnimatePresence>
            {notifications.map(({ id, text }) => (
               <motion.div
                  key={id}
                  layout
                  initial={{ y: -15, scale: 0.95 }}
                  animate={{ y: 0, scale: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="pointer-events-auto flex items-start gap-2 rounded bg-indigo-500 p-2 text-xs font-medium text-white shadow-lg"
               >
                  <span>{text}</span>
                  <button
                     onClick={() => removeNotification(id)}
                     className="ml-auto"
                  >
                     &times;
                  </button>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
   );
}
