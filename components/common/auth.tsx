import { useAuth } from '@/hooks';
import { encodeUrl } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AuthProps {
  children: any;
  requireLogin?: boolean;
}

export function Auth({ children, requireLogin = false }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  console.log(router);
  useEffect(() => {
    if (!requireLogin) return;

    if (!firstLoading && !profile?.username) {
      router.replace(`/login?back_to=${encodeUrl(router.asPath)}`);
    }
  }, [router, firstLoading, profile, requireLogin]);

  if (requireLogin && !profile?.username) return <p>Loading...</p>;

  return <div>{children}</div>;
}
