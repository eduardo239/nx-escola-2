import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Button } from '../../components/ui/Form';
import { supabase } from '../../utils/supabase';
import { useUser } from '../../utils/useUser';
import { Currency16 } from '@carbon/icons-react';
import { app_name, default_course_poster } from '../../utils/constants';
import { paymentRecords, subscribe } from '../../utils';
import s from '../../styles/Course.module.scss';
import toast, { Toaster } from 'react-hot-toast';

export default function Course({ course, subjects }) {
  const { userProfile, user, profile, getUserCourses, userCourses } = useUser();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [owned, setOwned] = useState(false);

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
    toast.loading('Loading...');

    if (profile) {
      setLoading(true);
      const { error } = await subscribe('course', course, profile);
      if (error) {
        toast.error(error.message, {
          id: 'subscribe-course-error-subscribe',
        });
        setLoading(false);
        toast.dismiss();
        return;
      } else {
        const { error } = await paymentRecords(course, profile);
        if (error) {
          toast.error(error.message, {
            id: 'subscribe-course-error-payment',
          });
          setLoading(false);
          toast.dismiss();
          return;
        } else {
          getUserCourses(profile.id);
          toast.dismiss();
          toast.success('Course successfully subscribed.', {
            id: 'subscribe-course-success',
          });
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) userProfile(user.id);
    // if (profile) {
    //   getUserCourses(profile.id);
    //   if (userCourses.length > 0) setOwned(true);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (course)
    return (
      <section>
        <Toaster />

        <Head>
          <title>{`${app_name} - Curso: ${course.name}.`}</title>
          <meta name="description" content="Cursos de todos os tipos aqui." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

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
            {!owned && (
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

        {!owned && (
          <div className={s.subjects}>
            <h3 className="text-center mb-4">Matérias</h3>
            <div className="flex-center-center gap-2">
              {subjects.length === 0 ? (
                <div>Não há matérias.</div>
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
