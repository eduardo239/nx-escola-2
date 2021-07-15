import { useEffect, useState } from 'react';
import { supabase } from '../../../../utils/supabase';
import { Button } from '../../../../components/ui/Form';
import { useUser } from '../../../../utils/useUser';
import { useRouter } from 'next/router';
import { checkTheAnswers } from '../../../../utils';
import toast, { Toaster } from 'react-hot-toast';
import s from '../../../../styles/Questions.module.scss';
import Head from 'next/head';
import { app_name } from '../../../../utils/constants';

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

      if (error) {
        toast.error(error.message, {
          id: 'question-add-error',
        });
      } else {
        toast.success(
          'Perguntas salvas com sucesso, redirecionando em 3 segundos.',
          {
            id: 'question-add-success',
          }
        );
        setTimeout(() => {
          setRedirect(true);
        }, 3000);
      }
    }
  };

  const selectedInput = (i, x) => {
    return alternatives.some((k) => k.alt === x && k.idx === i);
  };

  const mapQuestions = () => {
    return questions.map((q, i) => (
      <div key={i} className={`${s.question}`}>
        <div className={`${s.header} question--header`}>
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
    // if (user) userProfile(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirect) router.push('/courses/done');

  return (
    <section className="p-5 bg-section">
      <Toaster />

      <Head>
        <title>{`${app_name} - Atividades`}</title>
        <meta name="description" content="Cursos de todos os tipos aqui." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Questions</h1>
      {questions.length === 0 ? (
        <h1>Perguntas não encontradas.</h1>
      ) : (
        mapQuestions()
      )}

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
  console.log(paths);
  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const id = context.params.id;

  let { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .eq('subject_id', id);

  console.log(questions);

  if (error) throw error;
  return {
    props: { questions },
  };
}

export default Questions;
