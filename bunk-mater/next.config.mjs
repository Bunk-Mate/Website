/** @type {import('next').NextConfig} */
const nextConfig = {
   async redirects() {
      return [
         {
            source: '/',
            destination: '/lander',
            permanent: true,
         },
         {
            source: '/lander/test',
            destination: '/404',
            permanent: true,
         },
         {
            source: '/lander/zindex',
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
