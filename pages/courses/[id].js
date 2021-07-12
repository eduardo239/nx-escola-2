import { Button } from '../../components/ui/Form';
import { supabase } from '../../utils/supabase';

export default function Course({ courses }) {
  return (
    <div>
      <h1>Course</h1>
    </div>
  );
}

export async function getStaticPaths() {
  let { data: courses, error } = await supabase.from('courses').select('id');

  const paths = courses.map((course) => ({
    params: { id: course.id },
  }));

  if (error) throw new Error(error);

  return { paths, fallback: false };
}

export async function getStaticProps() {
  const { data: courses, error } = await supabase.from('courses').select('*');

  if (error) throw error;

  return {
    props: { courses },
  };
}
