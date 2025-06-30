import { scrollToHash } from '@/app/_utils/helpers';

export default function BackToTop() {
   return (
      <button
         onClick={() => {
            scrollToHash('hero');
         }}
         className="group relative h-[3.9vw] w-[9vw] cursor-pointer overflow-hidden border-none bg-transparent pb-8 text-[1.5vw] text-black max-md:text-[4vw] max-sm:h-14 max-sm:w-36"
      >
         <div className="absolute flex size-full">
            <span className="ml-1 opacity-100 transition-opacity group-hover:translate-y-[-60px]">
               Back
            </span>
            <span className="ml-1 opacity-100 transition-opacity group-hover:translate-y-[-60px]">
               to
            </span>
            <span className="ml-1 opacity-100 transition-opacity group-hover:translate-y-[-60px]">
               top
            </span>
         </div>
         <div className="absolute flex size-full">
            <span className="ml-1 translate-y-[60px] opacity-100 transition-all delay-150 group-hover:translate-y-0">
               Back
            </span>
            <span className="ml-1 translate-y-[60px] opacity-100 transition-all delay-200 group-hover:translate-y-0">
               to
            </span>
            <span className="ml-1 translate-y-[60px] opacity-100 transition-all delay-[250ms] group-hover:translate-y-0">
               top
            </span>
         </div>
         <svg
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute right-0 top-1/2 size-[1.5vw] -translate-y-1/2 rotate-[-50deg] transition-all duration-200 ease-out group-hover:-rotate-90 max-sm:size-5"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M14 5l7 7m0 0l-7 7m7-7H3"
               strokeLinejoin="round"
               strokeLinecap="round"
            ></path>
         </svg>
         <span className="absolute bottom-0 left-0 h-0.5 w-full origin-bottom-right scale-x-0 bg-current transition-transform duration-200 ease-out group-hover:origin-bottom-left group-hover:scale-x-100"></span>
      </button>
   );
}
