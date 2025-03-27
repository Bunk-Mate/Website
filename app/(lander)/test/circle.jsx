'use client';

import { useEffect, useState, useRef } from 'react';

export default function CircleScale() {
   const [h, setH] = useState(0);
   const [w, setW] = useState(0);
   const [activate, setActivate] = useState(false);
   const circleRef = useRef(null);
   const offs = useRef(0);
   const winH = useRef(0);
   const winW = useRef(0);
   const prev = useRef(0);
   const [windH, setWindH] = useState(0);
   const [isFill, setIsFill] = useState(false)

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

   const handleScroll = () => {
      const circleRect = circleRef.current.getBoundingClientRect();
      setH(() => window.innerHeight - circleRect.top);
      setW(() => window.innerHeight - circleRect.top);
   };

   useEffect(() => {
      if (h > Math.sqrt(Math.pow(windH, 2) + Math.pow(window.innerWidth, 2))) {
         if (!isFill) {
            setIsFill(true);
         }
      } else setIsFill(false);
   }, [h, w]);

   useEffect(() => {
      if (offs.current == 0) {
         offs.current = window.scrollY;
      }

      if (activate) {
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
      }

      return () => {
         if (circleRef.current) {
            observer.unobserve(circleRef.current);
         }
      };
   }, []);

   useEffect(() => {
      setWindH(window.innerHeight);
      window.addEventListener('resize', () => {
         setTimeout(() => {
            setWindH(window.innerHeight);
         }, 10);
      });
   }, []);

   return (
      <div
         className="flex h-[200vh] justify-center bg-blue-600"
         ref={circleRef}
      >
         <div
            className={`rounded-full bg-white ${h > windH ? isFill?'sticky top-0':'fixed top-[50vh] -translate-y-1/2' : ''}`}
            style={{
               minHeight: `${h}px`,
               maxHeight: `${h}px`,
               minWidth: `${w}px`,
               maxWidth: `${w}px`,
            }}
         ></div>
      </div>
   );
}
