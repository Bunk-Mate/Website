import RewindTime from '@/public/assets/rewind_time.png';
import Statusman from '@/public/assets/statusman.png';
import CoursesDropped from '@/public/assets/courses_drop_cropped.png';
import Image from 'next/image';

export default function Feature() {
   return (
      <>
         <div className="grid max-h-[210vw] max-w-[100vw] grid-flow-col grid-rows-8 justify-center overflow-hidden max-md:hidden">
            {/* Feature 1 */}
            <div className="grid min-w-[140vw] max-w-[140vw] grid-cols-5">
            <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-bl from-[#1c1c1c73] transition hover:bg-[#1c1c1c73]"></div>
               <div className="flex size-full items-end border border-solid border-[#1c1c1c] bg-[#1c1c1c]">
                  <p className="m-[2vw] flex-1 break-normal text-[1.5vw]">
                     Add and edit your timetable
                  </p>
               </div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-l from-[#1c1c1c73] transition hover:bg-[#1c1c1c73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>

            <div className="grid min-w-[140vw] max-w-[140vw] grid-cols-5">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-l from-[#1c1c1c73] transition hover:bg-[#1c1c1c73]"></div>
               <div className="size-full overflow-hidden border border-solid border-[#1c1c1c] bg-[#1c1c1c] transition hover:bg-[#1c1c1c73]">
                  <Image
                     src={CoursesDropped}
                     alt="courses-dropped image"
                     className="size-full object-none object-center transition hover:scale-105"
                  />
               </div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-r from-[#1c1c1c73] transition hover:bg-[#1c1c1c73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>

            {/* Feature 2 */}
            <div className="grid min-w-[140vw] max-w-[140vw] grid-cols-5">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-br from-[#1c1c1c73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-tl from-[#33000073] transition hover:bg-[#33000073]"></div>
               <div className="flex size-full items-end border border-solid border-[#1c1c1c] bg-[#330000]">
                  <p className="m-[2vw] flex-1 break-normal text-[1.5vw]">
                     Choose which day&apos;s course status to change
                  </p>
               </div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-br from-[#33000073] transition hover:bg-[#33000073]"></div>
            </div>

            <div className="grid min-w-[140vw] max-w-[140vw] grid-cols-5">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-l from-[#33000073] transition hover:bg-[#33000073]"></div>
               <div className="size-full overflow-hidden border border-solid border-[#1c1c1c]">
                  <Image
                     src={RewindTime}
                     alt="rewind time image"
                     className="size-full object-none object-center transition hover:scale-105"
                  />
               </div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-r from-[#33000073] transition hover:bg-[#33000073]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>

            {/* Feature 3 */}
            <div className="grid min-w-[140vw] max-w-[140vw] grid-cols-5">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-tr from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-tl from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>

            <div className="grid min-w-[140vw] max-w-[140vw] grid-cols-5">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-l from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="flex size-full flex-col items-center justify-center overflow-hidden border border-solid border-[#1c1c1c] bg-[#1c1c1c]">
                  <Image
                     src={Statusman}
                     alt="statusman image"
                     className="size-full object-none object-center transition hover:scale-105"
                  />
               </div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-r from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>

            <div className="grid min-w-[140vw] max-w-[140vw] grid-cols-5">
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-bl from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-[#0f240d]">
                  <p className="m-[2vw] flex-1 break-normal text-[1.5vw]">
                     Update your attendance for each course
                  </p>
               </div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-bl from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>

            <div className="grid min-w-[140vw] max-w-[140vw] grid-cols-5">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-bl from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>
         </div>

         {/* Mobile */}
         <div className="grid max-h-[300vw] max-w-[100vw] grid-flow-col grid-rows-7 justify-center overflow-hidden md:hidden">
            {/* Feature 1 */}
            <div className="grid min-w-[180vw] max-w-[180vw] grid-cols-4">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-l from-[#1c1c1c73] transition hover:bg-[#1c1c1c73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>
            <div className="grid min-w-[180vw] max-w-[180vw] grid-cols-4">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full overflow-hidden border border-solid border-[#1c1c1c] bg-[#1c1c1c] transition hover:bg-[#1c1c1c73]">
                  <Image
                     src={CoursesDropped}
                     alt="courses-dropped image"
                     className="size-full object-cover object-center transition hover:scale-105"
                  />
               </div>
               <div className="flex size-full items-end border border-solid border-[#1c1c1c] bg-[#1c1c1c]">
                  <p className="m-[2vw] flex-1 break-normal text-[5vw]">
                     Add and edit your timetable
                  </p>
               </div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>
            <div className="grid min-w-[180vw] max-w-[180vw] grid-cols-4">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-br from-[#1c1c1c73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-tl from-[#33000073] transition hover:bg-[#33000073]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>

            {/* Feature 2 */}
            <div className="grid min-w-[180vw] max-w-[180vw] grid-cols-4">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="flex size-full items-end border border-solid border-[#1c1c1c] bg-[#330000]">
                  <p className="m-[2vw] flex-1 break-normal text-[5vw]">
                     Choose which day&apos;s course status to change
                  </p>
               </div>
               <div className="size-full overflow-hidden border border-solid border-[#1c1c1c]">
                  <Image
                     src={RewindTime}
                     alt="rewind time image"
                     className="h-full w-auto object-cover object-center transition hover:scale-105"
                  />
               </div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>
            <div className="grid min-w-[180vw] max-w-[180vw] grid-cols-4">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-tl from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>

            {/* Feature 3 */}
            <div className="grid min-w-[180vw] max-w-[180vw] grid-cols-4">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="flex size-full flex-col items-center justify-center overflow-hidden border border-solid border-[#1c1c1c] bg-[#1c1c1c]">
                  <Image
                     src={Statusman}
                     alt="statusman image"
                     className="size-full object-cover object-center transition hover:scale-105"
                  />
               </div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-[#0f240d]">
                  <p className="m-[2vw] flex-1 break-normal text-[5vw]">
                     Update your attendance for each course
                  </p>
               </div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>
            <div className="grid min-w-[180vw] max-w-[180vw] grid-cols-4">
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c] bg-gradient-to-bl from-[#0f240d73] transition hover:bg-[#0f240d73]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
               <div className="size-full border border-solid border-[#1c1c1c]"></div>
            </div>
         </div>
      </>
   );
}
