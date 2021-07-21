import { useEffect, useState } from 'react';
import {
  Close16,
  Edit16,
  Temperature20,
  TrashCan16,
} from '@carbon/icons-react';
import {
  ButtonIcon,
  Button,
  IconOnly,
  Input,
  Textarea,
} from '../../../components/ui/Form';
import { useUser } from '../../../utils/useUser';
import { useCourse } from '../../../utils/useCourse';
import Spinner from '../../../components/ui/Spinner';
import Modal from '../../../components/Modal';
import toast, { Toaster } from 'react-hot-toast';

const Courses = ({}) => {
  const { delData, datas, getDatas, updateData } = useCourse();
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [runtime, setRuntime] = useState(0);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [promo, setPromo] = useState('');
  const [poster, setPoster] = useState('');
  const [status, setStatus] = useState(true);

  const openModal = async (x) => {
    setName(x.name);
    setRuntime(x.runtime);
    setDescription(x.description);
    setPrice(x.price);
    setPromo(x.promo);
    setPoster(x.poster);
    setStatus(x.status);

    setCourse(x);
    setCourseId(x.id);
    setModal(!modal);
  };

  const openModalDelete = async (x) => {
    setCourse(x);
    setCourseId(x.id);
    setModalDelete(!modalDelete);
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    const body = { name, runtime, description, price, promo, poster };
    const { error } = await updateData('courses', id, body);
    if (error) {
      toast.dismiss();
      toast.error(error.message, {
        id: 'all-courses-error',
      });
      setLoading(false);
      return;
    } else {
      toast.dismiss();
      toast.success('Curso atualizado com sucesso.', {
        id: 'all-courses-put-success',
      });
    }
    await getDatas('courses');
    setLoading(false);
    setModal(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await delData('courses', courseId);
    if (error) {
      toast.dismiss();
      toast.error(error.message, {
        id: 'all-courses-del-error',
      });
      setLoading(false);
      return;
    } else {
      toast.dismiss();
      toast.success('Curso removido com sucesso.', {
        id: 'all-courses-del-success',
      });
    }
    await getDatas('courses');
    setLoading(false);
    setModal(!modal);
  };

  useEffect(() => {
    (async function () {
      await getDatas('courses');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapCourses = () => {
    return datas.map((x) => (
      <div key={x.id} className="list-row">
        <p>{x.name}</p>
        <div className="flex">
          <IconOnly disabled={loading} secondary onClick={() => openModal(x)}>
            <Edit16 />
          </IconOnly>
          <IconOnly
            disabled={loading}
            danger
            onClick={() => openModalDelete(x)}
          >
            <TrashCan16 />
          </IconOnly>
        </div>
      </div>
    ));
  };

  return (
    <section className="p-5 bg-section">
      <Toaster />
      {loading && <Spinner />}

      <h1>Todos os cursos</h1>

      {!datas ? <p>Não há cursos aqui.</p> : mapCourses()}

      {modal && (
        <Modal modal={modal} setModal={setModal}>
          <div>
            <div className="p-5 ">
              <h3 className="mb-5 mr-15">Editar Curso</h3>
              <Input
                type="text"
                placeholder="Name of the course .."
                label="Name"
                id="add-course-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-100"
              />
              <Input
                type="number"
                placeholder="Course duration .."
                label="Runtime"
                id="add-course-runtime"
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                className="w-100"
              />
              <Input
                type="number"
                placeholder="Price .."
                label="Price"
                id="add-course-price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-100"
              />

              <Input
                type="text"
                placeholder="Promo code .."
                label="Promo Code"
                id="add-course-promo-code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="w-100"
              />
              <Input
                type="text"
                placeholder="Poster URL .."
                label="Poster URL"
                id="add-course-promo-poster"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                className="w-100"
              />
              <div className="flex" style={{ gap: '1rem' }}>
                <div className={`flex list-item`} style={{ flex: '1' }}>
                  <input
                    type="checkbox"
                    name={`add-course-active`}
                    id={`alt-course-active-1`}
                    defaultChecked={status}
                    onChange={() => setStatus(!status)}
                  />
                  <label htmlFor={`alt-course-active-1`}>Active</label>
                </div>
              </div>

              <Textarea
                label="Description"
                placeholder="Description of the course"
                className="w-100"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
            </div>
            <div className="flex-center-end">
              <ButtonIcon
                secondary
                disabled={loading}
                onClick={() => handleUpdate(course.id)}
              >
                Atualizar <TrashCan16 />
              </ButtonIcon>
              <ButtonIcon danger disabled={loading} onClick={handleDelete}>
                Deletar <TrashCan16 />
              </ButtonIcon>
              <Button
                secondary
                disabled={loading}
                onClick={() => setModal(!modal)}
              >
                Cancelar <Close16 />
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {modalDelete && (
        <Modal modal={modalDelete} setModal={setModalDelete}>
          <div className="p-5 ">
            <h3 className="mb-5 mr-15">Deletar Curso ?</h3>
          </div>
          <div className="flex-center-end">
            <ButtonIcon danger disabled={loading} onClick={handleDelete}>
              Deletar <TrashCan16 />
            </ButtonIcon>
            <Button
              secondary
              disabled={loading}
              onClick={() => setModalDelete(!modalDelete)}
            >
              Cancelar <Close16 />
            </Button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Courses;
