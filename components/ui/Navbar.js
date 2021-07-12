import s from '../../styles/Navbar.module.scss';
import Link from 'next/link';
import { Button } from './Form';
import { useUser } from '../../utils/useUser';

const Navbar = () => {
  const { user, signOut } = useUser();

  return (
    <ul className={s.ul}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/courses">Cursos</Link>
      </li>
      <li>
        <Link href="/profile">Perfil</Link>
      </li>
      <li>
        <Link href="/admin">Admin</Link>
      </li>
      {!user && (
        <li>
          <Link href="/register">Register</Link>
        </li>
      )}
      {!user && (
        <li>
          <Link href="/login">Login</Link>
        </li>
      )}
      {user && (
        <li>
          <Button onClick={() => signOut()}>Logout</Button>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
