import Head from 'next/head';
import { app_description, app_name } from '../../utils/constants';

const Done = () => {
  return (
    <section className="p-5 bg-section">
      <Head>
        <title>{`${app_name} - DONE!`}</title>
        <meta name="description" content={`${app_name} - ${app_description}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mb-5">Done!</h1>
    </section>
  );
};

export default Done;
