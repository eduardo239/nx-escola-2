//TODO:
import { supabase } from '../../../utils/supabase';
import { Button } from '../../../components/ui/Form';
import { useRouter } from 'next/router';
import Image from 'next/image';
import s from '../../../styles/Subject.module.scss';
import Head from 'next/head';
import { app_name } from '../../../utils/constants';
import Spinner from '../../../components/ui/Spinner';

const Subject = ({ subject }) => {
  const router = useRouter();

  const mapContent = () => {
    return subject.content.map((c, i) => (
      <div key={i} className={s.element}>
        {c.type === 'title' && <h1 className={s.h1}>{c.content}</h1>}
        {c.type === 'subtitle' && <h4 className={s.subtitle}>{c.content}</h4>}
        {c.type === 'paragraph' && <p className={s.paragraph}>{c.content}</p>}
        {c.type === 'text' && <p>{c.content}</p>}
        {c.type === 'video' && <p>{c.content}</p>}
        {c.type === 'pdf' && <p>{c.content}</p>}
        {c.type === 'anchor' && (
          <a href={c.content} target="_blank" rel="noreferrer">
            {c.content}
          </a>
        )}
        {c.type === 'image' && (
          <Image
            height={c.size.height || '300'}
            width={c.size.width || '100'}
            src={c.content}
            alt={c.content}
          />
        )}
      </div>
    ));
  };

  if (subject)
    return (
      <section>
        <Head>
          <title>{`${app_name} - Matéria: ${subject.name}`}</title>
          <meta name="description" content="Cursos de todos os tipos aqui." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <small>{subject?.course_id?.name}</small>
          <h1>{subject?.name}</h1>
          <p>{subject?.runtime ? `${subject?.runtime} min.` : ''}</p>
        </div>

        <div className="separator"></div>

        <div className="mb-4">
          {subject.content.length === 0 ? (
            <p>Content not found</p>
          ) : (
            mapContent()
          )}
        </div>

        <div className="mb-4">
          <Button
            primary
            onClick={() =>
              router.push(`/courses/subjects/questions/${subject.id}`)
            }
          >
            Questions
          </Button>
        </div>
      </section>
    );

  if (!subject)
    return (
      <section>
        <h4>Curso não encontrado</h4>
      </section>
    );

  return <Spinner />;
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

  let { data: subject, error } = await supabase
    .from('subjects')
    .select('*, course_id(name)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return {
    props: { subject },
  };
}

export default Subject;
