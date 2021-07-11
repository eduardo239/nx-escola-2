import s from '../../styles/Navbar.module.css';

import Link from 'next/link';

const Navbar = () => {
  return (
    <ul className={s.ul}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/">Courses</Link>
      </li>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/">Home</Link>
      </li>
    </ul>
  );
};

export default Navbar;
