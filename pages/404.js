import Head from 'next/head';
import { app_name, app_description } from '../utils/constants';

const NotFound = () => {
  return (
    <div>
      <Head>
        <title>{`${app_name} - oops!`}</title>
        <meta name="description" content={`${app_name} - ${app_description}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Not Found</h1>
    </div>
  );
};

export default NotFound;
