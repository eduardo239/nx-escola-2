import Image from 'next/image';
import { default_logo } from '../utils/constants';

const Logo = () => {
  return (
    <Image
      src={default_logo}
      alt="Logo da App escola"
      width={106}
      height={39}
    ></Image>
  );
};

export default Logo;
