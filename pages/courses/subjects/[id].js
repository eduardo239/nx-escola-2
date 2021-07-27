import { supabase } from '../../../utils/supabase';
import { Button, ButtonIcon } from '../../../components/ui/Form';
import { useRouter } from 'next/router';
import s from '../../../styles/Subject.module.scss';
import Head from 'next/head';
import { app_description, app_name } from '../../../utils/constants';
import Spinner from '../../../components/ui/Spinner';
import { formatMinutes } from '../../../utils';
import { DocumentTasks16 } from '@carbon/icons-react';

const Subject = ({ subject }) => {
  const router = useRouter();

  if (subject)
    return (
      <section className="p-5 bg-section">
        <Head>
          <title>{`${app_name} - Matéria: ${subject.name}`}</title>
          <meta
            name="description"
            content={`${app_name} - ${app_description}`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={`${s.header} mb-5 subject-header`}>
          <small>{subject.course_id?.name}</small>
          <h1>{subject.name}</h1>
          <p>{subject.runtime ? `${formatMinutes(subject.runtime)}` : ''}</p>
        </div>

        <div className="separator"></div>

        <div className="mb-5">
          <section
            className={s.container}
            dangerouslySetInnerHTML={{ __html: subject.content }}
          ></section>
          <div className="separator"></div>
        </div>

        <div className="mb-5 flex-center-end">
          <ButtonIcon
            primary
            onClick={() =>
              router.push(`/courses/subjects/questions/${subject.id}`)
            }
          >
            Atividades <DocumentTasks16 />
          </ButtonIcon>
        </div>
      </section>
    );

  return (
    <section className="p-5 bg-section">
      <h4>Matéria não encontrada</h4>
    </section>
  );
};

export async function getStaticPaths() {
  let { data: subjects } = await supabase.from('subjects').select('id');

  const paths = subjects.map((subject) => ({
    params: { id: subject.id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(ctx) {
  const id = ctx.params.id;

  let { data: subject, error } = await supabase
    .from('subjects')
    .select('*, course_id(name)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return {
    revalidate: 60,
    props: { subject },
  };
}

export default Subject;
