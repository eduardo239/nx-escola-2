import React from 'react';
import Head from 'next/head';
import { Accessibility16 } from '@carbon/icons-react';
import { Button, ButtonIcon, Input, InputButton } from '../components/ui/Form';
import { app_name } from '../utils/constants';

export default function Home() {
  return (
    <section>
      <Head>
        <title>{`${app_name}`}</title>
        <meta
          name="description"
          content="App Escola - App para acompanhamento estudantil."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>HOME</h1>
        {/* <Button>Primary</Button>
        <Button secondary>Primary</Button>
        <ButtonIcon danger>
          Primary <Accessibility16 />
        </ButtonIcon>
        <ButtonIcon secondary full>
          Primary <Accessibility16 />
        </ButtonIcon>
        <Button danger full>
          Primary
        </Button>
        <Input
          type="email"
          placeholder="Email .."
          label="Email"
          id="login-email"
          className="w-100"
        />
        <Input
          type="email"
          placeholder="Email .."
          label="Email"
          id="login-email"
          className="w-100"
        />
        <InputButton
          type="email"
          placeholder="Email .."
          label="Email"
          id="login-email"
          className="w-100"
          button="click"
        >
          <Accessibility16 />
        </InputButton>

        <h1>Sponsors</h1>
        <h2>Sponsors</h2>
        <h3>Sponsors</h3>
        <h4>Sponsors</h4>
        <h5>Sponsors</h5>

        <p>
          ESLint statically analyzes your code to quickly find problems. ESLint
          is built into most text editors and you can run ESLint as part of your
          continuous integration pipeline.
        </p>
        <p>
          ESLint statically analyzes your code to quickly find problems. ESLint
          is built into most text editors and you can run ESLint as part of your
          continuous integration pipeline.
        </p> */}
      </main>
    </section>
  );
}

export async function getStaticProps() {
  return {
    props: { data: [] },
  };
}
