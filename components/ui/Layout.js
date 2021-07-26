import s from '../../styles/Layout.module.css';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children, toggleTheme, theme }) => {
  return (
    <div className={s.container}>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <main className={s.main}>{children}</main>
      <div className={s.footer}>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Layout;
