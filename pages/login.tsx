import { LoginForm } from '@/components/auth';
import { useAuth } from '@/hooks';
import { LoginPayload } from '@/models';
import { getErrorMessage } from '@/utils';
import { Box, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { login, logout } = useAuth({ revalidateOnMount: false });
  const router = useRouter();
  async function handleLogin(payload: LoginPayload) {
    try {
      await login(payload);
      router.push('/');
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
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
