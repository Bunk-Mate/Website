import Image from 'next/image';
import Chinchilla from '../../_assets/chinchilla.gif';
import Link from 'next/link';

export default function TermsAndCond() {
   return (
      <div className="flex h-screen flex-col">
         <p className="p-4 text-xl">
            <Link href="/registration">
               <u>Go back to registration</u>
            </Link>
         </p>
         <div className="flex flex-1 items-center justify-center">
            <Image src={Chinchilla} />
         </div>
      </div>
   );
}
