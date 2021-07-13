import { supabase } from '../../../utils/supabase';
import { useState } from 'react';
import { ButtonIcon, IconOnly } from '../../ui/Form';
import { TrashCan16 } from '@carbon/icons-react';

export default function MyGrades({ user_grades }) {
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setLoading(true);
    setLoading(false);
    return;
  };

  const mapUserGrades = () => {
    return user_grades.map((x) => (
      <div key={x.id} className="list-row">
        <div>
          <small>{x.result}</small>
        </div>
        <IconOnly disabled={loading} danger onClick={() => handleModal(x.id)}>
          <TrashCan16 />
        </IconOnly>
      </div>
    ));
  };
  return (
    <section>
      <h1>Minhas Notas</h1>

      {user_grades.length === 0 ? (
        <p>User grades not found</p>
      ) : (
        mapUserGrades()
      )}
    </section>
  );
}
