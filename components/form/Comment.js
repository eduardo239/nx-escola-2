import { Add16, Edit16, TrashCan16 } from '@carbon/icons-react';
import { useState } from 'react';
import { formatDate } from '../../utils';
import { supabase } from '../../utils/supabase';
import { useForum } from '../../utils/useForum';
import { useUser } from '../../utils/useUser';
import { ButtonIcon, IconOnly, Textarea } from '../ui/Form';

export default function Comments({ post, comments = [], getDatasById }) {
  const { postData } = useForum();
  const { user, profile } = useUser();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleModal = async () => {};
  const handleDeleteModal = async () => {};

  const handleAdd = async () => {
    setLoading(true);
    if (profile && post) {
      const body = {
        content: comment,
        profile_id: profile.id,
        post_id: post.id,
      };
      const { data, error } = await postData('posts_comments', body);
      await getDatasById(
        'posts_comments',
        'post_id',
        post.id,
        'profile_id(id, username, avatar_url)'
      );
      setComment('');
    }
    setLoading(false);
  };

  const mapComments = () => {
    return comments.map((x) => (
      <div key={x.id} className="list-row">
        <div>
          <p>
            <small>{formatDate(x.created_at)}</small>

            {' : '}
            <small>{x.profile_id.username}</small>
            {' : '}
            {x.content}
          </p>
        </div>
        {/* TODO: only owner can delete the post */}
        <div>
          <IconOnly small secondary onClick={() => handleModal(x)}>
            <Edit16 />
          </IconOnly>
          <IconOnly small danger onClick={() => handleDeleteModal(x.id)}>
            <TrashCan16 />
          </IconOnly>
        </div>
      </div>
    ));
  };

  if (user)
    return (
      <section className="">
        <h3>Comentários</h3>
        <div className="mb-5">
          <Textarea
            id="add-subject-text"
            label="Comentários"
            placeholder="Write here .."
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Textarea>
          <ButtonIcon
            disabled={loading}
            type="submit"
            danger
            onClick={handleAdd}
          >
            Adicionar
            <Add16 />
          </ButtonIcon>
        </div>
        {!comments || comments.length === 0 ? (
          <p>Não há comentários aqui.</p>
        ) : (
          mapComments().reverse()
        )}
      </section>
    );
  return (
    <section>
      <h1>Você precisa estar logado</h1>
    </section>
  );
}
