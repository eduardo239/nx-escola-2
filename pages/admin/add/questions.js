import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { Button, Textarea, Input } from '../../../components/ui/Form';
import { Add16, Save16, Subtract16 } from '@carbon/icons-react';
import toast, { Toaster } from 'react-hot-toast';

const Questions = ({ subjects }) => {
  const [question, setQuestion] = useState('');
  const [alternatives, setAlternatives] = useState([]);
  const [alternative, setAlternative] = useState('');
  const [correct, setCorrect] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const handleAddAlternative = (e) => {
    e.preventDefault();
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
      toast('Question is required.', {
        id: 'add-question-content',
      });
      return;
    }
    if (alternatives.length < 5) {
      toast.error('Minimum of 5 alternatives.', {
        id: 'add-question-alternatives',
      });
      return;
    }
    if (correct === '') {
      toast.error('Select the correct answer.', {
        id: 'add-question-answer',
      });
      return;
    }
    if (subjectId === '') {
      toast.error('Select the Subject.', {
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
    }
    toast.success('Question successfully added.', {
      id: 'add-question-success',
    });
  };

  return (
    <section>
      <Toaster />
      <h1>Add Question</h1>

      <Textarea
        label="Question"
        placeholder="Question here .."
        className="w-100"
        rows="3"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></Textarea>

      <form onSubmit={handleAddAlternative}>
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
          Add <Add16 />
        </Button>
      </form>

      {alternatives.map((alternative, i) => (
        <div
          style={{
            margin: 0,
            padding: '0.5rem',
            display: 'grid',
            gap: '0.5rem',
            gridTemplateColumns: 'auto 1fr',
          }}
          key={i}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRight: '2px solid #333',
              paddingRight: '0.5rem',
            }}
          >
            <span>[{i + 1}]</span>

            <input
              className="ml-4"
              type="radio"
              name="correct"
              id={`correct-${i}`}
              value={alternative}
              onChange={(e) => setCorrect(i)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <label htmlFor={`correct-${i}`}>{alternative}</label>
            <Button
              secondary
              type="submit"
              onClick={() => handleRemoveAlternative(i)}
            >
              Remove <Subtract16 />
            </Button>
          </div>
        </div>
      ))}

      <p>Correct answer: {correct + 1}</p>

      <label htmlFor="add-subject-course-id">Course/Subject</label>
      <div className="field--select">
        <select
          className="w-100"
          onChange={(e) => setSubjectId(e.target.value)}
          id="add-subject-course-id"
        >
          <option defaultValue value="">
            choose One
          </option>
          {subjects.map((x, i) => (
            <option value={x.id} key={x.id}>
              {x.name}
            </option>
          ))}
        </select>
      </div>

      <Button primary type="submit" onClick={handleAddQuestions}>
        Save <Save16 />
      </Button>
    </section>
  );
};

export async function getStaticProps() {
  let { data: subjects, error } = await supabase.from('subjects').select('*');

  if (error) throw error;

  return {
    props: { subjects },
  };
}

export default Questions;
