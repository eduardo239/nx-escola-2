import { useEffect, useState } from 'react';
import { Close16, Edit16, TrashCan16 } from '@carbon/icons-react';
import {
  ButtonIcon,
  Button,
  IconOnly,
  Input,
} from '../../../components/ui/Form';
import Modal from '../../../components/Modal';
import Spinner from '../../../components/ui/Spinner';
import toast, { Toaster } from 'react-hot-toast';
import { useCourse } from '../../../utils/useCourse';
import Content from '../../../components/form/Content';

const Courses = ({}) => {
  const { getDatas, delData, datas } = useCourse();

  const [modal, setModal] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [subject, setSubject] = useState({});
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [runtime, setRuntime] = useState(0);
  const [courseId, setCourseId] = useState('');

  const [courses, setCourses] = useState([]);

  const openModal = async (x) => {
    setSubject(x);
    setSubjectId(x.id);
    setModal(!modal);
  };

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await delData('subjects', subjectId);
    if (error) {
      toast.dismiss();
      toast.error(error.message, {
        id: 'all-subject-error',
      });
      return;
    } else {
      toast.dismiss();
      toast.success('Matéria removida com sucesso.', {
        id: 'all-subject-success',
      });
    }
    await getDatas('subjects');
    setLoading(false);
    setModal(false);
  };

  useEffect(() => {
    (async function () {
      await getDatas('subjects', 'course_id(id, name)');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapSubjects = () => {
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

      <h1>Todos as matérias</h1>

      {!datas ? <p>Não há matérias aqui.</p> : mapSubjects()}

      {modal && (
        <Modal modal={modal} setModal={setModal}>
          <div className="p-5">
            <div>
              <h3 className="mb-5 mr-15">Editar matéria</h3>
              <Input
                type="text"
                placeholder="Nome da matéira .."
                label="Nome da matéira"
                id="add-subject-name"
                value={subject.name}
                onChange={(e) => setName(e.target.value)}
                className="w-100"
              />
              <Input
                type="number"
                label="Runtime"
                id="add-subject-runtime"
                value={subject.runtime}
                onChange={(e) => setRuntime(e.target.value)}
                className="w-100"
              />
            </div>
            <div className="mb-5">
              <Content setContent={setContent} />
            </div>

            <div className="field--select mb-5">
              <label htmlFor="add-subject-course-id">Curso</label>
              <select
                className="w-100"
                onChange={(e) => setCourseId(e.target.value)}
                id="add-subject-course-id"
              >
                <option defaultValue value="">
                  Escolha um
                </option>
                {datas
                  .map((x, i, a) => x.course_id)
                  .map((x, i, a) => (
                    <option value={x.id} key={i}>
                      {x.name}
                    </option>
                  ))}
              </select>
            </div>
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
        </Modal>
      )}
    </section>
  );
};

export default Courses;
