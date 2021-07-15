import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from './supabase';

export const CourseContext = createContext();

export const CourseContextProvider = (props) => {
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState(null);

  useEffect(() => {}, []);

  const getCourses = async () => {
    let { data, error } = await supabase.from('courses').select('*');
    if (data) setCourses(data);
    return { data, error };
  };

  const getCourse = async (id) => {
    let { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();
    if (data) setCourse(data);
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
    throw new Error(`useCourse must be used within a CourseContextProvider.`);
  }
  return context;
};
