import { LoginForm } from '@/components/auth';
import { useAuth } from '@/hooks';
import { LoginPayload } from '@/models';
import { Box, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { login, logout } = useAuth({ revalidateOnMount: false });
  const router = useRouter();
  async function handleLogin(payload: LoginPayload) {
    try {
      await login(payload);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Box>
      <Paper
        elevation={4}
        sx={{
          mx: 'auto',
          mt: 8,
          p: 4,
          maxWidth: '480px',
          textAlign: 'center',
        }}
      >
        <Typography component={'h1'} variant="h5">
          Login Page
        </Typography>
        <LoginForm onSubmit={handleLogin} />
      </Paper>
    </Box>
  );
};

export default LoginPage;
