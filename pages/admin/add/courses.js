import { useEffect, useState } from 'react';
import { NextOutline16, Save16 } from '@carbon/icons-react';
import { ButtonIcon, Input, Textarea } from '../../../components/ui/Form';
import { supabase } from '../../../utils/supabase';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../../../utils/useUser';
import { useRouter } from 'next/router';

const Course = () => {
  const { user, profile } = useUser();
  const router = useRouter();
  const [name, setName] = useState('');
  const [runtime, setRuntime] = useState(0);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [posterURL, setPosterURL] = useState('');
  const [status, setStatus] = useState(true);
  const [error, setError] = useState(false);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setError(false);

    if (name === '') {
      toast('Name is required.', {
        id: 'add-course-name',
      });
      setError(true);
      return;
    }
    if (runtime === 0) {
      toast('Runtime is required.', {
        id: 'add-course-runtime',
      });
      setError(true);
      return;
    }
    if (description === '') {
      toast('Description is required.', {
        id: 'add-course-description',
      });
      setError(true);
      return;
    }

    const body = {
      name,
      runtime,
      description,
      promo: promoCode,
      poster: posterURL,
      price: price ? parseFloat(price.replace(',', '.')) : 0,
      status,
    };
    const { error } = await supabase.from('courses').insert([body]);

    if (error) {
      toast.error(error.message, {
        id: 'add-course-error',
      });
    } else {
      toast.success('Course successfully added.', {
        id: 'add-course-success',
      });
    }
  };

  if (user && profile?.is_admin)
    return (
      <section className="p-5 bg-section">
        <Toaster />

        <h1>Adicionar Curso</h1>

        <form onSubmit={handleAddCourse} className="mb-5">
          <Input
            type="text"
            placeholder="Name of the course .."
            label="Name"
            id="add-course-name"
            value={name}
            error={error}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Course duration .."
            label="Runtime"
            id="add-course-runtime"
            value={runtime}
            error={error}
            onChange={(e) => setRuntime(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price .."
            label="Price"
            id="add-course-price"
            value={price}
            error={error}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Promo code .."
            label="Promo Code"
            id="add-course-promo-code"
            value={promoCode}
            error={error}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Poster URL .."
            label="Poster URL"
            id="add-course-promo-poster"
            value={posterURL}
            error={error}
            onChange={(e) => setPosterURL(e.target.value)}
          />
          <div className="flex" style={{ gap: '1rem' }}>
            <div className={`flex list-item`} style={{ flex: '1' }}>
              <input
                type="checkbox"
                name={`add-course-active`}
                id={`alt-course-active-1`}
                defaultChecked={status}
                onChange={() => setStatus(!status)}
              />
              <label htmlFor={`alt-course-active-1`}>Active</label>
            </div>
          </div>

          <Textarea
            label="Description"
            placeholder="Description of the course"
            rows="3"
            error={error}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>

          <ButtonIcon primary type="submit">
            Save <Save16 />
          </ButtonIcon>
        </form>

        <ButtonIcon
          secondary
          onClick={() => router.push('/admin/add/subjects')}
        >
          Adicionar Mat??rias <NextOutline16 />
        </ButtonIcon>
      </section>
    );
  else
    return (
      <section>
        <h1>Voc?? n??o est?? autorizado.</h1>
      </section>
    );
};

export default Course;
