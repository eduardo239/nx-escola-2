import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { Input, Button } from '../../../components/ui/Form';
import { NextOutline16, Save16 } from '@carbon/icons-react';
import toast, { Toaster } from 'react-hot-toast';
import Content from '../../../components/form/Content';
import { useRouter } from 'next/router';

const Subject = ({ courses }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [runtime, setRuntime] = useState(0);
  const [courseId, setCourseId] = useState('');
  const handleAddSubject = async (e) => {
    e.preventDefault();

    if (name === '') {
      toast.error('O nome da matéria é obrigatório.', {
        id: 'add-subject-name',
      });
      return;
    }
    if (runtime === 0) {
      toast.error('O tempo é obrigatório.', {
        id: 'add-subject-runtime',
      });
      return;
    }
    if (content.length === 0) {
      toast.error('O conteúdo é obrigatório.', {
        id: 'add-subject-content',
      });
      return;
    }
    if (courseId === '') {
      toast.error('O curso é obrigatório.', {
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

    const { error } = await supabase.from('subjects').insert([body]);

    if (error) {
      toast.error(error.message, {
        id: 'add-subject-error',
      });
      return;
    }

    toast.success('Curso adicionado com sucesso.', {
      id: 'add-subject-success',
    });
  };

  return (
    <section className="p-5 bg-section">
      <Toaster />
      <h1>Adicionar matéria</h1>
      <div className="mb-5">
        <Input
          type="text"
          placeholder="Nome da matéira .."
          label="Nome da matéira"
          id="add-subject-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-100"
        />
        <Input
          type="number"
          label="Runtime"
          id="add-subject-runtime"
          value={runtime}
          onChange={(e) => setRuntime(e.target.value)}
          className="w-100"
        />
      </div>

      <div className="mb-5">
        <Content setContent={setContent} />
      </div>

      <div className="field--select mb-5">
        <label htmlFor="add-subject-course-id">Curso</label>
        <select
          className="w-100"
          onChange={(e) => setCourseId(e.target.value)}
          id="add-subject-course-id"
        >
          <option defaultValue value="">
            Escolha um
          </option>
          {courses.map((x, i) => (
            <option value={x.id} key={x.id}>
              {x.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <Button primary type="submit" onClick={handleAddSubject}>
          Salvar <Save16 />
        </Button>

        <Button secondary onClick={() => router.push('/admin/add/questions')}>
          Adicionar Perguntas <NextOutline16 />
        </Button>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  let { data: courses, error } = await supabase
    .from('courses')
    .select('id, name');

  if (error) throw error;

  return {
    props: { courses },
  };
}

export default Subject;
