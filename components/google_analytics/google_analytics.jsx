'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const GoogleAnalytics = () => {
   useEffect(() => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
         window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', process.env.NEXT_PUBLIC_GA_ID);
   }, []);

   return (
      <>
         <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
         />
         <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
         </Script>
      </>
   );
};
export default GoogleAnalytics;
