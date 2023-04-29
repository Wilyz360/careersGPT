'use client';

import { useState } from 'react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

import Auth from 'src/components/Auth';
import { useAuth, VIEWS } from 'src/components/AuthProvider';

import supabase from '../../lib/supabase-browser';

export default function Home() {
  const { initial, user, userInfo, view, signOut } = useAuth();
  const [url, setUrl] = useState('');

  const handleApply = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/post', {
      method: 'POST',
      body: JSON.stringify({
        test: 'test',
      }),
    }).then((res) => {
      console.log(res);
    });
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    console.log(url);
  };
  console.log(user);
  console.log('lol');

  if (userInfo) {
    console.log(userInfo);
  }

  if (initial) {
    return <div className="card h-72">Loading...</div>;
  }

  if (!user?.id) {
    return redirect('/');
  }
  return (
    <div className="w-full items-center justify-center">
      <form className="flex flex-col items-center" onSubmit={handleApply}>
        <label className="mb-8 text-xl" htmlFor="url">
          Input URL of job to apply to:
        </label>
        <input className="w-full" id="url" type="text" onChange={handleUrlChange} />
        <input className="button-inverse mt-6 max-w-fit" type="submit" />
      </form>
    </div>
  );
}
