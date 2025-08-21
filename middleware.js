import { ACCESS_TOKEN_NAME, API_BASE_URL } from '@/app/_utils/api_constants';
import { NextResponse } from 'next/server';

// this middleware is not used as of now, I have to figure out how to bypass cloudflare wrongly caching the raw RSC payload

export async function middleware(request) {
   const token = request.cookies.get(ACCESS_TOKEN_NAME)?.value;

   const setToastCookie = (message) => {
      const url = new URL('/login', request.url);
      url.searchParams.set('_', Date.now().toString());
      const response = NextResponse.redirect(url);
      response.cookies.set('toastMessage', message, {
         path: '/',
         httpOnly: false,
         maxAge: 10, // short-lived
      });
      return response;
   };

   const setNoCacheHeader = (res) => {
      res.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.headers.set('Pragma', 'no-cache');
      res.headers.set('Expires', '0');
      return res;
   };

   try {
      const response = await fetch(API_BASE_URL + '/courses', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + token,
         },
      });

      if (response.status === 200) {
         return setNoCacheHeader(
            NextResponse.redirect(new URL('/dashboard/home', request.url))
         );
         // return setToastCookie(
         //    'This is a test, i hope this works ' + response.status
         // );
      } else if (response.status === 404) {
         const res = NextResponse.redirect(new URL('/add', request.url));
         res.cookies.set('toastMessage', 'You are on the right path!', {
            path: '/',
            httpOnly: false,
            maxAge: 10,
         });
         return setNoCacheHeader(res);
      } else {
         return setToastCookie(
            'Something went wrong. Error status ' + response.status
         );
      }
   } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
         return setToastCookie('You are not logged in');
      } else if (status === 404) {
         return setNoCacheHeader(
            NextResponse.redirect(new URL('/add', request.url))
         );
      } else {
         return setToastCookie('Something went wrong');
      }
   }
}

export const config = {
   // matcher: ['/dashboard'],
   matcher: [],
};
