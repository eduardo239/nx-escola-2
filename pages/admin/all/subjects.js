import { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { Close16, Edit16, TrashCan16 } from '@carbon/icons-react';
import { ButtonIcon, Button, IconOnly } from '../../../components/ui/Form';
import { useUser } from '../../../utils/useUser';
import Modal from '../../../components/Modal';
import Spinner from '../../../components/ui/Spinner';
import toast, { Toaster } from 'react-hot-toast';
import { useCourse } from '../../../utils/useCourse';

const Courses = ({}) => {
  const { getSubjects, delCourse, subjects } = useCourse();
  console.log(subjects);
  const [modal, setModal] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [subject, setSubject] = useState({});
  const [loading, setLoading] = useState(false);

  const openModal = async (x) => {
    setSubject(x);
    setSubjectId(x.id);
    setModal(!modal);
  };

  const removeCourse = async () => {
    setLoading(true);
    await delCourse(subjectId);
    setTimeout(async () => await getSubjects(), 10000);
    setLoading(false);
    setModal(false);
  };

  useEffect(() => {
    (async function () {
      await getSubjects();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapSubjects = () => {
    return subjects.map((x) => (
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

      <h1>Todos as matérias</h1>

      {!subjects ? <p>Não há matérias aqui.</p> : mapSubjects()}

      {modal && (
        <Modal modal={modal} setModal={setModal}>
          <div>
            <div className="p-5">
              <h1>{subject.name}</h1>
              <p style={{ fontSize: '0.875rem' }}>
                {subject.description ? subject.description : 'undefined'}
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
  let { data: courses, error } = await supabase
    .from('subjects')
    .select('*, course_id(id, name)');

  if (error) throw error;
  return {
    props: { courses },
  };
}

export default Courses;
