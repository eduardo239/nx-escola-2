import { useState, createContext, useContext } from 'react';
import { supabase } from './supabase';

export const CourseContext = createContext();

export const CourseContextProvider = (props) => {
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState(null);
  const [subject, setSubject] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [question, setQuestion] = useState(null);
  const [questions, setQuestions] = useState(null);

  const [data, setData] = useState(null);
  const [datas, setDatas] = useState(null);

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

  // -----

  const getSubjects = async () => {
    let { data, error } = await supabase.from('subjects').select('*');
    if (data) setSubjects(data);
    return { data, error };
  };

  const getQuestions = async () => {
    let { data, error } = await supabase.from('questions').select('*');
    if (data) setQuestions(data);
    return { data, error };
  };
  // -----
  /**
   *
   * @param {String} table
   * @param {uuid} id
   * @param {Object} body
   * @returns
   */
  const updateData = async (table, id, body) => {
    const { data, error } = await supabase
      .from(table)
      .update(body)
      .eq('id', id);
    return { data, error };
  };
  // -----

  const getDatas = async (table, ...columns) => {
    let foreign = columns.length > 0;

    let { data, error } = await supabase
      .from(table)
      .select(`* ${foreign ? ', ' + columns.toString() : ''}`);
    if (data) setDatas(data);
    return { data, error };
  };

  const getData = async (table, id) => {
    let { data, error } = await supabase
      .from(data)
      .select('*')
      .eq('id', id)
      .single();
    if (data) setData(data);
    return { data, error };
  };
  // -----
  const delData = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().eq('id', id);
    return { data, error };
  };
  // -----
  const value = {
    course,
    courses,
    getCourse,
    getCourses,
    updateCourse,
    deleteCourse,
    subject,
    subjects,
    getSubjects,
    questions,
    questions,
    getQuestions,
    data,
    datas,
    getData,
    getDatas,
    updateData,
    delData,
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
