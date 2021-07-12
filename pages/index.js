import Head from 'next/head';
import Image from 'next/image';
import { Button, Input, InputButton } from '../components/ui/Form';
import { supabase } from '../utils/supabase';
import { Accessibility16 } from '@carbon/icons-react';

export default function Home({ data }) {
  // const mapCourses = () => {
  //   return courses
  //     .map((course, index) => (
  //       <div key={index}>
  //         <p>{course.id}</p>
  //       </div>
  //     ))
  //     .reverse();
  // };

  return (
    <section>
      <Head>
        <title>App Escola</title>
        <meta
          name="description"
          content="App Escola - App para acompanhamento estudantil."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>HOME</h1>
        <Button>Primary</Button>
        <Button secondary>Primary</Button>
        <Button danger>Primary</Button>
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
        {/* {courses.length === 0 ? <p>Courses not found.</p> : mapCourses()} */}

        {/* 
        button ok
        buttonWithIcon - 
        input -
        inputWithButton - 
        inputWith2Buttons -
        textarea
        radio
        check
        select

        */}
      </main>
    </section>
  );
}

export async function getStaticProps() {
  // const { data: courses, error } = await supabase.from('courses').select('*');

  // if (error) throw error;

  return {
    props: { data: [] },
  };
}
