import s from '../../styles/Layout.module.css';
import Navbar from './Navbar';
// import Footer from './section/Footer';
// import Navbar from './section/Navbar';

const Layout = ({ children, toggleTheme, theme }) => {
  return (
    <div className={s.container}>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <main className={s.main}>{children}</main>
      <div className={s.footer}>
        <footer>footer</footer>
      </div>
    </div>
  );
};

export default Layout;
