import HeaderDesktop from './header-desktop';
import HeaderMobile from './header-mobile';

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <HeaderMobile />
      <HeaderDesktop />
    </>
  );
};

export default Header;
