import Link from 'next/link';
import Image from 'next/image';
import Cat from '../../_assets/cat_pointing.jpg';

export default function ForgotPass() {
   return (
      <div className="h-screen">
         <p className="p-4 text-xl">
            <Link href="/login">
               <u>Go back to login</u>
            </Link>
         </p>
         <div className="w-full p-4">
            <p className="text-xl">Forgotten your password huh..</p>
            <p>
               Either do drugs and lock-in to remember that password or you can
               create a new account and start over.
            </p>
         </div>
         <div className="flex justify-center">
            <Image src={Cat} />
         </div>
      </div>
   );
}
