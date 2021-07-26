import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ArrowLeft16, ArrowRight16 } from '@carbon/icons-react';
import { app_description, app_name } from '../utils/constants';
import Spinner from '../components/ui/Spinner';
import { supabase } from '../utils/supabase';
import { formatDate } from '../utils';
import { useMessage } from '../utils/useMessage';
import { Button, ButtonIcon } from '../components/ui/Form';

export default function Home({}) {
  const { getMessages, messages } = useMessage();

  const [range, setRange] = useState(3);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(3);

  const mapMessages = () => {
    return messages.map((x, i) => (
      <div className="message message-info" key={x.id}>
        <p>{x.content}</p>
        <small>{formatDate(x.created_at)}</small>
      </div>
    ));
  };

  const handleLoadMore = async (op) => {
    if (offset >= 0) {
      if (op === '+') {
        setOffset(offset + range);
        setLimit(limit + range);
      } else {
        setOffset(offset - range);
        setLimit(limit - range);
      }
    } else {
      return;
    }
    console.log(offset, limit);
    // FIXME
    await getMessages(offset, limit);
  };

  useEffect(() => {
    getMessages(offset, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {!messages ? <p>Não há mensagens aqui.</p> : mapMessages()}

        <div className="flex-center-center gap-1">
          <ButtonIcon
            disabled={offset <= 0}
            primary
            onClick={() => handleLoadMore('-')}
          >
            Voltar <ArrowLeft16 />
          </ButtonIcon>
          <Button secondary disabled>
            Página {offset} - {limit}
          </Button>
          <ButtonIcon
            disabled={false}
            primary
            onClick={() => handleLoadMore('+')}
          >
            Próxima <ArrowRight16 />
          </ButtonIcon>
        </div>
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
