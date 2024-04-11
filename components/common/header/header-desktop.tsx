import { Box, Container, Stack, Link as MuiLink } from '@mui/material';
import { ROUTE_LIST } from './routes';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderDesktop = () => {
  const router = useRouter();

  return (
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container>
        <Stack direction={'row'} justifyContent={'flex-end'}>
          {ROUTE_LIST.map((route) => (
            <Link className="ml-2" key={route.path} href={route.path} passHref legacyBehavior>
              <MuiLink
                className={`${router.pathname === route.path ? 'active' : ''}`}
                sx={{ ml: 2, fontWeight: 'medium' }}
              >
                {route.label}
              </MuiLink>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default HeaderDesktop;
