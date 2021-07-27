import { useState } from 'react';
import { useUser } from '../../utils/useUser';
import { Button, ButtonIcon, Input } from '../../components/ui/Form';
import { Money16, NextOutline16, Send16 } from '@carbon/icons-react';
import { app_description, app_name } from '../../utils/constants';
import { formatMoney } from '../../utils';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../../components/ui/Spinner';
import Head from 'next/head';

const payment_type = ['boleto', 'cartão de crédito', 'pix'];

const Balance = () => {
  const { profile, updateBalance } = useUser();

  const [value, setValue] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleUpdateBalance = async (e) => {
    e.preventDefault();

    const { error } = await updateBalance(profile, 'add', parseFloat(value));
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

  const mapPaymentMethod = () => {
    return payment_type.map((x) => <option key={x}>{x}</option>);
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
        <Head>
          <title>{`${app_name} - Adicionar saldo`}</title>
          <meta
            name="description"
            content={`${app_name} - ${app_description}`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Toaster />

        <h1 className="mb-5">Saldo Atual</h1>
        <p>Username: {profile.username}</p>
        <p>{formatMoney(profile.balance.toFixed(2))}</p>
        <div>
          <h3 className="mb-5">Adicionar saldo</h3>

          <div className="mb-5 flex gap-1">
            <ButtonIcon secondary onClick={() => setValue('100')}>
              100 <Money16 />
            </ButtonIcon>
            <ButtonIcon secondary onClick={() => setValue('200')}>
              200 <Money16 />
            </ButtonIcon>
            <ButtonIcon secondary onClick={() => setValue('500')}>
              500 <Money16 />
            </ButtonIcon>
          </div>

          <form onSubmit={handleUpdateBalance}>
            <Input
              type="text"
              placeholder="Value .."
              label="Value"
              id="add-balance-value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="field--select mb-5">
              <label htmlFor="add-balance-user-id">Método de pagamento:</label>
              <select
                onChange={(e) => setPaymentMethod(e.target.value)}
                id="add-balance-user-id"
              >
                <option defaultValue value="">
                  Escolha um
                </option>
                {mapPaymentMethod()}
              </select>
            </div>

            <Button primary type="submit">
              Próximo <NextOutline16 />
            </Button>
          </form>
        </div>
      </section>
    );
  }
};

export default Balance;
