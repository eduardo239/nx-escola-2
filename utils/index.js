import { supabase } from './supabase';
import moment from 'moment';
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

/**
 *
 * @param {Object} profile of user
 * @param {enum} add add || sub
 * @param {Float} value float
 * @returns data and error
 */
export const addBalance = async (profile, add, v) => {
  let current_balance = parseFloat(profile.balance);
  let value = parseFloat(v);
  let amount = 0;

  if (add === 'add') {
    amount = current_balance + value;
  } else {
    if (value > current_balance) {
      return { data, error: { message: 'Saldo insuficiente.' } };
    } else {
      amount = current_balance - value;
    }
  }

  const body = {
    balance: amount,
    updated_at: new Date(),
  };

  const { data, error } = await supabase
    .from('profiles')
    .update(body)
    .eq('id', profile.id);

  return { data, error };
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

/**
 * @param {Array} questions
 * @param {Array} alternatives
 * @param {Object} profile
 * @returns
 */
export const checkTheAnswers = async (questions, alternatives, profile) => {
  let score = 0;
  let total = questions.length;
  let max = 10;
  let average = max / total;

  for (let i = 0; i < questions.length; i++) {
    if (alternatives[i]) {
      let _cor = questions[i].correct;
      let _alt = alternatives[i].alt;
      if (_cor === _alt) {
        score += 1;
      }
    }
  }
  let result = parseFloat((score * average).toFixed(2));

  const body = {
    subject_id: questions[0].subject_id,
    profile_id: profile.id,
    content: alternatives,
    result,
  };

  const { data, error } = await supabase.from('user_grades').insert([body]);
  return { data, error };
};

/**
 *
 * @param {Float} value float
 * @returns string
 */
export const formatMoney = (value) => {
  let x = parseFloat(value);
  return x.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const sliceString = (string, length = 110) => {
  let sl = string.length;
  if (sl > 30) {
    return `${string.slice(0, length)}...`;
  } else {
    return string;
  }
};

/**
 *
 * @param {Date} date
 * @returns
 */
export const timeFromX = (date) => {
  let _date = new Date(date);
  let y = _date.getFullYear();
  let m = _date.getMonth();
  let d = _date.getDate();

  return moment([y, m, d]).fromNow();
};

/**
 *
 * @param {Date} date
 * @returns
 */
export const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY, kk:mm:ss');
};
