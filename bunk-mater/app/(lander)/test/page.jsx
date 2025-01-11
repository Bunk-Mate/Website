'use client';

import { useState, useEffect, useRef } from 'react';
// import CircleScale from "@/components/scroll_shenanigans/circle_scale";
// import HorizontalScroll from "@/components/scroll_shenanigans/stash/horizontal_scroll";
// import DependencyScroll from "@/components/scroll_shenanigans/stash/dependency";
// import HorizontalScrollCarousal from "@/components/scroll_shenanigans/dependent_horizontal_scroll";
import SlideInNotifications from '@/components/notifications/side_notification';
export default function test() {
   return (
      <div className="">
         {/* <CircleScale/> */}
         {/* <HorizontalScroll setActivate={setActivate} activate={activate}/> */}
         {/* <HorizontalScroll/> */}
         {/* <DependencyScroll/> */}
         {/* <HorizontalScrollCarousal/> */}
         <SlideInNotifications component={ButtonWithNotification} />
         {/* <componentOne/>
      <button className="mt-[50vh]" onClick={()=>{handleClick()}}>click</button> */}
      </div>
   );
}

const ButtonWithNotification = ({ addNotif }) => {
   const handleAddNotification = () => {
      // Generate a unique ID and pass custom notification text
      const id = Math.random();
      const text = 'Custom notification text!';
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
