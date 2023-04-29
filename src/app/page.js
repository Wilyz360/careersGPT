'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Router from 'next/router';

import Auth from 'src/components/Auth';
import { useAuth, VIEWS } from 'src/components/AuthProvider';

import supabase from '../lib/supabase-browser';

export default function Home() {
  const { initial, user, userInfo, view, signOut } = useAuth();

  const [resume, setResume] = useState(null);
  const [shortStory, setShortStory] = useState('');
  const router = useRouter();

  const areBothFieldsFilled = (story, file) => {
    return !story || !file;
  };

  const handleSubmit = async () => {
    const { error } = await supabase
      .from('resumes')
      .insert({ resume_info: resume, short_story: shortStory, user_id: user?.id })
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          console.log('success');
        }
      });
    if (error) throw error;
    console.log(error);
  };

  const handleStoryChange = (e) => {
    setShortStory(e.target.value);
    console.log(shortStory);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.value);
    console.log(resume);
  };
  console.log(user);
  console.log(userInfo);

  if (userInfo) {
    console.log(userInfo);
  }

  if (initial) {
    return <div className="card h-72">Loading...</div>;
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    return (
      <div className="w-full">
        {!userInfo[0] ? (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <p className="highlight">
              We need your resume and a short story. This will help GPT to make more
              human-like cover letters. <br />
              Please update empty fields:
            </p>
            <pre>{JSON.stringify(user)}</pre>

            <label htmlFor="shortStory">Short Story:</label>
            <textarea
              rows={10}
              type="text"
              id="shortStory"
              onChange={handleStoryChange}
            />
            <label htmlFor="resume">Upload resume:</label>
            <textarea id="resume" type="text" onChange={handleResumeChange} cols={10} />
            <input
              className="p-2 ring-1 ring-black disabled:opacity-20"
              disabled={areBothFieldsFilled(shortStory, resume)}
              type="submit"
            />
          </form>
        ) : (
          <>
            <h2>You are ready to use CareersGPT!</h2>
            {userInfo[0] && (
              <div className="flex w-full flex-col items-center">
                <p className="m-2 w-[50%] bg-black p-2 text-white">
                  {userInfo[0].resume_info}
                </p>
                <p className="m-2 w-[50%] bg-black p-2 text-white">
                  {userInfo[0].short_story}
                </p>
              </div>
            )}
          </>
        )}
        <Link className="button" href="/profile">
          Go to Profile
        </Link>
        <button type="button" className="button-inverse" onClick={signOut}>
          Sign Out
        </button>
      </div>
    );
  }

  return <Auth view={view} />;
}

// const IsData = (isResume, isShortStory, user) => {
//   return <h1>Profile completed, you can apply for jobs.</h1>;
// };
