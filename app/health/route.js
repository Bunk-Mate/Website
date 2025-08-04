export async function GET() {
   return new Response('OK', {
      status: 200,
      headers: {
         'Cache-Control': 'no-store, no-cache, must-revalidate',
         Pragma: 'no-cache',
      },
   });
}
