import { Box } from '@mui/material';
import React from 'react';
import HeaderMobile from './header-mobile';
import HeaderDesktop from './header-desktop';

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
