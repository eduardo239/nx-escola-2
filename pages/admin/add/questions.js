import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { Button, Textarea, Input, IconOnly } from '../../../components/ui/Form';
import { Add16, Save16, Subtract16 } from '@carbon/icons-react';
import { useUser } from '../../../utils/useUser';
import toast, { Toaster } from 'react-hot-toast';
import s from '../../../styles/Questions.module.scss';

const Questions = ({ subjects }) => {
  const { user, profile } = useUser();

  const [question, setQuestion] = useState('');
  const [alternatives, setAlternatives] = useState([]);
  const [alternative, setAlternative] = useState('');
  const [correct, setCorrect] = useState(null);
  const [subjectId, setSubjectId] = useState('');

  const handleAddAlternative = (e) => {
    e.preventDefault();
    if (alternative === '') {
      toast.error('Alternativa em branco.', {
        id: 'add-question-empty',
      });
      return;
    }
    setAlternative('');
    setAlternatives((alternatives) => [...alternatives, alternative]);
  };

  const handleRemoveAlternative = (i) => {
    const newList = alternatives.filter((item, index) => index !== i);
    setAlternatives(newList);
  };

  const handleAddQuestions = async (e) => {
    e.preventDefault();

    if (question === '') {
      toast.error('É preciso fornecer a pergunta.', {
        id: 'add-question-content',
      });
      return;
    }
    if (alternatives.length < 5) {
      toast.error('Ao menos 5 alternativas.', {
        id: 'add-question-alternatives',
      });
      return;
    }
    if (correct === null) {
      toast.error('Por favor escolha a alternativa correta.', {
        id: 'add-question-answer',
      });
      return;
    }
    if (subjectId === '') {
      toast.error('Selecione a matéria.', {
        id: 'add-question-subject-id',
      });
      return;
    }

    const body = {
      subject_id: subjectId,
      question,
      alternatives,
      correct,
    };

    const { error } = await supabase.from('questions').insert([body]);
    if (error) {
      toast.error(error.message, {
        id: 'add-question-error',
      });
      return;
    } else {
      toast.success('Question successfully added.', {
        id: 'add-question-success',
      });
    }
  };

  if (user && profile?.is_admin)
    return (
      <section className="p-5 bg-section">
        <Toaster />
        <h1>Criar questões</h1>

        <Textarea
          label="Question"
          placeholder="Question here .."
          className="w-100"
          rows="3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></Textarea>

        <form onSubmit={handleAddAlternative} className="mb-5">
          <Input
            type="text"
            placeholder="Alternative .."
            label="Alternative"
            id="add-question-alternative"
            value={alternative}
            onChange={(e) => setAlternative(e.target.value)}
            className="w-100"
          />
          <Button secondary type="submit" onClick={handleAddAlternative}>
            Adicionar <Add16 />
          </Button>
        </form>

        {/* TODO: style the list */}
        {alternatives.map((alternative, i) => (
          <div key={i} className={s.item}>
            <div>
              <span>{i + 1}</span>
              <input
                className="ml-4"
                type="radio"
                name="correct"
                id={`correct-${i}`}
                value={alternative}
                onChange={(e) => setCorrect(i)}
              />
              <label htmlFor={`correct-${i}`}>{alternative}</label>
            </div>
            <div>
              <IconOnly secondary onClick={() => handleRemoveAlternative(i)}>
                <Subtract16 />
              </IconOnly>
            </div>
          </div>
        ))}

        <div className="p-5">
          <small>
            Resposta correta: {correct !== '' ? correct + 1 : 'Undefined'}
          </small>
        </div>

        <div className="field--select mb-5">
          <label htmlFor="add-subject-course-id">Curso/Matéria</label>
          <select
            className="w-100"
            onChange={(e) => setSubjectId(e.target.value)}
            id="add-subject-course-id"
          >
            <option defaultValue value="">
              Escolha um
            </option>
            {subjects.map((x, i) => (
              <option value={x.id} key={x.id}>
                Curso: {x.course_id.name}, Matéria: {x.name}
              </option>
            ))}
          </select>
        </div>

        <Button primary type="submit" onClick={handleAddQuestions}>
          Salvar <Save16 />
        </Button>
      </section>
    );
  else
    return (
      <section>
        <h1>Você não está autorizado.</h1>
      </section>
    );
};

export async function getServerSideProps() {
  let { data: subjects, error } = await supabase
    .from('subjects')
    .select('*, course_id(id, name)');

  if (error) throw error;

  return {
    props: { subjects },
  };
}

export default Questions;
