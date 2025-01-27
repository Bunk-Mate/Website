'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import ReactLenis from 'lenis/react';
import Logo from '@/app/_assets/logo.png';
import Image from 'next/image';

export default function RootLayout({ children }) {
   const [open, setOpen] = useState(true);
   useEffect(() => {
      let observer;
      const ref = document.getElementById('end');
      observer = new IntersectionObserver(
         ([entry]) => {
            setOpen(!entry.isIntersecting);
            //console.log(!entry.isIntersecting)
         },
         { root: null, rootMargin: '0px', threshold: 0 }
      );

      if (ref) {
         observer.observe(ref);
         //console.log('observing')
      }

      return () => {
         if (ref && observer != undefined) {
            observer.unobserve(ref);
            //console.log('not observing')
         }
      };
   }, []);
   return (
      <div className="w-full">
         <nav
            className={`fixed top-0 z-20 flex w-full items-center pb-[3vw] text-[1vw] max-md:text-[5vw] ${open ? '' : '-translate-y-[100%]'} mix-blend-difference transition duration-300 ease-in`}
         >
            <Image
               src={Logo}
               className="-mr-[2vw] h-[7vw] w-auto max-md:pl-[2vw] md:hidden"
            ></Image>
            <button
               onClick={() => {
                  window.scrollTo(0, 0);
               }}
               className="px-[2vw] py-[1vw] max-md:flex max-md:flex-1 max-md:py-[2vw]"
            >
               BunkMate
            </button>
            <div className="flex flex-1 items-center justify-center max-md:hidden">
               <button
                  className="mx-[1vw] transition duration-300 ease-in hover:text-[#808080]"
                  onClick={() => {
                     window.scrollTo(0, 0);
                  }}
               >
                  Home
               </button>
               <button
                  className="mx-[1vw] transition duration-300 ease-in hover:text-[#808080]"
                  onClick={() => {
                     document.getElementById('feature').scrollIntoView();
                  }}
               >
                  Features
               </button>
               <button
                  className="mx-[1vw] transition duration-300 ease-in hover:text-[#808080]"
                  onClick={() => {
                     window.scrollTo(0, document.body.scrollHeight);
                  }}
               >
                  About
               </button>
            </div>
            <button className="ease mx-[1vw] rounded-full px-[1vw] py-[0.5vw] transition duration-300 hover:bg-white hover:text-black max-md:pr-[2vw]">
               <Link href={'/login'}>Login</Link>
            </button>
         </nav>
         <div className="max-w-screen">
            <ReactLenis
               root
               options={{
                  lerp: 0.06,
                  duration: 1.5,
                  smoothTouch: true,
                  smoothWheel: true,
               }}
            >
               {children}
            </ReactLenis>
         </div>
      </div>
   );
}
