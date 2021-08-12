import {
  LogoFacebook24,
  LogoGithub24,
  LogoTwitter24,
} from '@carbon/icons-react';
import s from '../../styles/Footer.module.scss';

export default function Footer() {
  return (
    <section className={`${s.container} footer-container`}>
      <div className={s.grid} style={{ flex: '1', padding: '1rem' }}>
        <div>
          <h3>App Escola</h3>
        </div>
        <ul className="flex-center-center gap-5">
          <li>
            <LogoGithub24 />
          </li>
          <li>
            <LogoFacebook24 />
          </li>
          <li>
            <LogoTwitter24 />
          </li>
        </ul>
      </div>
      <div className={s.grid} style={{ margin: '1rem', padding: '1rem' }}>
        <small>
          © Todos os direitos reservados - {new Date().getFullYear()}
        </small>
      </div>
    </section>
  );
}
