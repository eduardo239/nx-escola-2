import { useEffect, useState } from 'react';
import { Close16, Edit16, TrashCan16 } from '@carbon/icons-react';
import { ButtonIcon, Button, IconOnly } from '../../../components/ui/Form';
import Modal from '../../../components/Modal';
import Spinner from '../../../components/ui/Spinner';
import toast, { Toaster } from 'react-hot-toast';
import { useCourse } from '../../../utils/useCourse';
import { useUser } from '../../../utils/useUser';

const Courses = ({}) => {
  const { user, profile } = useUser();
  const { getDatas, delData, datas } = useCourse();
  const [modal, setModal] = useState(false);
  const [questionId, setQuestionId] = useState('');
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(false);

  const openModal = async (x) => {
    setQuestion(x);
    setQuestionId(x.id);
    setModal(!modal);
  };

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await delData('questions', questionId);
    if (error) {
      toast.dismiss();
      toast.error(error.message, {
        id: 'all-questions-error',
      });
      return;
    } else {
      toast.dismiss();
      toast.success('Pergunta removida com sucesso.', {
        id: 'all-questions-success',
      });
    }
    await getDatas('questions');
    setLoading(false);
    setModal(false);
  };

  useEffect(() => {
    (async function () {
      await getDatas('questions');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapQuestions = () => {
    return datas.map((x) => (
      <div key={x.id} className="list-row">
        <p>{x.question}</p>
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

  if (user && profile?.is_admin)
    return (
      <section className="p-5 bg-section">
        <Toaster />
        {loading && <Spinner />}

        <h1>Todos as mat??rias</h1>

        {!datas ? <p>N??o h?? perguntas aqui.</p> : mapQuestions()}

        {modal && (
          <Modal modal={modal} setModal={setModal}>
            <div>
              <div className="p-5 mr-15">
                <h3 className="mb-5">{question.question}</h3>
                <p style={{ fontSize: '0.875rem' }}>
                  {question.description ? question.description : 'undefined'}
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
  else
    return (
      <section>
        <h1>Voc?? n??o est?? autorizado.</h1>
      </section>
    );
};

export default Courses;
