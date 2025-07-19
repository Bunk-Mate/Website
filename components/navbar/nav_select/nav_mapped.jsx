import NavSelect from '@/components/navbar/nav_select/nav_select';
import Link from 'next/link';

export default function NavMapped({ option, href, pathname }) {
   return (
      <>
         {pathname == href || pathname == '/dashboard/edit' ? (
            <div className="mb-[-0.5vw]">
               <NavSelect
                  props={
                     <Link className="mt-[-0.5vw] px-[2vw]" href={href}>
                        <button type="submit">{option}</button>
                     </Link>
                  }
               />
            </div>
         ) : (
            <div className="ml-2 flex overflow-hidden rounded-3xl bg-[#232222]">
               <Link href={href} className="flex-1 p-[1vw]">
                  <button type="submit">{option}</button>
               </Link>
            </div>
         )}
      </>
   );
}
