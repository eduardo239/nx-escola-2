export default function Post({ post }) {
  console.log(post);
  return (
    <section className="p-5 bg-section">
      <h1>Post</h1>
    </section>
  );
}

export async function getStaticPaths() {
  let { data: posts, error } = await supabase.from('posts').select('id');

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  if (error) throw new Error(error);

  return { paths, fallback: true };
}

export async function getStaticProps(ctx) {
  const id = ctx.params.id;

  let { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error);

  return {
    revalidate: 60,
    props: { post },
  };
}
