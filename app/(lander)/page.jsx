'use client';

import Link from "next/link";
import Image from "next/image";
import Dashboard from "@/public/assets/dashboard.png"
import EditTable from "@/public/assets/edit_timetable.png"
import CircleScale from "@/components/scroll_shenanigans/circle_scale";
import HorizontalScrollCarousel from "@/components/scroll_shenanigans/dependent_horizontal_scroll";
import ContactFooter from "@/components/contact_us/contact_footer";
import Feature from "@/components/feature/feature";
import NameStrip from "@/components/name_strip/name_strip";
import FeatureStrip from "@/components/name_strip/feature_strip"
import { useEffect } from "react";

export default function Home() {
   useEffect(() => {
      window.onbeforeunload = () => {
         window.scrollTo(0, 0);
      };
      //console.log('reload')
   });
   return (
      <div className="h-[94vh] scroll-smooth">
         <div className="m-[1vw] flex h-[90vh] flex-1 flex-col items-center justify-center bg-black max-md:h-[90vh]">
            <p className="-m-[1vw] text-[2vw] max-md:text-[5vw]">Welcome to</p>
            <p className="text-[7vw] max-md:text-[14vw]">Bunk-Mate</p>
            <Link
               href="/registration"
               className="border-b-blueviolet border-r-blueviolet text-blueviolet hover:border-t-blueviolet hover:border-l-blueviolet rounded-full border-[1px] border-l-white border-t-white bg-black p-4 text-[1.5vw] font-light transition duration-1000 hover:border-b-[#ee67ee] hover:border-r-[#ee67ee] hover:bg-white hover:text-black hover:shadow-[5px_5px_rgba(240,46,170,0.4),10px_10px_rgba(240,46,170,0.3),15px_15px_rgba(240,46,170,0.2)] max-sm:text-lg"
            >
               Get Started
            </Link>
         </div>
         <div className="-mt-[8vw] flex flex-col items-center justify-center">
            <Image
               src={Dashboard}
               className="h-[30vw] w-auto rounded-[1vw] border-[0.4vw] border-solid border-[#979797] max-md:h-auto max-md:w-[90vw]"
            />
            <div className="max-w-screen -mt-[10vw] min-h-[10vw] w-full bg-gradient-to-t from-black"></div>
         </div>
         <div className="flex h-screen items-center justify-center text-[3vw] max-md:text-[7vw]">
            <p className="max-w-[60vw] max-md:max-w-[85vw]">
               Bunk Mate helps you track your attendance and plan your bunks.
               Who else is better to rely on that oneself..
            </p>
         </div>
         <div className="mt-[50vh] flex flex-col items-center justify-center max-md:mt-[15vh]">
            <Image
               src={Dashboard}
               className="sticky top-[50vh] mb-[20vw] h-auto w-[60vw] -translate-y-1/2 rounded-[1vw] border-[0.4vw] border-solid border-[#505050] max-md:w-[90vw]"
            />
            <Image
               src={EditTable}
               className="sticky top-[50vh] mb-[20vw] h-auto w-[60vw] -translate-y-1/2 rounded-[1vw] border-[0.4vw] border-solid border-[#505050] max-md:w-[90vw]"
            />
            <div className="sticky top-[50vh] mb-[20vw] flex h-[30.4vw] w-[60vw] -translate-y-1/2 items-center justify-center rounded-[1vw] border-[0.2vw] border-dashed border-[#979797] bg-[#1c1c1c] text-[1vw] max-md:h-[45vw] max-md:w-[90vw]">
               Ranked bunking coming soon
            </div>
         </div>
         <div className="max-w-screen -mb-[13vw] -mt-[20vw]">
            <FeatureStrip />
         </div>
         <div id="feature">
            <Feature />
         </div>
         <CircleScale />
         <HorizontalScrollCarousel />
         <div className="max-w-screen bg-white">
            <NameStrip />
         </div>
         <div className="max-w-screen h-[20vh] bg-black"></div>
         <ContactFooter />
      </div>
   );
}
