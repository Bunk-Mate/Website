import { Urbanist } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/google_analytics/google_analytics';
import { UserProvider } from '@/app/_contexts/user_name';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata = {
   title: 'Bunk-Mate',
   description: 'An attendance tracker',
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <head>
            <link rel="icon" href="/icon.png" sizes="any" />
         </head>
         <body className={urbanist.className}>
            Hello everynyan this is a test so please pay no head heyhey
            <GoogleAnalytics />
            <UserProvider>{children}</UserProvider>
         </body>
      </html>
   );
}
