import Head from 'next/head';
import Image from 'next/image';
import { supabase } from '../../utils/supabase';

export default function Courses({ courses }) {
  const mapCourses = () => {
    return courses
      .map((course, index) => (
        <div key={index}>
          <p>{course.name}</p>
        </div>
      ))
      .reverse();
  };

  return (
    <section>
      <Head>
        <title>App Escola</title>
        <meta name="description" content="Cursos de todos os tipos." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Cursos</h1>

        {courses.length === 0 ? <p>Cursos não encontrados.</p> : mapCourses()}
      </main>
    </section>
  );
}

export async function getStaticProps() {
  const { data: courses, error } = await supabase.from('courses').select('*');

  if (error) throw error;

  return {
    props: { courses },
  };
}
