import { useState } from 'react';
import {
  Add16,
  AddFilled16,
  Close16,
  Edit16,
  TrashCan16,
} from '@carbon/icons-react';
import {
  Button,
  ButtonIcon,
  IconOnly,
  Input,
  Textarea,
} from '../../components/ui/Form';
import { supabase } from '../../utils/supabase';
import Modal from '../../components/Modal';
import { useUser } from '../../utils/useUser';

export default function Forum({ posts }) {
  const { profile } = useUser();
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [courseId, setCourseId] = useState('');
  const [postId, setPostId] = useState('');

  const handleModal = (x) => {
    setTitle(x.title);
    setContent(x.content);
    setCategory(x.category);
    setCourseId(x.course_id);
    setPostId(x.id);

    setModal(!modal);
  };

  const handleNewPost = async () => {
    if (profile) {
      const body = {
        profile_id: profile.id,
        course_id: null,
        category: null,
        title,
        content,
      };

      const { data, error } = await supabase.from('posts').insert([body]);
      console.log(data);
      console.log(error);
    } else {
      console.log('123');
    }
  };

  const handleDelete = async (id) => {
    const { data, error } = await supabase.from('posts').delete().eq('id', id);
    console.log(data);
    console.log(error);
  };

  const handleUpdate = async () => {
    const body = {
      course_id: courseId || null,
      category: category || null,
      title: title,
      content: content,
    };

    const { data, error } = await supabase
      .from('posts')
      .update(body)
      .eq('id', postId);

    console.log(data);
    console.log(error);
  };

  const mapPosts = () => {
    return posts.map((x) => (
      <div key={x.id} className="list-row">
        <div>
          <p>{x.title}</p>
        </div>
        <div>
          <IconOnly small secondary onClick={() => handleModal(x)}>
            <Edit16 />
          </IconOnly>
          <IconOnly small danger onClick={() => handleDelete(x.id)}>
            <TrashCan16 />
          </IconOnly>
        </div>
      </div>
    ));
  };

  return (
    <section className="p-5 bg-section">
      <h1>Forum</h1>

      <div className="mb-5">
        {posts.length === 0 ? <p>Não há posts aqui.</p> : mapPosts()}
      </div>

      <ButtonIcon primary onClick={() => setModal(!modal)}>
        Novo post <Add16 />
      </ButtonIcon>
      {modal && (
        <Modal modal={modal} setModal={setModal}>
          <div className="p-5 ">
            <h3 className="mb-5 mr-15">Novo post</h3>
            <Input
              type="text"
              placeholder="Título .."
              label="Título"
              id="forum-new-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-100"
            />
            <Textarea
              label="Conteúdo"
              placeholder="Conteúdo do post"
              className="w-100"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></Textarea>
          </div>
          <div className="flex-center-end">
            <ButtonIcon primary onClick={() => handleNewPost()}>
              Salvar <Add16 />
            </ButtonIcon>
            <ButtonIcon primary onClick={() => handleUpdate()}>
              Atualizar <Edit16 />
            </ButtonIcon>

            <Button secondary onClick={() => setModal(!modal)}>
              Cancelar <Close16 />
            </Button>
          </div>
        </Modal>
      )}
    </section>
  );
}

export async function getStaticProps() {
  let { data: posts, error } = await supabase.from('posts').select('*');

  if (error) throw new Error(error);

  return {
    props: { posts },
  };
}
