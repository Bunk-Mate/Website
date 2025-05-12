import { ACCESS_TOKEN_NAME, API_BASE_URL } from './app/_utils/apiConstants';
import { NextResponse } from 'next/server';

export async function middleware(request) {
   const token = request.cookies.get(ACCESS_TOKEN_NAME)?.value;
   try {
      const response = await fetch(API_BASE_URL + '/courses', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + token,
         },
      });
      if (response.status === 200) {
         return NextResponse.redirect(new URL('/dashboard/home', request.url));
      } else if (response.status == 404) {
         return NextResponse.redirect(new URL('/add', request.url));
      } else {
         return NextResponse.redirect(new URL('/login', request.url));
      }
   } catch (error) {
      if (error.response.status == 401) {
         return NextResponse.redirect(new URL('/login', request.url));
      }
      if (error.response.status == 404) {
         return NextResponse.redirect(new URL('/add', request.url));
      } else {
         return NextResponse.redirect(new URL('/login', request.url));
         // display error via notif
      }
   }
}

export const config = {
   matcher: ['/dashboard'],
};
