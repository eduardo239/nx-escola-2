import { useEffect, useState } from 'react';
import { Close16, Edit16, TrashCan16 } from '@carbon/icons-react';
import { ButtonIcon, Button, IconOnly } from '../../../components/ui/Form';
import { useUser } from '../../../utils/useUser';
import Modal from '../../../components/Modal';
import Spinner from '../../../components/ui/Spinner';
import toast, { Toaster } from 'react-hot-toast';
import { useCourse } from '../../../utils/useCourse';

const Courses = ({}) => {
  const { getDatas, delData, datas } = useCourse();

  const [modal, setModal] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [subject, setSubject] = useState({});
  const [loading, setLoading] = useState(false);

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
      await getDatas('subjects');
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
          <div>
            <div className="p-5">
              <h3 className="mb-5">{subject.name}</h3>
              {/* TODO: */}
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
