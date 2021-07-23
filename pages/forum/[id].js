import { useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useForum } from '../../utils/useForum';
import Comments from '../../components/form/Comment';

export default function Post({ post }) {
  const { getDatasById, datas } = useForum();

  useEffect(() => {
    if (post)
      getDatasById(
        'posts_comments',
        'post_id',
        post.id,
        'profile_id(id, username, avatar_url)'
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (post)
    return (
      <section className="p-5 bg-section">
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>
            <small>{post.profile_id.username}</small>
          </p>
        </div>
        <div>
          <Comments post={post} comments={datas} getDatasById={getDatasById} />
        </div>
      </section>
    );
  return (
    <section className="p-5 bg-section">
      <h1>Post não encontrado</h1>
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
    .select('*, profile_id(username, avatar_url)')
    .eq('id', id)
    .single();

  if (error) throw new Error(error);

  let { data: comments, error: error_comments } = await supabase
    .from('posts_comments')
    .select('*')
    .eq('post_id', id);
  if (error_comments) throw new Error(error_comments);

  return {
    revalidate: 60,
    props: { post, comments },
  };
}
