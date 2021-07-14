import { supabase } from '../../../utils/supabase';
import { useState } from 'react';
import { ButtonIcon, IconOnly } from '../../ui/Form';
import { TrashCan16 } from '@carbon/icons-react';

const headers = ['Curso', 'Matéria', 'Nota', 'Opções'];

export default function MyGrades({ user_grades }) {
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setLoading(true);
    setLoading(false);
    return;
  };

  const mapUserGrades = () => {
    return user_grades.map((x) => (
      <tr key={x.id} className="table-row">
        <td>{x.subject_id.course_id.name}</td>
        <td>{x.subject_id.name}</td>
        <td>{x.result}</td>
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
      <h1>Minhas Notas</h1>

      <table className="table">
        <thead>
          <tr className="table-header">
            {headers.map((x, i) => (
              <th key={i}>{x}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {user_grades.length === 0 ? (
            <td className="table-info" colSpan={headers.length}>
              Não há registros de notas.
            </td>
          ) : (
            mapUserGrades()
          )}
        </tbody>
      </table>
    </section>
  );
}
