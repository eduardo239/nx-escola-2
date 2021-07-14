import { supabase } from '../../utils/supabase';
import { app_name } from '../../utils/constants';
import Grades from '../../components/table/user/Grades';
import Head from 'next/head';
import Payments from '../../components/table/user/Payments';
import Courses from '../../components/table/user/Courses';

const Profile = ({ profile, user_grades, user_payments, user_courses }) => {
  if (profile)
    return (
      <section className="p-5 bg-section">
        <Head>
          <title>{`${app_name} - ${profile.username}`}</title>
          <meta
            name="description"
            content="App Escola - App para acompanhamento estudantil."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h2>{profile.username}</h2>
        {user_grades && <Grades user_grades={user_grades} />}
        {user_payments && <Payments user_payments={user_payments} />}
        {user_courses && <Courses user_courses={user_courses} />}
      </section>
    );
  return (
    <section className="p-5 bg-section">
      <h1>Usuário não encontrado.</h1>
    </section>
  );
};

export async function getStaticPaths() {
  let { data: users } = await supabase.from('profiles').select('*');

  const paths = users.map((user) => ({
    params: { id: user.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const id = context.params.id;

  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  let { data: user_grades, error: error_grades } = await supabase
    .from('user_grades')
    .select('*, subject_id(id, name, course_id(id, name, poster))')
    .eq('profile_id', id);

  if (error_grades) throw new Error(error_grades);

  let { data: user_payments, error: error_payments } = await supabase
    .from('user_payments')
    .select('*, course_id(id, name)')
    .eq('profile_id', id);

  if (error_payments) throw new Error(error_payments);

  let { data: user_courses, error: error_courses } = await supabase
    .from('user_courses')
    .select('*, course_id(id, name, poster)')
    .eq('profile_id', id);

  if (error_courses) throw new Error(error_courses);
  return {
    props: { profile, user_grades, user_payments, user_courses },
  };
}

export default Profile;
