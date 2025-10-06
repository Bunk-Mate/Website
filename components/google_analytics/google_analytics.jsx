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
            src={"https://cloud.umami.is/script.js"}
            data-website-id="7c50d97b-bfce-4831-a9d6-e69c479c097b"
         />
      </>
   );
};
export default GoogleAnalytics;
