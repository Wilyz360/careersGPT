import supabase from './supabase-browser';

export const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const useUserData = async (userId) => {
  const { data, error } = await supabase.from('resumes').select().eq('user_id', userId);
  return { data, error };
};
