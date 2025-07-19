import Image from 'next/image';

export default function RankedBunking() {
   return (
      <div className="flex h-full flex-col items-center justify-center text-white">
         <div className="mt-[-5vw]"></div>
         <div className="flex items-center justify-center">
            <div className="flex flex-col">
               <Image
                  src={'/assets/construction.png'}
                  width={1}
                  height={1}
                  alt="construction-har"
                  className="relative z-20 mb-[-4.5vw] ml-[-0.3vw] max-h-[5vw] w-auto -rotate-12 transition duration-300 hover:translate-x-[-1.5vw] hover:-rotate-45 max-sm:mb-[-55px] max-sm:ml-[-6px] max-sm:max-h-[65px] max-sm:hover:translate-x-[-20px]"
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
            </div>
            <p className="text-2xl max-sm:-mt-32 max-sm:text-xl">
               Ranked bunking <br />
               will be coming soon..
            </p>
         </div>
      </div>
   );
}
