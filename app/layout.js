import { Urbanist } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/google_analytics/google_analytics';
import { UserProvider } from '@/app/_contexts/user_name';
import { NotificationProvider } from './_contexts/notification';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata = {
   title: 'BunkMate - Here to serve all your bunking needs',
   description:
      'Say goodbye to manual calculations and attendance anxiety — BunkMate helps you track your attendance and plan the safest bunks with confidence.',
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <head>
            <link rel="icon" href="/icon.png" sizes="any" />
            <link rel="alternate" hreflang="en" href="www.bunkmate.in" />
            <link
               rel="alternate"
               hreflang="x-default"
               href="https://www.bunkmate.in/"
            />
         </head>
         <body className={urbanist.className}>
            <GoogleAnalytics />
            <NotificationProvider>
               <UserProvider>{children}</UserProvider>
            </NotificationProvider>
         </body>
      </html>
   );
}
