import Head from 'next/head';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { Card } from '../../components/Card';
import { supabase } from '../../utils/supabase';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function Courses({ courses }) {
  const mapCourses = () => {
    return courses
      .map((c, i) => (
        <div key={i}>
          <Card key={c.id} course={c} />
        </div>
      ))
      .reverse();
  };

  return (
    <section>
      <Head>
        <title>App Escola - Cursos</title>
        <meta name="description" content="Cursos de todos os tipos aqui." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Cursos</h1>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {courses.length === 0 ? <p>Nenhum curso aqui.</p> : mapCourses()}
        </Masonry>
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
