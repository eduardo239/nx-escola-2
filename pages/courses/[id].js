import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/Form';
import { supabase } from '../../utils/supabase';
import { useUser } from '../../utils/useUser';
import { Currency16 } from '@carbon/icons-react';
import { default_course_poster } from '../../utils/constants';
import s from '../../styles/Course.module.scss';

export default function Course({ course, subjects }) {
  const { userProfile, user, profile } = useUser();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const mapSubjects = () => {
    return subjects.map((s) => (
      <div key={s.id}>
        <Button danger onClick={() => router.push(`/courses/subject/${s.id}`)}>
          {s.name}
        </Button>
      </div>
    ));
  };

  const handleSubscribe = async () => {
    return;
  };

  useEffect(() => {
    if (user) userProfile(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (course)
    return (
      <section>
        <div className={s.container}>
          <div className={s.poster}>
            <Image
              src={
                course?.poster_url ? course.poster_url : default_course_poster
              }
              alt={course?.name && 'Course'}
              width={300}
              height={100}
            />
          </div>
          <div className={s.body}>
            <h1>{course?.name}</h1>
            <p>{course?.price}</p>
            <div className="separator"></div>
            <p>{course?.description}</p>
            {!show && (
              <Button
                disabled={loading}
                primary
                onClick={() => handleSubscribe(course)}
              >
                Subscribe <Currency16 />
              </Button>
            )}
          </div>
        </div>

        <div className="separator"></div>

        {show && (
          <div>
            <h3 className="text-center mb-4">Subjects</h3>
            <div className="flex-center-center gap-2">
              {subjects.length === 0 ? (
                <div>Subjects not found</div>
              ) : (
                mapSubjects()
              )}
            </div>
          </div>
        )}
      </section>
    );
  return (
    <section>
      <h4>Curso não encontrado</h4>
    </section>
  );
}

export async function getStaticPaths() {
  let { data: courses, error } = await supabase.from('courses').select('id');

  const paths = courses.map((course) => ({
    params: { id: course.id },
  }));

  if (error) throw new Error(error);

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  let id = context.params.id;
  const { data: course, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error);

  const { data: subjects, error: error_subjects } = await supabase
    .from('subjects')
    .select('*')
    .eq('course_id', course.id);

  if (error_subjects) throw new Error(error_subjects);
  return {
    props: { course, subjects },
  };
}
