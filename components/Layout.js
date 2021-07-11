// import s from '../styles/Layout.module.css';
// import Footer from './section/Footer';
// import Navbar from './section/Navbar';

const Layout = ({ children }) => {
  return (
    <div className={s.container}>
      Nav
      <main className={s.main}>{children}</main>
      <div className={s.footer}>Foo</div>
    </div>
  );
};

export default Layout;
