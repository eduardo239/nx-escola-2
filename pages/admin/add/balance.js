import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { Button, Input, Textarea } from '../../../components/ui/Form';
import { Send16 } from '@carbon/icons-react';
import { addBalance } from '../../../utils/index';
import toast, { Toaster } from 'react-hot-toast';

const Balance = ({ users }) => {
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [add, setAdd] = useState(true);

  const handleUpdateBalance = async (e) => {
    e.preventDefault();
    toast.loading('Loading...');
    setError(false);

    if (value === 0 || profileId === '') {
      toast.dismiss();
      toast.error('O valor e o usuário são requeridos.', {
        id: 'add-balance-value-empty',
      });
      setError(true);
      return;
    }

    let profile = users.filter((x) => x.id === profileId);
    const { error } = await addBalance(profile, 'add', value);

    if (error) {
      toast.dismiss();
      toast.error(error.message, {
        id: 'add-balance-error',
      });
    } else {
      toast.dismiss();
      toast.success('Balance successfully updated.', {
        id: 'add-balance-success',
      });
    }
  };

  return (
    <section className="p-5">
      <Toaster />
      <form onSubmit={handleUpdateBalance}>
        <h1>Add balance</h1>

        <Input
          type="number"
          placeholder="Value .."
          label="Value"
          id="add-balance-value"
          value={value}
          error={error}
          onChange={(e) => setValue(e.target.value)}
          className="w-100"
        />

        <div className="field--select mb-5">
          <label htmlFor="add-balance-user-id">User</label>
          <select
            className="w-100"
            onChange={(e) => setProfileId(e.target.value)}
            id="add-balance-user-id"
          >
            <option defaultValue value="">
              choose One
            </option>
            {users.map((x, i) => (
              <option value={x.id} key={x.id}>
                {x.username}
              </option>
            ))}
          </select>
        </div>

        {/* TODO: */}
        <div className="flex mb-5 gap-3">
          <div className="flex field--radio">
            <input
              type="radio"
              name={`add-course-balance`}
              id={`add-course-balance-add-0`}
              defaultChecked={add}
              onChange={() => setAdd(!add)}
            />
            <label
              htmlFor={`add-course-balance-add-0`}
              style={{
                padding: '0.5rem',
              }}
            >
              Add
            </label>
          </div>
          <div className="flex field--radio">
            <input
              type="radio"
              name={`add-course-balance`}
              id={`add-course-balance-add-1`}
              defaultChecked={!add}
              onChange={() => setAdd(!add)}
            />
            <label
              htmlFor={`add-course-balance-add-1`}
              style={{
                padding: '0.5rem',
              }}
            >
              Subtract
            </label>
          </div>
        </div>

        <Button primary type="submit">
          Save <Send16 />
        </Button>
      </form>
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
