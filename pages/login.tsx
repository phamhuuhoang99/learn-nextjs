import { authApi } from '@/api-client';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { login, logout, profile } = useAuth({ revalidateOnMount: false });
  const router = useRouter();
  async function handleLogin() {
    try {
      await login();
      router.push('/about');
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
    <div>
      <h1>Login Page</h1>

      <p> {JSON.stringify(profile ?? {})}</p>
      <button onClick={handleLogin}>Login</button>
      {/* <button onClick={handleGetProfile}>Get profile</button> */}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => router.push('/about')}>Go to About</button>
    </div>
  );
};

export default LoginPage;
