import { supabase } from '../../utils/supabase';

const Balance = ({ profiles }) => {
  return (
    <section className="p-5 bg-section">
      <h1>User balance</h1>
    </section>
  );
};

export async function getServerSideProps(ctx) {
  const session = supabase.auth.session();

  console.log(session);

  let { data: profiles, error } = await supabase.from('profiles').select('*');

  if (error) throw new Error(error);
  return {
    props: { profiles },
  };
}

export default Balance;
