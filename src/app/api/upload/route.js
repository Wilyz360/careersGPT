import supabase from '@/lib/supabase-browser';
import { NextResponse } from 'next/server';
// import supabaseServer from '../../../lib/supabase-server';

// export async function GET(request) {
//   return new Response('hi');
// }

export async function GET() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

  const data = await res.json();

  return NextResponse.json(data);
}

export async function POST(req) {
  const { user, rsm, story } = req.body;
  if (!user || !rsm || !story) {
    return NextResponse.error({
      status: 400,
      message: 'Missing required fields',
    });
  }
  const { data, error } = await supabase
    .from('resumes')
    .update({ resume: rsm, short_story: story })
    .eq('user_id', user);
  if (error) {
    return NextResponse.error(error);
  }
  return NextResponse.json(data);
}
