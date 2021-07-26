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

  const mapContent = () => {
    return subject.content.map((c, i) => (
      <div key={i} className="text-center">
        {c.type === 'title' && <h1 className={s.h1}>{c.content}</h1>}
        {c.type === 'subtitle' && <h4 className={s.subtitle}>{c.content}</h4>}
        {c.type === 'paragraph' && <p className={s.paragraph}>{c.content}</p>}
        {c.type === 'text' && <p className="text-left">{c.content}</p>}
        {c.type === 'video' && <p>{c.content}</p>}
        {c.type === 'pdf' && <p>{c.content}</p>}
        {c.type === 'anchor' && (
          <a href={c.content} target="_blank" rel="noreferrer">
            {c.content}
          </a>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {c.type === 'image' && <img src={c.content} alt={c.content} />}
      </div>
    ));
  };

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
          {subject.content.length === 0 ? (
            <p>Conteúdo não encontrado.</p>
          ) : (
            mapContent()
          )}
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
