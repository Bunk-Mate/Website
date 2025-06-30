import Logo from '@/public/assets/logo.png';
import Image from 'next/image';
import Carousel from '@/components/carousels/carousel';
import Link from 'next/link';
import { BASE_URL } from '@/app/_utils/api_constants';

export default function Layout({ children }) {
   return (
      <div className="flex min-h-screen max-md:flex-col">
         <div className="fixed mb-2 ml-2 mt-[1vw] flex h-[5vw] items-center p-[1vw] text-[2vw] max-sm:mt-3 max-sm:h-[72px] max-sm:flex-1 max-sm:text-3xl">
            <Link
               className="rounded-full transition duration-300 hover:rotate-[360deg]"
               href={BASE_URL}
            >
               <Image
                  src={Logo}
                  alt="logo"
                  className="rounded-full max-sm:size-20 sm:size-[5vw]"
               />
            </Link>
         </div>
         <div className="flex flex-1 md:items-center md:justify-end md:pl-[5vw]">
            <Carousel />
         </div>
         {children}
      </div>
   );
}
