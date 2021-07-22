import { useEffect, useState } from 'react';
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
import { useUser } from '../../utils/useUser';
import { useForum } from '../../utils/useForum';
import Modal from '../../components/Modal';

export default function Forum({ posts }) {
  const { getDatas, getData, updateData, data, datas } = useForum();
  const { profile, user } = useUser();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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

  const handleNewModal = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setCourseId('');
    setPostId('');
    setModal(!modal);
  };

  const handleDeleteModal = (id) => {
    setPostId(id);
    setDeleteModal(!deleteModal);
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
      // TODO:
    } else {
      console.log('[x] profile not found');
    }
    getDatas('posts');
  };

  const handleDelete = async (id) => {
    const { data, error } = await supabase.from('posts').delete().eq('id', id);
    // TODO:
    getDatas('posts');
    setDeleteModal(false);
  };

  const handleUpdate = async () => {
    const body = {
      course_id: courseId || null,
      category: category || null,
      title: title,
      content: content,
    };

    const { data, error } = updateData('posts', postId, body);
    // TODO:
    getDatas('posts');
  };

  const mapPosts = () => {
    return datas.map((x) => (
      <div key={x.id} className="list-row">
        <div>
          <p>{x.title}</p>
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

  useEffect(() => {
    getDatas('posts');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="p-5 bg-section">
      <h1>Forum</h1>

      <div className="mb-5">
        {!datas || datas.length === 0 ? <p>Não há posts aqui.</p> : mapPosts()}
      </div>

      {user && (
        <ButtonIcon primary onClick={() => handleNewModal()}>
          Novo post <Add16 />
        </ButtonIcon>
      )}

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

      {deleteModal && (
        <Modal modal={deleteModal} setModal={setDeleteModal}>
          <div className="p-5 ">
            <h3 className="mb-5 mr-15">
              Tem certeza que deseja remover o post?
            </h3>
          </div>
          <div className="flex-center-end">
            <ButtonIcon primary onClick={() => handleDelete(postId)}>
              Remover <Edit16 />
            </ButtonIcon>
            <Button secondary onClick={() => setDeleteModal(!deleteModal)}>
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
    revalidate: 60,
    props: { posts },
  };
}
