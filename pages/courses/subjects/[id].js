//TODO:
import { supabase } from '../../../utils/initSupabase';
import { Button } from '../../../components/ui/Form';
import { useRouter } from 'next/router';
import Back from '../../../components/ui/Back';
import Link from 'next/link';
import Image from 'next/image';
import s from './Subject.module.css';

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

  return (
    <section>
      <div className="mb-4">
        <Back />
      </div>

      <small>{subject?.course_id?.name}</small>
      <h1>{subject?.name}</h1>
      <p>{subject?.runtime ? `${subject?.runtime} min.` : ''}</p>

      <div className="separator"></div>

      <div className="mb-4">
        {subject.content.length === 0 ? <p>Content not found</p> : mapContent()}
      </div>

      <div className="mb-4">
        <Button
          primary
          onClick={() =>
            router.push(`/courses/subject/questions/${subject.id}`)
          }
        >
          Questions
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
