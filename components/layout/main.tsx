import { LayoutProps } from '@/models';
import { Box, Stack } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import { Footer } from '../common';
import Header from '../common/header';

export function MainLayout({ children }: LayoutProps) {
  useEffect(() => {
    console.log('Admin Layout mounting');
    return () => console.log('Admin unmouting');
  }, []);
  return (
    <Stack minHeight={'100vh'}>
      <Header />

      <Box component={'main'} flexGrow={1}>
        {children}
      </Box>
      <Footer />
    </Stack>
  );
}
