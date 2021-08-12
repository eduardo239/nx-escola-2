import { supabase } from '../../../utils/supabase';
import { useState } from 'react';
import { ButtonIcon, IconOnly } from '../../ui/Form';
import { TrashCan16 } from '@carbon/icons-react';
import { formatDate, timeFromX } from '../../../utils';

const headers = ['Curso', 'Matéria', 'Nota', 'Atualizado em'];

export default function MyGrades({ user_grades }) {
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setLoading(true);
    setLoading(false);
    return;
  };

  const resultPass = (x) => {
    if (x > 5.999) {
      return 'aprovado';
    } else {
      return 'reprovado';
    }
  };
  const mapUserGrades = () => {
    return user_grades
      .map((x) => (
        <tr key={x.id} className="table-row">
          <td>{x.subject_id.course_id.name}</td>
          <td>{x.subject_id.name}</td>
          <td className={resultPass(x.result)}>{x.result}</td>
          <td>{formatDate(x.updated_at)}</td>
        </tr>
      ))
      .reverse();
  };
  return (
    <section>
      <h1 className="mb-5">Minhas Notas</h1>

      <table className="table mb-10">
        <thead>
          <tr className="table-header">
            {headers.map((x, i) => (
              <th key={i}>{x}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {user_grades.length === 0 ? (
            <tr>
              <td className="table-info" colSpan={headers.length}>
                Não há registros de notas.
              </td>
            </tr>
          ) : (
            mapUserGrades()
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={headers.length}>
              <small style={{ opacity: '0.7', padding: '10px' }}>
                Nota mínima de 6 para passar.
              </small>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}
