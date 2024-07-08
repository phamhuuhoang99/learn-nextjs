import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AuthProps {
  children: any;
  requireLogin?: boolean;
}

export function Auth({ children, requireLogin = false }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!requireLogin) return;

    if (!firstLoading && !profile?.username) router.replace('/login');
  }, [router, firstLoading, profile, requireLogin]);

  if (requireLogin && !profile?.username) return <p>Loading...</p>;

  return <div>{children}</div>;
}
