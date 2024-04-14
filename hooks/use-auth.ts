import { authApi } from '@/api-client';
import { StorageKeys } from '@/constants';
import { LoginPayload } from '@/models';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

function getUserInfo() {
  try {
    return JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '');
  } catch (error) {
    console.log('fail to parse user info', error);
  }
  return null;
}

export function useAuth(options?: Partial<PublicConfiguration>) {
  // profile

  const {
    data: profile,
    error,
    mutate,
  } = useSWR('/profile', {
    dedupingInterval: 60 * 60 * 1000, // 1hr
    revalidateOnFocus: false,
    fallbackData: getUserInfo(),
    ...options,
    onSuccess(data) {
      // save user info to local storage
      localStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(data));
    },
    onError(err) {
      console.log(err);
      logout();
    },
  });

  const firstLoading = profile === undefined && error === undefined;

  async function login(payload: LoginPayload) {
    await authApi.login(payload);
    await mutate();
  }

  async function logout() {
    await authApi.logout();
    mutate(null, false);
    localStorage.removeItem(StorageKeys.USER_INFO);
  }

  return {
    profile,
    error,
    mutate,
    login,
    logout,
    firstLoading,
  };
}
