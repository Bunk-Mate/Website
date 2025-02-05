import RewindTime from '@/public/assets/rewind_time.png';
import Statusman from '@/public/assets/statusman.png';
import CoursesDropped from '@/public/assets/courses_drop_cropped.png';
import Image from 'next/image';

export default function Feature() {
   return (
      <>
         <div className="grid max-h-[210vw] grid-flow-col grid-rows-7 justify-center max-md:hidden">
            <div className="grid max-w-[90vw] grid-cols-3">
               <div className="flex h-full w-full items-end border-[1px] border-solid border-[#1c1c1c] bg-[#1c1c1c]">
                  <p className="m-[2vw] flex-1 break-normal text-[1.5vw]">
                     Add and edit your timetable
                  </p>
               </div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-l from-[#1c1c1c73] transition hover:bg-[#1c1c1c73]"></div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c]"></div>
            </div>
            <div className="grid min-w-[80vw] max-w-[90vw] grid-cols-3">
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-l from-[#1c1c1c73] transition hover:bg-[#1c1c1c73]"></div>
               <div className="h-full w-full overflow-hidden border-[1px] border-solid border-[#1c1c1c] bg-[#1c1c1c] transition hover:bg-[#1c1c1c73]">
                  <Image
                     src={CoursesDropped}
                     className="h-full w-full object-none object-center transition hover:scale-[1.05]"
                  />
               </div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-r from-[#1c1c1c73] transition hover:bg-[#1c1c1c73]"></div>
            </div>
            <div className="grid max-w-[90vw] grid-cols-3">
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-br from-[#1c1c1c73]"></div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-tl from-[#33000073] transition hover:bg-[#33000073]"></div>
               <div className="flex h-full w-full items-end border-[1px] border-solid border-[#1c1c1c] bg-[#330000]">
                  <p className="m-[2vw] flex-1 break-normal text-[1.5vw]">
                     Choose which day’s course status to change
                  </p>
               </div>
            </div>
            <div className="grid max-w-[90vw] grid-cols-3">
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-l from-[#33000073] transition hover:bg-[#33000073]"></div>
               <div className="h-full w-full overflow-hidden border-[1px] border-solid border-[#1c1c1c]">
                  <Image
                     src={RewindTime}
                     className="h-full w-full object-none object-center transition hover:scale-[1.05]"
                  />
               </div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-r from-[#33000073] transition hover:bg-[#33000073]"></div>
            </div>
            <div className="grid max-w-[90vw] grid-cols-3">
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c]"></div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-tr from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-tl from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
            </div>
            <div className="grid max-w-[90vw] grid-cols-3">
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-l from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden border-[1px] border-solid border-[#1c1c1c] bg-[#1c1c1c]">
                  <Image
                     src={Statusman}
                     className="h-full w-full object-none object-center transition hover:scale-[1.05]"
                  />
               </div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-r from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
            </div>
            <div className="grid max-w-[90vw] grid-cols-3">
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-[#0f240d]">
                  <p className="m-[2vw] flex-1 break-normal text-[1.5vw]">
                     Update your attendance for each course
                  </p>
               </div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-bl from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c]"></div>
            </div>
         </div>
         <div className="grid max-h-[300vw] grid-flow-col grid-rows-7 justify-center md:hidden">
            <div className="grid max-w-[90vw] grid-cols-2">
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-l from-[#1c1c1c73] transition hover:bg-[#1c1c1c73]"></div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c]"></div>
            </div>
            <div className="grid min-w-[80vw] max-w-[90vw] grid-cols-2">
               <div className="h-full w-full overflow-hidden border-[1px] border-solid border-[#1c1c1c] bg-[#1c1c1c] transition hover:bg-[#1c1c1c73]">
                  <Image
                     src={CoursesDropped}
                     className="h-full w-full object-cover object-center transition hover:scale-[1.05]"
                  />
               </div>
               <div className="flex h-full w-full items-end border-[1px] border-solid border-[#1c1c1c] bg-[#1c1c1c]">
                  <p className="m-[2vw] flex-1 break-normal text-[5vw]">
                     Add and edit your timetable
                  </p>
               </div>
            </div>
            <div className="grid max-w-[90vw] grid-cols-2">
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-br from-[#1c1c1c73]"></div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-tl from-[#33000073] transition hover:bg-[#33000073]"></div>
            </div>
            <div className="grid max-w-[90vw] grid-cols-2">
               <div className="flex h-full w-full items-end border-[1px] border-solid border-[#1c1c1c] bg-[#330000]">
                  <p className="m-[2vw] flex-1 break-normal text-[5vw]">
                     Choose which day’s course status to change
                  </p>
               </div>
               <div className="h-full w-full overflow-hidden border-[1px] border-solid border-[#1c1c1c]">
                  <Image
                     src={RewindTime}
                     className="h-full w-auto object-cover object-center transition hover:scale-[1.05]"
                  />
               </div>
            </div>
            <div className="grid max-w-[90vw] grid-cols-2">
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c]"></div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-tl from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
            </div>
            <div className="grid max-w-[90vw] grid-cols-2">
               <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden border-[1px] border-solid border-[#1c1c1c] bg-[#1c1c1c]">
                  <Image
                     src={Statusman}
                     className="h-full w-full object-cover object-center transition hover:scale-[1.05]"
                  />
               </div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-[#0f240d]">
                  <p className="m-[2vw] flex-1 break-normal text-[5vw]">
                     Update your attendance for each course
                  </p>
               </div>
            </div>
            <div className="grid max-w-[90vw] grid-cols-2">
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c] bg-gradient-to-bl from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="h-full w-full border-[1px] border-solid border-[#1c1c1c]"></div>
            </div>
         </div>
      </>
      // <div className="flex flex-col justify-center">
      //     <div className="flex justify-start">
      //     <Image src={CoursesDropped} className="w-[20vw] h-auto"/>
      //     <p>Add and edit your timetable</p>
      //     </div>
      //     <div className="flex justify-end">
      //     <p>Choose which day’s course status to change</p>
      //     <Image src={RewindTime} className="w-[20vw] h-auto"/>
      //     </div>
      //     <div className="flex justify-start">
      //     <Image src={Statusman} className="w-[20vw] h-auto"/>
      //     <p>Update your attendance for each course</p>
      //     </div>
      // </div>
   );
}
