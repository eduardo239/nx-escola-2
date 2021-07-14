import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { Accessibility16, Close16 } from '@carbon/icons-react';
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

export default function Home() {
  const modalRef = useRef(null);
  const [modal, setModal] = useState(false);

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

        <button onClick={() => setModal(!modal)}>click</button>

        {modal && (
          <Modal modal={modal} setModal={setModal}>
            <div>
              <div className="p-5">
                <h1>Modal</h1>
                <p style={{ fontSize: '0.875rem' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  quibusdam perferendis reprehenderit expedita cupiditate?
                  Molestiae nesciunt porro vero asperiores a quasi eaque odio,
                  iste temporibus voluptatibus enim, dolorem voluptate suscipit?
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti neque ratione repellendus pariatur officiis rem
                  quibusdam quisquam laboriosam dolorum asperiores
                  necessitatibus provident consequatur sapiente, veniam corrupti
                  in, illum porro dolore?
                </p>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Deserunt neque doloribus pariatur itaque, quo impedit nesciunt
                  delectus. Rem, non repellendus, rerum reprehenderit error
                  dolores repudiandae autem ipsa accusantium placeat veritatis.
                </p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                sequi ipsum, explicabo deserunt praesentium culpa hic voluptas
                quia quaerat veniam tempora odio architecto dolores similique
                beatae distinctio repellendus numquam deleniti!
              </p>
              <div className="flex">
                <Button danger>Click here</Button>
                <Button secondary>Click here</Button>
              </div>
            </div>
          </Modal>
        )}
        {/* <Spinner></Spinner> */}
        {/* 
           <Button primary>Coisa</Button>
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
      </IconOnly>
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
