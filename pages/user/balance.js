import Spinner from '../../components/ui/Spinner';
import { useState } from 'react';
import { useUser } from '../../utils/useUser';
import { Button, Input } from '../../components/ui/Form';
import { Send16 } from '@carbon/icons-react';
import toast, { Toaster } from 'react-hot-toast';
import { formatMoney } from '../../utils';

const Balance = () => {
  const { profile, updateBalance } = useUser();

  const [value, setValue] = useState(0);

  const handleUpdateBalance = async (e) => {
    e.preventDefault();

    const { error } = await updateBalance(profile, 'add', value);
    if (error) {
      toast.dismiss();
      toast.error(error.message, {
        id: 'add-user-balance-error',
      });
      return;
    } else {
      toast.dismiss();
      toast.success('Saldo atualizado com sucesso.', {
        id: 'add-user-balance-success',
      });
    }
  };

  if (!profile) {
    return (
      <section className="p-5 bg-section">
        <Spinner />
      </section>
    );
  }
  if (profile) {
    return (
      <section className="p-5 bg-section">
        <h1 className="mb-5">Saldo do usuário</h1>
        <p>Username: {profile.username}</p>
        <p>{formatMoney(profile.balance)}</p>
        <div>
          <form onSubmit={handleUpdateBalance}>
            <h1>Adicionar saldo</h1>

            <Input
              type="text"
              placeholder="Value .."
              label="Value"
              id="add-balance-value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-100"
            />

            <Button primary type="submit">
              Salvar <Send16 />
            </Button>
          </form>
        </div>
      </section>
    );
  }
};

export default Balance;
