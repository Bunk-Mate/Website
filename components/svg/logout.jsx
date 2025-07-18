export default function Logout() {
   return (
      <div className="group relative flex size-11 cursor-pointer items-center justify-start overflow-hidden rounded-full bg-[#232222] shadow-lg transition-all duration-200 hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1 sm:size-[4vw] sm:hover:w-[8.5vw]">
         <div className="flex w-full items-center justify-center transition-all duration-300 group-hover:justify-start group-hover:px-3">
            <svg
               //class="w-4 h-4"
               className="size-[1.5vw]"
               viewBox="0 0 512 512"
               fill="white"
            >
               <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
         </div>
         <div className="absolute right-5 translate-x-full text-lg font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:right-[0.8vw] sm:text-[1.5vw] sm:font-normal">
            Logout
         </div>
      </div>
   );
}
