import { useEffect, useState } from 'react';
import { Close16, Edit16, TrashCan16 } from '@carbon/icons-react';
import { ButtonIcon, Button, IconOnly } from '../../../components/ui/Form';
import { useUser } from '../../../utils/useUser';
import { useCourse } from '../../../utils/useCourse';
import Spinner from '../../../components/ui/Spinner';
import Modal from '../../../components/Modal';
import toast, { Toaster } from 'react-hot-toast';

const Courses = ({}) => {
  const { delCourse, datas, getDatas } = useCourse();
  const [modal, setModal] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

  const openModal = async (x) => {
    setCourse(x);
    setCourseId(x.id);
    setModal(!modal);
  };

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await delCourse('courses', courseId);
    if (error) {
      toast.dismiss();
      toast.error(error.message, {
        id: 'all-courses-error',
      });
      return;
    } else {
      toast.dismiss();
      toast.success('Curso removido com sucesso.', {
        id: 'all-courses-success',
      });
    }
    await getDatas('courses');
    setLoading(false);
    setModal(false);
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
          <IconOnly disabled={loading} danger onClick={() => openModal(x)}>
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

      {datas === null ? <p>Não há cursos aqui.</p> : mapCourses()}

      {modal && (
        <Modal modal={modal} setModal={setModal}>
          <div>
            <div className="p-5">
              <h3 className="mb-5">{course.name}</h3>
              <p style={{ fontSize: '0.875rem' }}>
                {course.description ? course.description : 'undefined'}
              </p>
            </div>
            <div className="flex-center-end">
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
    </section>
  );
};

export default Courses;
