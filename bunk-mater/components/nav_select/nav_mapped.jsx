import NavSelect from './nav_select';
import Link from 'next/link';

export default function NavMapped({ option, href, pathname }) {
   return (
      <>
         {pathname == href ? (
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
            <div className="ml-2 rounded-3xl bg-[#232222] p-[1vw]">
               <Link href={href}>
                  <button type="submit">{option}</button>
               </Link>
            </div>
         )}
      </>
   );
}

{
   /* <li>
    {slant=="Table"?
    <div className="mb-[-0.5vw]">
        <NavSelect props={
            <Link className="px-[2vw] mt-[-0.5vw]" href="/dashboard/table">
                <button type="submit" onClick={()=>{tabUpdate("Table")}}>Table</button>
            </Link>
        }/>
    </div>:
    <div className="p-[1vw] bg-[#232222] rounded-3xl ml-2">
        <Link href="/dashboard/table">
            <button type="submit" onClick={()=>{tabUpdate("Table")}}>Table</button>
        </Link>
    </div>
    }
</li> */
}
