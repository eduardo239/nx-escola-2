import s from '../../styles/Layout.module.css';
import Navbar from './Navbar';
// import Footer from './section/Footer';
// import Navbar from './section/Navbar';

const Layout = ({ children }) => {
  return (
    <div className={s.container}>
      <Navbar />
      <main className={s.main}>{children}</main>
      <div className={s.footer}>
        <footer>footer</footer>
      </div>
    </div>
  );
};

export default Layout;
