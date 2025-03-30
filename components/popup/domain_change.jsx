'use client';

import Image from 'next/image';
import FileTab from '../ui/file_tab';
import Link from 'next/link';
import FileTabStack from '../ui/file_tab_stack';
import { ACCESS_NOTICE_KEY } from '@/app/_utils/apiConstants';

export default function DomainChangeInfo({ setShowModal }) {

   const handleClose = () => {
      localStorage.setItem(ACCESS_NOTICE_KEY, "true");
      setShowModal(false);
   };

   return (
      <div className="absolute top-0 flex size-full items-center justify-center backdrop-blur-sm">
         <div className="flex min-h-36 max-w-[30vw] flex-col rounded-[20px] max-sm:max-w-[95vw]">
            {/* <div className='inset-0 absolute bg-[radial-gradient(125%_125%_at_-2%_101%,rgba(245,87,2,0.8)_10.5%,rgba(245,120,2,0.7)_16%,rgba(245,140,2,0.6)_17.5%,rgba(245,170,100,0.5)_25%,rgba(238,174,202,0.4)_40%,rgba(202,179,214,0.3)_65%,rgba(148,201,233,0.2)_100%)] mix-blend-multiply opacity-70'></div> */}
            <div className="flex bg-[#]">
               <FileTab props={<p className="pl-[3vw] pr-[2vw] max-sm:pl-[30px]">Notice</p>} />
               {/* <p className="flex flex-1 items-center justify-center">
                  Important Notice!
               </p> */}
               <FileTabStack/>
               {/* <div className="invisible">
                  <FileTab props={<p className="px-[2vw]">Close</p>} />
               </div> */}
            </div>
            <div className="flex flex-col gap-y-[1vw] px-[2vw] pt-[1.5vw] max-sm:p-[10px] backdrop-blur-lg bg-black/90 shadow-[0px_0px_50px_rgb(50,50,50)] rounded-b-[20px] rounded-tr-[20px] border border-[#333333] border-solid">
               <div className="flex max-w-[30vw] flex-1 flex-col items-center justify-center gap-y-[0.5vw] text-[1.2vw] max-sm:text-[20px] text-[#9e9e9e] max-sm:max-w-[92vw]">
                  <Image
                     src={"/assets/construction.png"} 
                     width={1} 
                     height={1} 
                     className='max-h-[5vw] max-sm:max-h-[65px] w-auto -ml-[0.5vw] max-sm:-ml-[6px] -rotate-12 mb-[-5vw] max-sm:mb-[-55px] relative z-20 hover:-rotate-45 hover:translate-x-[-1.5vw] max-sm:hover:translate-x-[-20px] transition duration-300' 
                     unoptimized
                  />

                  <Image
                     src="/assets/logo.png"
                     width={1}
                     height={1}
                     alt="logo"
                     className="min-h-[8vw] min-w-[8vw] max-sm:min-h-[95px] max-sm:min-w-[95px]"
                     unoptimized
                  />
                  {/* <h1 className='bold text-[2vw]'>🚨 Important Announcement 🚨</h1> */}
                  <p className="mb-[1vw] mt-[-0.5vw] text-[2vw] max-sm:text-[30px] text-center font-medium text-white">
                     BunkMate is Moving to a New Domain!
                  </p>
                  <p className="">
                     We&apos;re excited to inform you that BunkMate is changing
                     its domain from{' '}
                     <span className="text-white">bunkmate.college</span> to{' '}
                     <Link
                        href="https://www.bunkmate.in/"
                        className="font-bold text-white underline"
                     >
                        bunkmate.in
                     </Link>
                  </p>
                  <ul className="list-inside list-disc marker:text-white">
                     <li>
                        The transition will happen soon, and all services will
                        remain available.
                     </li>
                     <li>
                        If you encounter any issues, feel free to reach out to
                        our support team.
                     </li>
                  </ul>
                  <p className="text-white">
                     Thank you for being a part of BunkMate! 🎉
                  </p>
               </div>
               <div className="flex max-sm:mt-[10px] border-t-[1px] mx-[-2vw] p-[0.5vw] border-[#333333] border-solid pr-[2vw]">
                  <div className="flex-1"></div>

                  <button
                     type="submit"
                     onClick={() => {
                        handleClose();
                     }}
                     className="group relative isolation-auto z-10 mx-auto flex items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-gray-500 hover:border-white duration-300 transition bg-emerald-500 px-4 py-2 text-[1.2vw] max-sm:text-[20px] shadow-xl backdrop-blur-md before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-[#ba14fc] before:transition-all before:duration-700 hover:text-gray-50 before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700 lg:font-semibold"
                  >
                     Let&apos;s Go
                     <svg
                        className="size-[2.5vw] max-sm:size-[35px] rotate-45 justify-end rounded-full border border-[#9e9e9e] bg-white p-2 text-gray-50 duration-300 ease-linear group-hover:rotate-90 group-hover:border-none group-hover:bg-gray-50"
                        viewBox="0 0 16 19"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                           className="fill-[#272727] group-hover:fill-gray-800"
                        />
                     </svg>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
