'use client';

import SlideInNotifications from '@/components/notifications/side_notification';
export default function test() {
   return (
      <div className="">
         <SlideInNotifications component={ButtonWithNotification} />
      </div>
   );
}

const ButtonWithNotification = ({ addNotif }) => {
   const handleAddNotification = () => {
      const id = Math.random();
      const text = 'Custom notification text';
      addNotif(id, text);
   };
   return (
      <div>
         <button
            onClick={handleAddNotification}
            className="rounded bg-indigo-500 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-600 active:scale-95"
         >
            Add Notification
         </button>
      </div>
   );
};
