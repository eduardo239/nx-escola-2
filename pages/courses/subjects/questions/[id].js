import { useEffect, useState } from 'react';
import { supabase } from '../../../../utils/supabase';
import { Button } from '../../../../components/ui/Form';
import { useUser } from '../../../../utils/useUser';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import s from '../../../../styles/Questions.module.scss';
import { checkTheAnswers } from '../../../../utils';

const Questions = ({ questions }) => {
  const { user, userProfile, profile } = useUser();
  const [alternatives, setAlternatives] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const router = useRouter();

  const handleOnChange = (e, q, i, a, x) => {
    let data = { idx: i, alt: x, qid: q.id };

    if (alternatives.length > 0) {
      let f = alternatives.filter((x) => x.idx !== data.idx);
      setAlternatives(f);
    }
    setAlternatives((a) => [...a, data]);
  };

  const handleSave = async () => {
    if (user && profile) {
      const { data, error } = await checkTheAnswers(
        questions,
        alternatives,
        profile
      );

      if (error)
        toast.error(error.message, {
          id: 'question-add-error',
        });
      // setRedirect(true);
    }
  };

  const selectedInput = (i, x) => {
    return alternatives.some((k) => k.alt === x && k.idx === i);
  };

  const mapQuestions = () => {
    return questions.map((q, i) => (
      <div key={i} className={s.question}>
        <div className={s.header}>
          <small>[{i + 1}] Question</small>
          <p>{q.question}</p>
        </div>
        {q.alternatives.map((a, x) => (
          <div
            key={x}
            className={`flex list-item ${
              selectedInput(i, x) ? 'list-item__selected' : ''
            }`}
          >
            <input
              type="radio"
              name={`${q.id}`}
              id={`alt-${x}-${q.id}`}
              value={a}
              onChange={(e) => handleOnChange(e, q, i, a, x)}
            />
            <label
              htmlFor={`alt-${x}-${q.id}`}
              style={{
                padding: '0.5rem 100% 0.5rem 0.5rem',
              }}
            >
              {a}
            </label>
          </div>
        ))}
      </div>
    ));
  };

  useEffect(() => {
    if (user) userProfile(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirect) router.push('/courses/done');

  if (questions.length === 0)
    return (
      <section>
        <h1>Perguntas não encontradas.</h1>
      </section>
    );

  return (
    <section>
      <Toaster />

      <h1>Questions</h1>
      {questions.length === 0 ? <p>Questions not found</p> : mapQuestions()}

      <div className="mb-4">
        <Button secondary onClick={handleSave}>
          Save and continue
        </Button>
      </div>
    </section>
  );
};

export async function getStaticPaths() {
  let { data: subjects } = await supabase.from('subjects').select('*');

  const paths = subjects.map((subject) => ({
    params: { id: subject.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const id = context.params.id;

  let { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .eq('subject_id', id);

  if (error) throw error;
  return {
    props: { questions },
  };
}

export default Questions;
