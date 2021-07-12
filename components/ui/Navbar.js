import s from '../../styles/Navbar.module.scss';
import Link from 'next/link';
import { Button, ButtonIcon } from './Form';
import { useUser } from '../../utils/useUser';
import { useState } from 'react';
import { Switcher16 } from '@carbon/icons-react';

const Navbar = () => {
  const { user, signOut } = useUser();
  const [menu, setMenu] = useState(false);

  const handleClickOutside = (e) => {
    const tar = e.target;
    const cur = e.currentTarget;
    if (tar === cur) setMenu(!menu);
  };

  const handleClick = (e) => {
    const tar = e.target;
    const cur = e.currentTarget;
    tar !== cur && setMenu(false);
  };

  return (
    <>
      <ButtonIcon onClick={() => setMenu(!menu)}>
        Menu
        <Switcher16 />
      </ButtonIcon>

      <section
        className={`${s.container} menu-container`}
        onClick={handleClickOutside}
        style={{ display: `${menu ? 'flex' : 'none'}` }}
      >
        {menu}
        <ul className={s.ul} onClick={handleClick}>
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
      </section>
    </>
  );
};

export default Navbar;
