import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { Input, Button } from '../../../components/ui/Form';
import { Save16 } from '@carbon/icons-react';
import toast, { Toaster } from 'react-hot-toast';
import Content from '../../../components/admin/new/Content';

const Subject = ({ courses }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [runtime, setRuntime] = useState(0);
  const [courseId, setCourseId] = useState('');
  const handleAddSubject = async (e) => {
    e.preventDefault();

    if (name === '') {
      toast('Name is required.', {
        id: 'add-subject-name',
      });
      return;
    }
    if (runtime === 0) {
      toast.error('Runtime is required.', {
        id: 'add-subject-runtime',
      });
      return;
    }
    console.log(content.length);
    if (content.length === 0) {
      toast.error('Content is required.', {
        id: 'add-subject-content',
      });
      return;
    }
    if (courseId === '') {
      toast.error('Course is required.', {
        id: 'add-subject-course',
      });
      return;
    }

    const body = {
      course_id: courseId,
      name,
      runtime,
      content,
    };
    console.log(body);

    const { error } = await supabase.from('subjects').insert([body]);

    if (error) {
      toast.error(error.message, {
        id: 'add-subject-error',
      });
      return;
    }

    toast.success('Subject successfully added', {
      id: 'add-subject-success',
    });
  };

  return (
    <section>
      <Toaster />
      <h1>Add subject</h1>
      <Input
        type="text"
        placeholder="Name of the subject .."
        label="Name of the subject"
        id="add-subject-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-100"
      />
      <Input
        type="number"
        placeholder="Subject duration .."
        label="Runtime"
        id="add-subject-runtime"
        value={runtime}
        onChange={(e) => setRuntime(e.target.value)}
        className="w-100"
      />

      <Content setContent={setContent} />

      <div>{courseId}</div>
      <div className="field--select mb-4">
        <label htmlFor="add-subject-course-id">Course</label>
        <select
          className="w-100"
          onChange={(e) => setCourseId(e.target.value)}
          id="add-subject-course-id"
        >
          <option defaultValue value="">
            choose One
          </option>
          {courses.map((x, i) => (
            <option value={x.id} key={x.id}>
              {x.name}
            </option>
          ))}
        </select>
      </div>

      <Button primary type="submit" onClick={handleAddSubject}>
        Save <Save16 />
      </Button>
    </section>
  );
};

export async function getStaticProps(context) {
  let { data: courses, error } = await supabase
    .from('courses')
    .select('id, name');

  if (error) throw error;

  return {
    props: { courses },
  };
}

export default Subject;
