import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AuthProps {
  children: any;
}

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!firstLoading && !profile?.username) router.push('/login');
  }, [router, firstLoading, profile]);

  if (!profile?.username) return <p>Loading...</p>;

  return <div>{children}</div>;
}
