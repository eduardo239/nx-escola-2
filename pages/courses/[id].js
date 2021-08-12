import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { ButtonIcon, ButtonOutline } from '../../components/ui/Form';
import { supabase } from '../../utils/supabase';
import { useUser } from '../../utils/useUser';
import { Currency16 } from '@carbon/icons-react';
import {
  app_description,
  app_name,
  default_course_poster,
} from '../../utils/constants';
import { formatMoney, paymentRecords, subscribe, timeFromX } from '../../utils';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../../components/ui/Spinner';
import s from '../../styles/Course.module.scss';

export default function Course({ course, subjects }) {
  const { user, profile, getUserCourses, userCourses } = useUser();
  const router = useRouter();

  // const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [owned, setOwned] = useState(false);

  // BUTTON LINK
  const mapSubjects = () => {
    return subjects.map((s, i) => (
      <ButtonOutline
        key={s.id}
        white
        full
        onClick={() => router.push(`/courses/subjects/${s.id}`)}
      >
        {i + 1} - {s.name}
      </ButtonOutline>
    ));
  };

  const handleSubscribe = async () => {
    toast.loading('Loading...');

    if (profile) {
      setLoading(true);
      const { error } = await subscribe('course', course, profile);
      if (error) {
        toast.dismiss();
        toast.error(error.message, {
          id: 'subscribe-course-error-subscribe',
        });
        setLoading(false);
        return;
      } else {
        const { error } = await paymentRecords(course, profile);
        if (error) {
          toast.dismiss();
          toast.error(error.message, {
            id: 'subscribe-course-error-payment',
          });
          setLoading(false);
          return;
        } else {
          getUserCourses(profile.id);
          toast.dismiss();
          toast.success('Inscrição realizada com sucesso.', {
            id: 'subscribe-course-success',
          });
          setLoading(false);
        }
      }
    }
  };

  if (course)
    return (
      <section className="p-5 bg-section">
        <Toaster />
        <Head>
          <title>{`${app_name} - ${course.name}`}</title>
          <meta
            name="description"
            content={`${app_name} - ${app_description}`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={s.container}>
          <div className={s.poster}>
            <Image
              src={course.poster ? course.poster : default_course_poster}
              alt={course.name}
              width={300}
              height={100}
            />
          </div>

          <div className={s.body}>
            <h1>{course.name}</h1>
            <p>{formatMoney(course.price)}</p>
            <p className="black80">{timeFromX(course.created_at)}</p>
            <div className="separator mb-5"></div>
            <p>{course.description}</p>
            {!owned && user && (
              <ButtonIcon
                disabled={loading}
                primary
                onClick={() => handleSubscribe(course)}
              >
                Se inscrever <Currency16 />
              </ButtonIcon>
            )}
          </div>
        </div>

        <div className="separator mb-5"></div>

        {!owned && user && (
          <div className={s.subject}>
            <h3 className="text-center mb-5">Matérias</h3>
            <div className={s.subjects}>
              {subjects.length === 0 ? <p>Não há matérias.</p> : mapSubjects()}
            </div>
          </div>
        )}
      </section>
    );

  return <Spinner />;
}

export async function getStaticPaths() {
  let { data: courses, error } = await supabase.from('courses').select('id');

  const paths = courses.map((course) => ({
    params: { id: course.id },
  }));

  if (error) throw new Error(error);

  return { paths, fallback: true };
}

export async function getStaticProps(ctx) {
  let id = ctx.params.id;
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
    revalidate: 60,
    props: { course, subjects },
  };
}
