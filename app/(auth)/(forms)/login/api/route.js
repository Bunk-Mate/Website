import { NextResponse } from 'next/server';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '@/app/_utils/apiConstants';

export async function POST(req) {
   const { username, password } = await req.json();
   console.log('here you go ', username, password, req);

   const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
   });

   if (response.status === 202) {
      const data = await response.json();

      const res = NextResponse.json(
         { success: true, data: { token: data.token } },
         { status: 202 }
      );

      res.cookies.set(ACCESS_TOKEN_NAME, data.token, {
         httpOnly: true,
         secure: true,
         sameSite: 'strict',
         path: '/',
         maxAge: 60 * 60 * 24 * 7,
      });

      return res;
   }

   return NextResponse.json({ success: false }, { status: 401 });
}
