import Link from 'next/link';

export default function PopOutButton({ href, mssg }) {
   return (
      <Link
         href={href}
         className="active:translate-x-0.25 ml-[0.1vh] mt-[0.1vh] w-full rounded-full border shadow-none transition-all duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-1 hover:transform hover:shadow-[2px_4px_0_0_black] active:translate-y-0.5 active:transform active:shadow-none"
      >
         <p className="flex h-full items-center justify-center rounded-full border-[0.5vh] border-solid border-black bg-[#ff61ff] text-[1.25vw] max-md:text-[4vw]">
            {mssg}
         </p>
      </Link>
   );
}
