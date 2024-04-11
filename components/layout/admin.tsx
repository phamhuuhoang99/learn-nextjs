import { LayoutProps } from '@/models';
import Link from 'next/link';
import { Auth } from '../common/auth';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

export function AdminLayout({ children }: LayoutProps) {
  const { logout, profile } = useAuth({ revalidateOnMount: false });
  const router = useRouter();
  async function handleLogout() {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>Side bar</div>
      <p>Profile {JSON.stringify(profile)}</p>
      <button onClick={handleLogout}>Logout</button>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <div>{children}</div>
    </Auth>
  );
}
