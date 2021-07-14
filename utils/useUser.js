import { useEffect, useState, createContext, useContext } from 'react';
import { formatUsername } from '.';
import { supabase } from './supabase';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [userCourses, setUserCourses] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const userSignUp = async (options) => {
    const { user, error } = await supabase.auth.signUp(options);
    if (user) {
      const body = {
        username: options.username,
        user_id: user.id,
      };
      const { data, error } = await supabase.from('profiles').insert([body]);
      return { user: data, error };
    }
    return { user, error };
  };

  const userProfile = async (id) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', id)
      .single();
    if (data) setProfile(data);
    return { data, error };
  };

  const getCourses = async () => {
    let { data: courses, error } = await supabase.from('courses').select('*');
    if (courses) setCourses(courses);
  };

  /**
   *
   * @param {String} id profile_id
   */
  const getUserCourses = async (id) => {
    let { data, error } = await supabase
      .from('user_courses')
      .select('id')
      .eq('profile_id', id);
    if (data) setUserCourses(data);
    return { data, error };
  };

  const delCourse = async (id) => {
    const { data, error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    return { data, error };
  };

  const value = {
    session,
    user,
    courses,
    profile,
    userSignUp,
    userProfile,
    profile,
    userCourses,
    getUserCourses,
    getCourses,
    delCourse,
    setSession,
    setUser,
    signIn: (options) => supabase.auth.signIn(options),
    signUp: (options) => supabase.auth.signUp(options),
    signOut: () => {
      return supabase.auth.signOut();
    },
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
