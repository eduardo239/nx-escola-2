import { useRouter } from 'next/router';
import { Button } from '../components/ui/Form';
import { default_course_poster } from '../utils/constants';
import Image from 'next/image';
import s from '../styles/Card.module.scss';
import { formatMoney, sliceString } from '../utils/index';
export const Card = ({ course }) => {
  const router = useRouter();

  return (
    <div key={course.id} className={s.card}>
      <Image
        src={course?.poster_url ? course.poster_url : default_course_poster}
        alt="course image"
        width={300}
        height={100}
      />
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
      <Button
        className="w-100"
        primary
        onClick={() => router.push(`/courses/${course.id}`)}
      >
        Leia mais
      </Button>
    </div>
  );
};
