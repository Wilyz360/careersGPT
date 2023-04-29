'use client';

import { useState } from 'react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

import Auth from 'src/components/Auth';
import { useAuth, VIEWS } from 'src/components/AuthProvider';

import supabase from '../lib/supabase-browser';

export default function Home() {
  const { initial, user, userInfo, view, signOut } = useAuth();

  if (!user) {
    return redirect('/');
  }
  return (
    <div className="items-center justify-center w-full">
      <form onSubmit={}>
        <label>
            Input URL of job to apply to:
            <input type='text'/>
        </label>
        <input type='submit'/>

      </form>
    </div>
  );
}

// const IsData = (isResume, isShortStory, user) => {
//   return <h1>Profile completed, you can apply for jobs.</h1>;
// };
