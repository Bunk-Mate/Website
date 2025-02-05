import Logo from '@/public/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import BackToTop from '@/components/svg/back_to_top';
import PopOutButton from '@/components/ui/popout_button';

export default function ContactFooter() {
   return (
      <div className="flex h-screen flex-col bg-white text-black invert">
         <div className="pointer-events-none absolute z-10 flex min-h-screen w-full flex-col items-end">
            <div className="flex w-full items-center text-[4vw] tracking-tighter max-md:mt-[3vw] max-md:text-[10vw]">
               <Image
                  src={Logo}
                  className="h-[5.5vw] w-auto invert max-md:h-[11vw]"
               />
               Bunk-Mate
            </div>
            <div className="flex-1"></div>
            <div className="min-h-[10vh] w-screen bg-gradient-to-t from-white from-20%"></div>
            <div className="pointer-events-auto flex min-h-[35vh] w-screen flex-col items-end bg-white">
               <div className="flex w-full flex-1 p-[2vw] px-[4vw]">
                  <div className="min-w-[15vw]">
                     <p className="text-[2vw] text-[#8a8a8a] max-md:text-[5vw]">
                        A PROJECT BY
                     </p>
                     <p className="ease flex rounded-full px-[1vw] text-[1.5vw] transition duration-300 hover:bg-black hover:text-white max-md:text-[4vw]">
                        <Link
                           href={'https://github.com/amansxcalibur'}
                           className="flex-1"
                        >
                           amansxcalibur
                        </Link>
                     </p>
                     <p className="ease flex rounded-full px-[1vw] text-[1.5vw] transition duration-300 hover:bg-black hover:text-white max-md:text-[4vw]">
                        <Link
                           href={'https://github.com/angrezichatterbox'}
                           className="flex-1"
                        >
                           angrezichatterbox
                        </Link>
                     </p>
                     <p className="ease flex rounded-full px-[1vw] text-[1.5vw] transition duration-300 hover:bg-black hover:text-white max-md:text-[4vw]">
                        <Link
                           href={'https://github.com/hrideshmg'}
                           className="flex-1"
                        >
                           hrideshmg
                        </Link>
                     </p>
                  </div>
                  <div className="flex w-full flex-1 items-end justify-center text-black">
                     <BackToTop />
                  </div>
                  <div className="min-w-[15vw]">
                     <p className="text-[2vw] text-[#8a8a8a] max-md:text-[5vw]">
                        GitHub
                     </p>
                     <p className="ease flex rounded-full px-[1vw] text-[1.5vw] transition duration-300 hover:bg-black hover:text-white max-md:text-[4vw]">
                        <Link
                           href={'https://github.com/Bunk-Mate/.github'}
                           className="flex-1"
                        >
                           Bunk-Mate
                        </Link>
                     </p>
                     <p className="ease flex rounded-full px-[1vw] text-[1.5vw] transition duration-300 hover:bg-black hover:text-white max-md:text-[4vw]">
                        <Link
                           href={'https://github.com/Bunk-Mate/Mobile-App'}
                           className="flex-1"
                        >
                           Mobile App
                        </Link>
                     </p>
                  </div>
               </div>
               <div
                  id="end"
                  className="w-full p-[1vw] text-[1vw] text-[#8a8a8a] max-md:text-[3vw]"
               >
                  &copy;2024, Bunk-Mate. All Rights Probably NOT Reserved
               </div>
            </div>
         </div>
         <div className="-ml-[15vw] flex max-h-screen flex-1 flex-col overflow-hidden bg-white tracking-tight">
            <div className="ml-[80vw] mt-[2.1vh] flex h-[12vh]">
               <Insider />
            </div>
            <div className="flex h-[12vh] max-md:-ml-[30vw]">
               <Insider />
            </div>
            <div className="ml-[18vh] flex h-[12vh] max-md:-ml-[10vw]">
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="flex min-w-[15vw] rounded-full max-md:min-w-[40vw]">
                  <PopOutButton
                     href={'/registration'}
                     mssg={'Get started now?'}
                  />
               </div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
            </div>
            <div className="ml-[5vh] flex h-[12vh] max-md:-ml-[20vw]">
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:hidden max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:hidden max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:hidden max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:hidden max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="flex min-w-[20vw] rounded-full max-md:min-w-[45vw]">
                  <PopOutButton
                     href={'https://github.com/Bunk-Mate/Mobile-App'}
                     mssg={'We also have an app'}
                  />
               </div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
            </div>
            <div className="ml-[15vh] flex h-[12vh] max-md:-ml-[10vw]">
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:hidden max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="flex min-w-[15vw] rounded-full max-md:min-w-[40vw]">
                  <PopOutButton
                     href={'https://github.com/Bunk-Mate/Website/issues'}
                     mssg={'Found any bugs?'}
                  />
               </div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
               <div className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"></div>
            </div>
            <div className="ml-[3vh] flex h-[12vh]">
               <Insider />
            </div>
            <div className="ml-[10vh] flex h-[12vh]">
               <Insider />
            </div>
            <div className="flex h-[12vh]">
               <Insider />
            </div>
            <div className="ml-[15vh] flex h-[12vh]">
               <Insider />
            </div>
            <div className="ml-[5vh] flex h-[12vh]">
               <Insider />
            </div>
         </div>
      </div>
   );
}

function Insider() {
   return (
      <>
         {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((iter) => (
            <div
               key={iter.id}
               className="ml-[0.1vh] mt-[0.1vh] min-w-[15vw] rounded-full border-[0.5vh] border-solid border-black bg-black max-md:min-w-[40vw]"
            ></div>
         ))}
      </>
   );
}
