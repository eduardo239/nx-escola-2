import { useState } from 'react';
import { Save16 } from '@carbon/icons-react';
import { Button, Input, Textarea } from '../../../components/ui/Form';
import { supabase } from '../../../utils/supabase';
import toast, { Toaster } from 'react-hot-toast';

const Course = () => {
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
      promo_code: promoCode,
      poster_url: posterURL,
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

  return (
    <section>
      <Toaster />

      <h1>Add course</h1>

      <form onSubmit={handleAddCourse}>
        <Input
          type="text"
          placeholder="Name of the course .."
          label="Name"
          id="add-course-name"
          value={name}
          error={error}
          onChange={(e) => setName(e.target.value)}
          className="w-100"
        />
        <Input
          type="number"
          placeholder="Course duration .."
          label="Runtime"
          id="add-course-runtime"
          value={runtime}
          error={error}
          onChange={(e) => setRuntime(e.target.value)}
          className="w-100"
        />
        <Input
          type="number"
          placeholder="Price .."
          label="Price"
          id="add-course-price"
          value={price}
          error={error}
          onChange={(e) => setPrice(e.target.value)}
          className="w-100"
        />

        <Input
          type="text"
          placeholder="Promo code .."
          label="Promo Code"
          id="add-course-promo-code"
          value={promoCode}
          error={error}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-100"
        />
        <Input
          type="text"
          placeholder="Poster URL .."
          label="Poster URL"
          id="add-course-promo-poster"
          value={posterURL}
          error={error}
          onChange={(e) => setPosterURL(e.target.value)}
          className="w-100"
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
            <label
              htmlFor={`alt-course-active-1`}
              style={{
                padding: '0.5rem',
              }}
            >
              Active
            </label>
          </div>
        </div>

        <Textarea
          label="Description"
          placeholder="Description of the course"
          className="w-100"
          rows="3"
          error={error}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>

        <Button primary type="submit">
          Save <Save16 />
        </Button>
      </form>
    </section>
  );
};

export default Course;
