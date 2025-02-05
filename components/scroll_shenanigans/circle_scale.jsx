'use client';

import { useEffect, useState, useRef } from 'react';

export default function CircleScale() {
   const [h, setH] = useState(0);
   const [w, setW] = useState(0);
   const [activate, setActivate] = useState(false);
   const circleRef = useRef(null);
   const scrollDir = useRef('scrolling down');
   const offs = useRef(0);
   const winH = useRef(0);
   const winW = useRef(0);
   const prev = useRef(0);
   const [windH, setWindH] = useState(0);

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
      winH.current = window.innerHeight;
      winW.current = window.innerWidth;
      //console.log('setting windows', winH.current, winW.current)
      window.addEventListener('resize', () => {
         setTimeout(() => {
            prev.current = winH.current;
            winH.current = window.innerHeight;
            winW.current = window.innerWidth;
            if (winH.current - prev.current != 0) {
               offs.current = offs.current + winH.current - prev.current;
            }
            //console.log('firing resize', scrollY, offs.current, prev.current)
         }, 10);
      });
      return () => {
         window.removeEventListener('resize', {});
      };
   }, []);

   useEffect(() => {
      //console.log('dir change to ', scrollDir)
   }, [scrollDir]);
   const handleScroll = () => {
      // console.log('here')
      if (window.innerHeight >= window.innerWidth) {
         setH(
            () =>
               (winH.current / winW.current) * (window.scrollY - offs.current)
         );
         setW(
            () =>
               (winH.current / winW.current) * (window.scrollY - offs.current)
         );
         // console.log('addition', scrollDir)
      } else {
         setH(
            () =>
               (winW.current / winH.current) * (window.scrollY - offs.current)
         );
         setW(
            () =>
               (winW.current / winH.current) * (window.scrollY - offs.current)
         );
         // console.log('subtraction', scrollDir)
      }
      //console.log(window.scrollY-offs.current, offs.current, window.scrollY)
      // console.log(h,w)
   };
   useEffect(() => {
      if (offs.current == 0) {
         offs.current = window.scrollY;
      }

      if (activate) {
         //console.log(activate,'activate')
         window.addEventListener('scroll', handleScroll);
      } else {
         setH(0);
         setW(0);
         window.removeEventListener('scroll', handleScroll);
      }
      return () => {
         setH(0);
         setW(0);
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

      if (circleRef.current) {
         observer.observe(circleRef.current);
         //console.log('observing')
      }

      return () => {
         if (circleRef.current) {
            observer.unobserve(circleRef.current);
            //console.log('not observing')
         }
      };
   }, []);

   useEffect(() => {
      //console.log(activate,'here is activate')
   }, [activate]);

   useEffect(() => {
      window.addEventListener('resize', () => {
         setTimeout(() => {
            setWindH(window.innerHeight);
         }, 10);
      });
   });

   return (
      <div className="h-full">
         <div className="h-[50vh]"></div>
         <div
            className="-mb-[100vh] flex h-[200vh] justify-center max-sm:-mb-[150vh]"
            ref={circleRef}
            //style={{height:`${Math.round(Math.sqrt((window.innerHeight)**2+(window.innerWidth)**2))}px`}}
         >
            <div
               className={`fixed rounded-full bg-white ${h > windH ? 'top-[50vh] -translate-y-1/2 transform' : 'bottom-0'}`}
               style={{
                  minHeight: `${h}px`,
                  minWidth: `${w}px`,
               }}
            ></div>
         </div>
         {/* <div className={`flex justify-center bg-blue-600 transform ${h>window.innerHeight?"fixed left-1/2 -translate-x-1/2 -translate-y-1/2 top-[50vh]":"bottom-0"}`}>
            <div ref={circleRef} className="bg-white transition rounded-full" style={{minHeight: `${h}px`, minWidth: `${w}px`}}></div>
        </div> */}
         {/* <div className="h-[200vh]"></div> */}
      </div>
   );
}
