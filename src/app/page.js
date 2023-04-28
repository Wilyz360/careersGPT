'use client';

import { useState } from 'react';
import Link from 'next/link';

import Auth from 'src/components/Auth';
import { useAuth, VIEWS } from 'src/components/AuthProvider';

import supabase from '../lib/supabase-browser';

export default function Home() {
  const { initial, user, userInfo, view, signOut } = useAuth();

  const [resume, setResume] = useState(null);
  const [shortStory, setShortStory] = useState('');

  const areBothFieldsFilled = (story, file) => {
    return !story || !file;
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .update({ resume_info: resume, short_story: shortStory })
        .eq('user_id', user?.id);
      if (error) throw error;
      if (data) console.log(data);
    } catch (error) {
      alert(error.message);
    }
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

  if (
    user &&
    userInfo[0].resume_info.length === 0 &&
    userInfo[0].short_story.length === 0
  ) {
    return (
      <div className="w-full">
        <pre>{JSON.stringify(user?.id)}</pre>
        <div className="m-10 flex flex-col">
          <p className="highlight">
            {' '}
            We need your resume and a short story. Please update empty fields:{' '}
          </p>
          <p>user inside isData component:</p>
          <pre>{JSON.stringify(user)}</pre>
          <label htmlFor="shortStory">Short Story:</label>
          <textarea rows={10} type="text" id="shortStory" onChange={handleStoryChange} />
          <label htmlFor="resume">Upload resume:</label>
          <textarea id="resume" type="text" onChange={handleResumeChange} cols={10} />
          <button
            className="p-2 ring-1 ring-black disabled:opacity-20"
            disabled={areBothFieldsFilled(shortStory, resume)}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <p className="m-2 bg-black p-2 text-white">{userInfo[0].resume_info}</p>
        <p className="m-2 bg-black p-2 text-white">{userInfo[0].short_story}</p>
        <div className="flex flex-col">
          <h2>Welcome!</h2>
          <code className="highlight">{user.role}</code>
          <Link className="button" href="/profile">
            Go to Profile
          </Link>
          <button type="button" className="button-inverse" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return <Auth view={view} />;
}

// const IsData = (isResume, isShortStory, user) => {
//   return <h1>Profile completed, you can apply for jobs.</h1>;
// };
