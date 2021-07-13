import { supabase } from './supabase';

/**
 * @param {String} theme 'light' || 'dark'
 */
export const toggleTheme = (theme) => {
  theme === 'dark'
    ? window.localStorage.setItem('theme', 'light')
    : window.localStorage.setItem('theme', 'dark');

  // theme == 'light' ? setTheme('dark') : setTheme('light');
  if (theme === 'light') {
    return 'dark';
  } else {
    return 'light';
  }
};

/**
 *
 * @param {String} type Course, ...
 * @param {Object} item course object
 * @param {Object} profile
 * @returns
 */
export const subscribe = async (type, item, profile) => {
  let balance = profile.balance;
  let price = item.price;

  if (balance < price)
    return {
      data: null,
      error: {
        message: 'Saldo insuficiente.',
      },
    };

  const body = {
    course_id: item.id,
    profile_id: profile.id,
  };

  const { data, error } = await supabase.from('user_courses').insert([body]);
  if (error) return { data, error };

  const new_body = {
    balance: profile.balance - price,
    updated_at: new Date(),
  };

  const { data: data_update, error: error_update } = await supabase
    .from('profiles')
    .update(new_body)
    .eq('id', profile.id);

  if (error) return { data: data_update, error: error_update };

  return { data: data_update, error };
};

export const paymentRecords = async (item, profile) => {
  const body = {
    course_id: item.id,
    value: item.price,
    profile_id: profile.id,
  };

  const { data, error } = await supabase.from('user_payments').insert([body]);
  return { data, error };
};

/**
 *
 * @param {String} username
 * @returns returns username with @ at beginning
 */
export const formatUsername = (username) => {
  let at = username.startsWith('@');
  if (at) return username;
  if (!at) return `@${username}`;
};
