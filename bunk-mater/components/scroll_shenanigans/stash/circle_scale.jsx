'use client';

import { useEffect, useState, useRef } from 'react';

export default function CircleScale() {
   const [h, setH] = useState(10);
   const [w, setW] = useState(10);
   const [activate, setActivate] = useState(true);
   const ref = useRef(null);
   const scrollDir = useRef('scrolling down');
   const offs = useRef(null);

   useEffect(() => {
      let lastScrollY = window.scrollY;
      let ticking = false;

      const updateScrollDir = () => {
         const scrollY = window.scrollY;
         if (Math.abs(scrollY - lastScrollY) < 5) {
            ticking = false;
            return;
         }
         scrollDir.current =
            scrollY > lastScrollY ? 'scrolling down' : 'scrolling up';
         lastScrollY = scrollY > 0 ? scrollY : 0;
         ticking = false;
      };

      const onScroll = () => {
         if (!ticking) {
            window.requestAnimationFrame(updateScrollDir);
            ticking = true;
         }
      };

      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
   }, []);

   useEffect(() => {
      //console.log('dir change to ', scrollDir)
   }, [scrollDir]);
   const handleScroll = () => {
      // console.log('here')
      if (scrollDir.current == 'scrolling down') {
         setH((h) => 1 * (window.scrollY - offs.current));
         setW((w) => 1 * (window.scrollY - offs.current));
         //console.log('addition', scrollDir)
      } else {
         setH((h) => 1 * (window.scrollY - offs.current));
         setW((w) => 1 * (window.scrollY - offs.current));
         //console.log('subttraction', scrollDir)
      }
      //console.log(window.scrollY-offs.current)
      // console.log(h,w)
   };
   useEffect(() => {
      offs.current = window.scrollY;

      if (activate) {
         //console.log(activate,'activate')
         window.addEventListener('scroll', handleScroll);
      } else {
         window.removeEventListener('scroll', handleScroll);
      }
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [activate]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            setActivate(entry.isIntersecting);
         },
         { root: null, rootMargin: '0px', threshold: 0 }
      );

      if (ref.current) {
         observer.observe(ref.current);
         //console.log('observing')
      }

      return () => {
         if (ref.current) {
            observer.unobserve(ref.current);
            //console.log('not observing')
         }
      };
   }, []);

   useEffect(() => {
      //console.log(activate,'here is activate')
   }, [activate]);

   return (
      <div className="max-h-screen">
         <div className="h-[200vh]"></div>
         <div
            className={`flex justify-center ${activate ? 'fixed' : ''} left-1/2 -z-10 -translate-x-1/2 transform ${h > window.innerHeight ? 'top-[50vh] -translate-y-1/2' : 'bottom-0'}`}
         >
            <div
               ref={ref}
               className="rounded-full bg-white transition"
               style={{
                  minHeight: `${h}px`,
                  minWidth: `${w}px`,
               }}
            ></div>
         </div>
         <div className="h-[200vh]"></div>
      </div>
   );
}
