import Head from 'next/head';
import { app_name } from '../../utils/constants';

const Done = () => {
  return (
    <section className="p-5 bg-section">
      <Head>
        <title>{`${app_name} - Done`}</title>
        <meta name="description" content="Cursos de todos os tipos aqui." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Done!</h1>
    </section>
  );
};

export default Done;
