import { useAuth } from '@/hooks';
import { Box, Container, Link as MuiLink, Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTE_LIST } from './routes';

const HeaderDesktop = () => {
  const router = useRouter();
  const { profile, logout } = useAuth();

  const isLoggedIn = Boolean(profile?.username);

  const routeList = ROUTE_LIST.filter((route) => !route?.requireLogin || isLoggedIn);

  return (
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container>
        <Stack direction={'row'} justifyContent={'flex-end'}>
          {routeList.map((route) => (
            <Link className="ml-2" key={route.path} href={route.path} passHref legacyBehavior>
              <MuiLink
                className={`${router.pathname === route.path ? 'active' : ''}`}
                sx={{ ml: 2, fontWeight: 'medium' }}
              >
                {route.label}
              </MuiLink>
            </Link>
          ))}
          {!isLoggedIn ? (
            <Link href="/login" passHref legacyBehavior>
              <MuiLink sx={{ ml: 2, fontWeight: 'medium' }}>Login</MuiLink>
            </Link>
          ) : (
            <MuiLink sx={{ ml: 2, fontWeight: 'medium', cursor: 'pointer' }} onClick={logout}>
              Logout
            </MuiLink>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default HeaderDesktop;
