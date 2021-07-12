import s from '../../styles/Navbar.module.scss';
import Link from 'next/link';
import { Button, ButtonIcon } from './Form';
import { useUser } from '../../utils/useUser';
import { useEffect, useState } from 'react';
import {
  Switcher16,
  Logout16,
  BrightnessContrast16,
} from '@carbon/icons-react';
// import { toggleTheme } from '../../utils';

const Navbar = ({ toggleTheme, theme }) => {
  const { user, profile, signOut, userProfile } = useUser();
  const [menu, setMenu] = useState(false);
  // const [theme, setTheme] = useState('light');

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

  useEffect(() => {
    // console.log(toggleTheme(theme));
    // let localTheme = window.localStorage.getItem('theme');
    // if (localTheme) setTheme(localTheme);

    if (user) userProfile(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className={s.header}>
        <ButtonIcon onClick={() => setMenu(!menu)}>
          Menu
          <Switcher16 />
        </ButtonIcon>
      </div>

      <section
        className={`${s.container} menu-container`}
        onClick={handleClickOutside}
        style={{ display: `${menu ? 'flex' : 'none'}` }}
      >
        <ul className={s.ul} onClick={handleClick}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/courses">Cursos</Link>
          </li>
          <div className="separator"></div>
          {user && (
            <li>
              <Link href="/profile">{user.email}</Link>
            </li>
          )}
          {profile && profile.is_admin && (
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          )}
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
          <li style={{ margin: '0 -0.5rem' }}>
            <ButtonIcon full secondary onClick={() => toggleTheme(theme)}>
              Theme <BrightnessContrast16 />
            </ButtonIcon>
          </li>
          {user && (
            <li style={{ margin: '0 -0.5rem' }}>
              <ButtonIcon full secondary onClick={() => signOut()}>
                Logout <Logout16 />
              </ButtonIcon>
            </li>
          )}
        </ul>
      </section>
    </>
  );
};
export default Navbar;
