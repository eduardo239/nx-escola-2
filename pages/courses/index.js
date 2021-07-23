import Head from 'next/head';
import { Card } from '../../components/Card';
import { app_description, app_name } from '../../utils/constants';
import { supabase } from '../../utils/supabase';
import Masonry from 'react-masonry-css';
import Spinner from '../../components/ui/Spinner';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function Courses({ courses }) {
  const mapCourses = () => {
    return courses.map((c, i) => <Card key={c.id} course={c} />);
  };

  if (courses)
    return (
      <section className="p-5 bg-section">
        <Head>
          <title>{`${app_name} - Cursos`}</title>
          <meta
            name="description"
            content={`${app_name} - ${app_description}`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>Todos os Cursos</h1>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {courses.length === 0 ? (
              <p>Nenhum há cursos.</p>
            ) : (
              mapCourses().reverse()
            )}
          </Masonry>
        </main>
      </section>
    );

  if (courses.length === 0)
    return (
      <section className="p-5 bg-section">
        <h1>Não há cursos no momento.</h1>
      </section>
    );

  return <Spinner />;
}

export async function getStaticProps() {
  const { data: courses, error } = await supabase.from('courses').select('*');

  if (error) throw error;

  return {
    revalidate: 60,
    props: { courses },
  };
}
