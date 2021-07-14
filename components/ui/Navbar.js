import s from '../../styles/Navbar.module.scss';
import Link from 'next/link';
import { ButtonIcon, IconOnly } from './Form';
import { useUser } from '../../utils/useUser';
import { useEffect, useState } from 'react';
import {
  Switcher16,
  Logout16,
  Awake16,
  Asleep16,
  Home16,
} from '@carbon/icons-react';
import { useRouter } from 'next/dist/client/router';

const Navbar = ({ toggleTheme, theme }) => {
  const { user, profile, signOut, userProfile } = useUser();
  const [menu, setMenu] = useState(false);
  const router = useRouter();

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
    if (user) userProfile(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className={`${s.header} menu-header`}>
        <ButtonIcon primary onClick={() => setMenu(!menu)}>
          Menu
          <Switcher16 />
        </ButtonIcon>
        <IconOnly primary onClick={() => router.push('/')}>
          <Home16 />
        </IconOnly>
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
          {profile && (
            <li>
              <Link href={`/user/${profile.id}`}>{profile.username}</Link>
            </li>
          )}
          {profile?.is_admin && (
            <li className={s.dropdown}>
              <Link href="/admin">
                <a>Admin</a>
              </Link>
              <ul className={s.content}>
                <li className={s.dropdown2}>
                  <Link href="/admin/add">Adicionar</Link>
                  <ul className={s.content2}>
                    <li>
                      <Link href="/admin/add/courses">Cursos</Link>
                    </li>
                    <li>
                      <Link href="/admin/add/subjects">Matérias</Link>
                    </li>
                    <li>
                      <Link href="/admin/add/questions">Questões</Link>
                    </li>
                    <li>
                      <Link href="/admin/add/balance">Saldo</Link>
                    </li>
                  </ul>
                </li>
                <li className={s.dropdown2}>
                  <Link href="/admin/all">Lista</Link>
                  <ul className={s.content2}>
                    <li>
                      <Link href="/admin/all/courses">Cursos</Link>
                    </li>
                    <li>
                      <Link href="/admin/all/subjects">Matérias</Link>
                    </li>
                    <li>
                      <Link href="/admin/all/questions">Questões</Link>
                    </li>
                  </ul>
                </li>
              </ul>
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
          <li>
            <ButtonIcon full secondary onClick={() => toggleTheme(theme)}>
              {theme !== 'light' ? 'Light' : 'Dark'}
              {theme !== 'light' ? <Awake16 /> : <Asleep16 />}
            </ButtonIcon>
          </li>
          {user && (
            <li>
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
