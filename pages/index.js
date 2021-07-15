import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { Accessibility16, Close16, TrashCan16 } from '@carbon/icons-react';
import {
  Button,
  ButtonIcon,
  Input,
  InputButton,
  IconOnly,
} from '../components/ui/Form';
import { app_name } from '../utils/constants';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/Modal';
import { useCourse } from '../utils/useCourse';

export default function Home() {
  const [modal, setModal] = useState(false);
  const { courses, getCourses } = useCourse();

  return (
    <section className="p-5 bg-section">
      <Head>
        <title>{`${app_name}`}</title>
        <meta
          name="description"
          content="App Escola - App para acompanhamento estudantil."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/*  */}
        <Button primary onClick={() => setModal(!modal)}>
          click
        </Button>

        <Button danger onClick={getCourses}>
          get courses
        </Button>

        {modal && (
          <Modal modal={modal} setModal={setModal}>
            <div>
              <div className="p-5">
                <h1>Modal</h1>
                <p style={{ fontSize: '0.875rem' }}>
                  O mi não existiria sem toda nossa entrega e dedicação e é isso
                  que buscamos. Queremos com a gente quem tá olhando pra frente.
                  Queremos achar quem sabe na ESSÊNCIA o que é vestir essa
                  camisa.
                </p>
              </div>
              <div className="flex-center-end">
                <ButtonIcon danger onClick={() => console.log(1)}>
                  Deletar <TrashCan16 />
                </ButtonIcon>
                <ButtonIcon secondary onClick={() => setModal(!modal)}>
                  Cancelar <Close16 />
                </ButtonIcon>
              </div>
            </div>
          </Modal>
        )}
        <Spinner></Spinner>
        {/* <Button primary>Coisa</Button>
        <Button secondary>Coisa</Button>
        <Button danger>Coisa</Button>

        <ButtonIcon primary>
          Garbage <TrashCan16 />
        </ButtonIcon>
        <ButtonIcon secondary>
          Garbage <TrashCan16 />
        </ButtonIcon>
        <ButtonIcon danger>
          Garbage <TrashCan16 />
        </ButtonIcon>
        <IconOnly danger>
          <TrashCan16 />
        </IconOnly>
        <IconOnly secondary>
          <TrashCan16 />
        </IconOnly>
        <IconOnly primary>
          <TrashCan16 />
        </IconOnly> */}
        {/* 
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
