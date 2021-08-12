import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { Button, Input } from '../../../components/ui/Form';
import { Send16 } from '@carbon/icons-react';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../../../utils/useUser';
import { formatMoney } from '../../../utils';
// import Spinner from '../../../components/ui/Spinner';

const Balance = ({ users }) => {
  const { updateBalance, user, profile } = useUser();
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [operation, setOperation] = useState('add');

  const handleUpdateBalance = async (e) => {
    e.preventDefault();
    toast.loading('Loading...');
    setError(false);

    if (value === 0 || profileId === '') {
      toast.dismiss();
      toast.error('O valor e o usuário são obrigatórios.', {
        id: 'add-balance-value-empty',
      });
      setError(true);
      return;
    }

    let p = users.filter((x) => x.id === profileId);
    let profile = p[0];
    const { error } = await updateBalance(profile, operation, value);

    if (error) {
      toast.dismiss();
      toast.error(error.message, {
        id: 'add-balance-error',
      });
      return;
    } else {
      toast.dismiss();
      toast.success('Saldo atualizado com sucesso.', {
        id: 'add-balance-success',
      });
    }
  };

  if (user && profile?.is_admin)
    return (
      <section className="p-5 bg-section">
        <Toaster />
        <form onSubmit={handleUpdateBalance}>
          <h1>Adicionar saldo</h1>

          <Input
            type="number"
            placeholder="Value .."
            label="Value"
            id="add-balance-value"
            value={value}
            error={error}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="field--select mb-5">
            <label htmlFor="add-balance-user-id">User</label>
            <select
              onChange={(e) => setProfileId(e.target.value)}
              id="add-balance-user-id"
            >
              <option defaultValue value="">
                Escolha um
              </option>
              {users.map((x, i) => (
                <option value={x.id} key={x.id}>
                  {x.username} - {formatMoney(x.balance)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex mb-5 gap-3">
            <div className="flex field--radio">
              <input
                type="radio"
                name={`add-course-balance`}
                id={`add-course-balance-add-0`}
                value="add"
                onChange={() => setOperation('add')}
              />
              <label htmlFor={`add-course-balance-add-0`}>Adicionar</label>
            </div>
            <div className="flex field--radio">
              <input
                type="radio"
                name={`add-course-balance`}
                id={`add-course-balance-add-1`}
                value="sub"
                onChange={() => setOperation('sub')}
              />
              <label htmlFor={`add-course-balance-add-1`}>Subtrair</label>
            </div>
          </div>
          <Button primary type="submit">
            Salvar <Send16 />
          </Button>
        </form>
      </section>
    );
  else
    return (
      <section>
        <h1>Você não está autorizado.</h1>
      </section>
    );
};

export async function getStaticProps(ctx) {
  let { data: users, error } = await supabase.from('profiles').select('*');

  if (error) throw error;

  return {
    props: { users },
  };
}

export default Balance;
