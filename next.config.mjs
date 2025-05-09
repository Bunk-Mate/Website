/** @type {import('next').NextConfig} */
const nextConfig = {
   env: {
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
   },
   async redirects() {
      return [
         {
            source: '/lander',
            destination: '/',
            permanent: true,
         },
         {
            source: '/test',
            destination: '/404',
            permanent: true,
         },
         {
            source: '/zindex',
            destination: '/404',
            permanent: true,
         },
         {
            source: '/dashboard/fiddler',
            destination: '/404',
            permanent: true,
         },
      ];
   },
};

export default nextConfig;
