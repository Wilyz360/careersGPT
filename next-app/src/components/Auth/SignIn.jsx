'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useAuth, VIEWS } from 'src/components/AuthProvider';
import supabase from 'src/lib/supabase-browser';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignIn = () => {
  const { setView } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  return (
    <div className="card">
      <button onClick={signInWithGoogle} className="link w-full" type="button">
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;
