import { supabase } from '../../utils/supabase';
import Grades from '../../components/table/user/Grades';

const Profile = ({ profile, user_grades }) => {
  if (profile)
    return (
      <section>
        {profile.username}
        <h1>User</h1>
        {user_grades && <Grades user_grades={user_grades}></Grades>}
      </section>
    );
  return (
    <section>
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
    .select('*');

  if (error_grades) throw new Error(error_grades);
  return {
    props: { profile, user_grades },
  };
}

export default Profile;
