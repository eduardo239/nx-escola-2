import s from '../../styles/Navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
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
        <Link href="/logout">Logout</Link>
      </li>
    </ul>
  );
};

export default Navbar;
