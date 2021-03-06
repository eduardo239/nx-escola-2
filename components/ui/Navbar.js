import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { useUser } from '../../utils/useUser';
import Link from 'next/link';
import { ButtonIcon, IconOnly } from './Form';
import {
  Switcher16,
  Logout16,
  Awake16,
  Asleep16,
  Home16,
  CaretDown16,
  User16,
  Money16,
  Email16,
} from '@carbon/icons-react';
import s from '../../styles/Navbar.module.scss';
// import Logo from '../Logo';

const Navbar = ({ toggleTheme, theme }) => {
  const { user, profile, signOut, userProfile, logout } = useUser();
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  const handleClickOutside = (e) => {
    const tar = e.target;
    const cur = e.currentTarget;
    if (tar === cur) setMenu(!menu);
  };

  const click = (e) => {
    let next = e.target.nextSibling;
    if (next.style.display === 'none' || next.style.display === '') {
      next.style.display = 'block';
      next.classList.add('dash');
    } else {
      next.style.display = 'none';
      next.classList.remove('dash');
    }
  };
  useEffect(() => {
    if (user) userProfile(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className={`${s.header} menu-header`}>
      <IconOnly primary onClick={() => setMenu(!menu)}>
        <Switcher16 />
      </IconOnly>
      <IconOnly primary onClick={() => router.push('/')}>
        <Home16 />
      </IconOnly>

      {profile && (
        <IconOnly primary onClick={() => router.push(`/user/${profile.id}`)}>
          <User16 />
        </IconOnly>
      )}
      {profile && (
        <IconOnly primary onClick={() => router.push(`/user/balance`)}>
          <Money16 />
        </IconOnly>
      )}

      <nav
        className={`${s.container} navbar-nav`}
        onClick={handleClickOutside}
        style={{ display: `${menu ? 'flex' : 'none'}` }}
      >
        <ul>
          <li className="p-3">
            <h3>App Escola</h3>
          </li>
          <li onClick={() => setMenu(false)}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li onClick={() => setMenu(false)}>
            <Link href="/courses">
              <a>Cursos</a>
            </Link>
          </li>
          <li onClick={() => setMenu(false)}>
            <Link href="/forum">
              <a>Forum</a>
            </Link>
          </li>

          {user && profile?.is_admin && (
            <li>
              <ButtonIcon className={s.button} onClick={click}>
                Admin <CaretDown16 />
              </ButtonIcon>
              <ul className="none">
                <li>
                  <ButtonIcon className={s.button} onClick={click}>
                    Adicionar <CaretDown16 />
                  </ButtonIcon>
                  <ul className="none">
                    <li onClick={() => setMenu(false)}>
                      <Link href="/admin/add/courses">
                        <a>Cursos</a>
                      </Link>
                    </li>
                    <li onClick={() => setMenu(false)}>
                      <Link href="/admin/add/subjects">
                        <a>Mat??rias</a>
                      </Link>
                    </li>
                    <li onClick={() => setMenu(false)}>
                      <Link href="/admin/add/questions">
                        <a>Quest??es</a>
                      </Link>
                    </li>
                    <li onClick={() => setMenu(false)}>
                      <Link href="/admin/add/balance">
                        <a>Saldo</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <ButtonIcon className={s.button} onClick={click}>
                    Listas <CaretDown16 />
                  </ButtonIcon>
                  <ul className="none">
                    <li onClick={() => setMenu(false)}>
                      <Link href="/admin/all/courses">
                        <a>Cursos</a>
                      </Link>
                    </li>
                    <li onClick={() => setMenu(false)}>
                      <Link href="/admin/all/subjects">
                        <a>Mat??rias</a>
                      </Link>
                    </li>
                    <li onClick={() => setMenu(false)}>
                      <Link href="/admin/all/questions">
                        <a>Quest??es</a>
                      </Link>
                    </li>
                    <li onClick={() => setMenu(false)}>
                      <Link href="/admin/all/users">
                        <a>Usu??rios</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <ButtonIcon className={s.button} onClick={click}>
                    Mensagens <CaretDown16 />
                  </ButtonIcon>
                  <ul className="none">
                    <li onClick={() => setMenu(false)}>
                      <Link href="/admin/messages/send">
                        <a>Enviar</a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          )}

          <li>
            <ButtonIcon className={s.button} onClick={click}>
              Conta <CaretDown16 />
            </ButtonIcon>
            <ul className="none">
              {!user && (
                <li onClick={() => setMenu(false)}>
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </li>
              )}
              {!user && (
                <li onClick={() => setMenu(false)}>
                  <Link href="/register">
                    <a>Registro</a>
                  </Link>
                </li>
              )}
              {profile && (
                <li onClick={() => setMenu(false)}>
                  <Link href={`/user/${profile.id}`}>
                    <a>{profile.username}</a>
                  </Link>
                </li>
              )}
            </ul>
          </li>
          <li>
            <ButtonIcon className={s.button} onClick={() => toggleTheme(theme)}>
              Tema {theme === 'light' ? <Awake16 /> : <Asleep16 />}
            </ButtonIcon>
          </li>

          {user && (
            <li onClick={() => setMenu(false)}>
              <ButtonIcon className={s.button} onClick={() => logout()}>
                Sair <Logout16 />
              </ButtonIcon>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
