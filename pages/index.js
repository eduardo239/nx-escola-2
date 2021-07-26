import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import Head from 'next/head';
import { ArrowLeft16, ArrowRight16 } from '@carbon/icons-react';
import { app_description, app_name } from '../utils/constants';
import { formatDate } from '../utils';
import { useMessage } from '../utils/useMessage';
import { Button, ButtonIcon } from '../components/ui/Form';
import Spinner from '../components/ui/Spinner';
import Messages from '../components/Messages';
import Pagination from '../components/Pagination';

export default function Home({}) {
  const { getMessages, messages } = useMessage();

  // const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage, setMessagesPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessage = messages?.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    (async function () {
      setLoading(true);
      await getMessages();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <section className="p-5 bg-section">
        <Spinner />
      </section>
    );

  return (
    <section className="p-5 bg-section">
      <Head>
        <title>{`${app_name} - Home`}</title>
        <meta name="description" content={`${app_name} - ${app_description}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="mb-5">
          <h1>Mensagens</h1>
        </div>

        {/* {!messages ? <p>Não há mensagens aqui.</p> : mapMessages()} */}
        {messages && <Messages loading={loading} messages={currentMessage} />}

        {messages && (
          <Pagination
            messagesPerPage={messagesPerPage}
            totalMessages={messages.length}
            paginate={paginate}
          />
        )}
      </main>
    </section>
  );
}

export async function getStaticProps() {
  let { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .eq('to_role', 'student');

  return {
    revalidate: 60,
    props: { messages },
  };
}
