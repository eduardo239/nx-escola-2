import { supabase } from '../../../utils/supabase';
import { useState } from 'react';
import { ButtonIcon, IconOnly } from '../../ui/Form';
import { TrashCan16 } from '@carbon/icons-react';
import { formatDate, formatMoney, timeFromX } from '../../../utils';

const headers = ['Curso', 'Valor', 'Atualizado em'];

export default function Payments({ user_payments }) {
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setLoading(true);
    setLoading(false);
    return;
  };

  const mapUserPayments = () => {
    return user_payments
      .map((x) => (
        <tr key={x.id} className="table-row">
          <td>{x.course_id.name}</td>
          <td>{formatMoney(x.value)}</td>
          <td>{formatDate(x.updated_at)}</td>
        </tr>
      ))
      .reverse();
  };
  return (
    <section>
      <h1 className="mb-5">Meus Cursos</h1>

      <table className="table mb-10">
        <thead>
          <tr className="table-header">
            {headers.map((x, i) => (
              <th key={i}>{x}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {user_payments.length === 0 ? (
            <tr>
              <td className="table-info" colSpan={headers.length}>
                Não há registro de pagamentos.
              </td>
            </tr>
          ) : (
            mapUserPayments()
          )}
        </tbody>
      </table>
    </section>
  );
}
