import React from 'react';
import Head from 'next/head';
import { Accessibility16, Close16, TrashCan16 } from '@carbon/icons-react';
import { app_description, app_name } from '../utils/constants';
import Spinner from '../components/ui/Spinner';
import { supabase } from '../utils/supabase';
import { formatDate } from '../utils';

export default function Home({ messages }) {
  const mapMessages = () => {
    return messages.map((x, i) => (
      <div className="message message-info" key={x.id}>
        <p>{x.content}</p>
        <small>{formatDate(x.created_at)}</small>
      </div>
    ));
  };

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

        {messages.length === 0 ? (
          <p>Não há mensagens aqui.</p>
        ) : (
          mapMessages().reverse()
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
