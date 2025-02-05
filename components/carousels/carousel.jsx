import Image from 'next/image';
import BunkMate from '@/public/assets/Bunk-Mate.png';

export default function Carousel() {
   const logos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   return (
      <div className="inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_top,transparent_0,_black_128px,_black_calc(95%-128px),transparent_100%)] max-md:absolute max-md:-z-10 max-md:w-screen max-md:-translate-y-[40vh] md:h-screen">
         <ul className="flex justify-center max-md:animate-infinite-scroll-x md:animate-infinite-scroll-y md:flex-col md:items-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
            {logos.map((index) => (
               <li key={index}>
                  <Image
                     src={BunkMate}
                     className="max-md:-ml-[6.5vh] max-md:w-[30vh] md:mb-[1vw] md:w-[40vw]"
                  />
               </li>
            ))}
         </ul>
      </div>
   );
}
