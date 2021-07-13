import { supabase } from '../../utils/supabase';

const Profile = ({ user }) => {
  console.log(user);
  return <div></div>;
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

  let { data: user, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id);

  if (error) throw error;
  return {
    props: { user },
  };
}

export default Profile;
