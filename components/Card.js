import { useRouter } from 'next/router';
import { Button } from '../components/ui/Form';
import { default_course_poster } from '../utils/constants';
import Image from 'next/image';
import s from '../styles/Card.module.scss';

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
        <div className="mb-2">
          <small>{course.price ? course.price : 'Undefined'}</small>
        </div>
        <p className="body-heavy mb-3">{course.name}</p>
        <p className="small-light mb-3">{course.description ?? ''}</p>
        <small className="small-light">
          {course.runtime ? `${course.runtime} min` : ''}
        </small>
      </div>
      <Button
        className="w-100"
        primary
        onClick={() => router.push(`/courses/${course.id}`)}
      >
        Read more
      </Button>
    </div>
  );
};
