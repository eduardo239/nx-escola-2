import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from './supabase';

export const CourseContext = createContext();

export const CourseContextProvider = (props) => {
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState(null);

  // TODO:
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

  const getCourses = async () => {
    let { data: courses, error } = await supabase.from('courses').select('*');
    if (courses) setCourses(courses);
    return { data, error };
  };

  const getCourse = async (id) => {
    let { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();
    if (courses) setCourse(courses);
    return { data, error };
  };

  const updateCourse = async (id, body) => {
    const { data, error } = await supabase
      .from('courses')
      .update(body)
      .eq('id', id);
    return { data, error };
  };

  const deleteCourse = async (id) => {
    const { data, error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    return { data, error };
  };

  const value = {
    course,
    courses,
    getCourse,
    getCourses,
    updateCourse,
    deleteCourse,
  };
  return <CourseContext.Provider value={value} {...props} />;
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error(`useCourse must be used within a UserContextProvider.`);
  }
  return context;
};
