import { supabase } from '../../../utils/supabase';
import { useState } from 'react';
import { ButtonIcon, IconOnly } from '../../ui/Form';
import { TrashCan16 } from '@carbon/icons-react';

const headers = ['Poster', 'Curso', 'Atualizado em', 'Opções'];

export default function Payments({ user_courses }) {
  console.log(user_courses);
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setLoading(true);
    setLoading(false);
    return;
  };

  const mapUserCourses = () => {
    return user_courses.map((x) => (
      <tr key={x.id} className="table-row">
        <td>{x.poster}</td>
        <td>{x.course_id.name}</td>
        <td>{x.updated_at}</td>
        <td>
          <IconOnly disabled={loading} danger onClick={() => handleModal(x.id)}>
            <TrashCan16 />
          </IconOnly>
        </td>
      </tr>
    ));
  };
  return (
    <section>
      <h1>Meus Cursos</h1>

      <table className="table">
        <thead>
          <tr className="table-header">
            {headers.map((x, i) => (
              <th key={i}>{x}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {user_courses.length === 0 ? (
            <td className="table-info" colSpan={headers.length}>
              Não há registro de cursos.
            </td>
          ) : (
            mapUserCourses()
          )}
        </tbody>
      </table>
    </section>
  );
}
