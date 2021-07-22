import { useState, createContext, useContext } from 'react';
import { supabase } from './supabase';

export const ForumContext = createContext();

export const ForumContextProvider = (props) => {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState(null);

  const [comment, setComment] = useState(null);
  const [comments, setComments] = useState(null);

  const [data, setData] = useState(null);
  const [datas, setDatas] = useState(null);

  // -----
  const postData = async (table, body) => {
    const { data, error } = await supabase.from(table).insert([body]);
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
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    if (data) setData(data);
    return { data, error };
  };
  const getDatasById = async (table, item_id, id) => {
    let { data, error } = await supabase
      .from(table)
      .select('*')
      .eq(item_id, id);
    if (data) setDatas(data);
    return { data, error };
  };
  // -----
  const updateData = async (table, id, body) => {
    const { data, error } = await supabase
      .from(table)
      .update(body)
      .eq('id', id);
    return { data, error };
  };
  // -----
  const delData = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().eq('id', id);
    return { data, error };
  };
  // -----
  const value = {
    data,
    datas,
    postData,
    getDatas,
    getData,
    getDatasById,
    delData,
    updateData,
  };
  return <ForumContext.Provider value={value} {...props} />;
};

export const useForum = () => {
  const context = useContext(ForumContext);
  if (context === undefined) {
    throw new Error(`useForum must be used within a CourseContextProvider.`);
  }
  return context;
};
