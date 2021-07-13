import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { Edit16, TrashCan16 } from '@carbon/icons-react';
import { ButtonIcon, Button, IconOnly } from '../../../components/ui/Form';
// import Modal from '../../../components/ui/Modal';
import toast, { Toaster } from 'react-hot-toast';
// import ModalEdit from '../../../components/admin/edit/ModalEdit';

const Courses = ({ courses }) => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [ok, setOk] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

  const handleDeleteOk = async () => {
    setLoading(true);
    const { error } = await supabase.from('course').delete().eq('id', courseId);

    if (error)
      toast.error(error.message, {
        id: 'admin-all-course-error',
      });
    else {
      toast.success('Course successfully removed.', {
        id: 'admin-all-course-success',
      });
    }
    setLoading(false);
  };

  const handleModal = async (id) => {
    setCourseId(id);
    setModal(!modal);
  };

  const handleEditModal = (x) => {
    setCourseId(x.id);
    setCourse(x);
    setEditModal(!editModal);
  };

  const mapCourses = () => {
    return courses.map((x) => (
      <div key={x.id} className="list-row">
        <p>{x.name}</p>
        <div className="flex">
          <IconOnly
            disabled={loading}
            secondary
            onClick={() => handleEditModal(x)}
          >
            <Edit16 />
          </IconOnly>
          <IconOnly disabled={loading} danger onClick={() => handleModal(x.id)}>
            <TrashCan16 />
          </IconOnly>
        </div>
      </div>
    ));
  };

  return (
    <section>
      <Toaster />

      <h1>All Courses</h1>

      {courses.length === 0 ? <p>Courses not found</p> : mapCourses()}

      {/* {courseId && modal && (
        <Modal
          setOk={setOk}
          setModal={setModal}
          handleDeleteOk={handleDeleteOk}
        />
      )}

      {courseId && editModal && (
        <ModalEdit setEditModal={setEditModal} course={course} />
      )} */}
    </section>
  );
};

export async function getStaticProps() {
  let { data: courses, error } = await supabase.from('courses').select('*');

  if (error) throw error;
  return {
    props: { courses },
  };
}

export default Courses;
