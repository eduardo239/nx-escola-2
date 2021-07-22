import { useState, createContext, useContext } from 'react';
import { supabase } from './supabase';

export const ForumContext = createContext();

export const ForumContextProvider = (props) => {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState(null);

  const [data, setData] = useState(null);
  const [datas, setDatas] = useState(null);

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
    getDatas,
    getData,
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
