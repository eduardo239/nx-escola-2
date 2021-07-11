// import s from '../styles/Layout.module.css';
// import Footer from './section/Footer';
// import Navbar from './section/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <div>Nav 2</div>
      <main>{children}</main>
      <div>Foo</div>
    </div>
  );
};

export default Layout;
