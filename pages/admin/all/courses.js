import { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { Close16, Edit16, TrashCan16 } from '@carbon/icons-react';
import { ButtonIcon, Button, IconOnly } from '../../../components/ui/Form';
// import Modal from '../../../components/ui/Modal';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../../../components/Modal';
import { useUser } from '../../../utils/useUser';
// import ModalEdit from '../../../components/admin/edit/ModalEdit';
import Spinner from '../../../components/ui/Spinner';

const Courses = ({}) => {
  const { getCourses, delCourse, courses } = useUser();
  const [modal, setModal] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

  const openModal = async (x) => {
    setCourse(x);
    setCourseId(x.id);
    setModal(!modal);
  };

  const removeCourse = async () => {
    setLoading(true);
    await delCourse(courseId);
    setTimeout(async () => await getCourses(), 10000);
    setLoading(false);
    setModal(false);
  };

  useEffect(() => {
    (async function () {
      await getCourses();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapCourses = () => {
    return courses.map((x) => (
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

      {courses === null ? <p>Não há cursos aqui.</p> : mapCourses()}

      {modal && (
        <Modal modal={modal} setModal={setModal}>
          <div>
            <div className="p-5">
              <h1>{course.name}</h1>
              <p style={{ fontSize: '0.875rem' }}>
                {course.description ? course.description : 'undefined'}
              </p>
            </div>
            <div className="flex-center-end">
              <ButtonIcon danger disabled={loading} onClick={removeCourse}>
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

export async function getStaticProps() {
  let { data: courses, error } = await supabase.from('courses').select('*');

  if (error) throw error;
  return {
    props: { courses },
  };
}

export default Courses;
