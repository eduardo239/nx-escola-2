import { useUser } from '../../utils/useUser';

const Admin = () => {
  const { user, profile } = useUser();
  if (user && profile?.is_admin)
    return (
      <div>
        <h1>Admin</h1>
      </div>
    );
  else
    return (
      <section>
        <h1>Você não está autorizado.</h1>
      </section>
    );
};

export default Admin;
