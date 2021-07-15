import { useRouter } from 'next/router';
import { Button } from '../components/ui/Form';
import { default_course_poster } from '../utils/constants';
import s from '../styles/Card.module.scss';
import { formatMoney, sliceString } from '../utils/index';
import Link from 'next/link';

export const Card = ({ course }) => {
  const router = useRouter();

  return (
    <Link href={`/courses/${course.id}`} passHref>
      <div key={course.id} className={s.card}>
        <div>
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={s.poster}
            src={course.poster ? course.poster : default_course_poster}
            alt={course.name}
          />
        </div>
        <div className={s.card_body}>
          <div className="mb-3">
            <small>
              {course.price ? formatMoney(course.price) : 'Undefined'}
            </small>
          </div>
          <p className={s.title}>{course.name}</p>
          <p className={s.paragraph}>
            {course.description ? sliceString(course.description) : 'Undefined'}
          </p>
          <small>{course.runtime ? course.runtime : 'Undefined'}</small>
        </div>
        {/* <Button
        className="w-100"
        primary
        onClick={() => router.push(`/courses/${course.id}`)}
      >
        Leia mais
      </Button> */}
      </div>
    </Link>
  );
};
