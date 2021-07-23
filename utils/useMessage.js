import { useState, createContext, useContext } from 'react';
import { supabase } from './supabase';

export const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [message, setMessage] = useState(null);

  const [data, setData] = useState(null);
  const [datas, setDatas] = useState(null);

  // -----
  /**
   *
   * @param {String} table name
   * @param {Object} body content
   * @returns
   */
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
  const getDatasById = async (table, item_id, id, ...columns) => {
    let foreign = columns.length > 0;

    let { data, error } = await supabase
      .from(table)
      .select(`* ${foreign ? ', ' + columns.toString() : ''}`)
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
  return <MessageContext.Provider value={value} {...props} />;
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error(`useMessage must be used within a CourseContextProvider.`);
  }
  return context;
};
