import axiosClient from '@/api-client/axios-client';
import { EmptyLayout } from '@/components/layout';
import { AppPropsWithLayout } from '@/models';
import { createEmotionCache, theme } from '@/utils';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import '../styles/prism.css';
import { Auth } from '@/components/common';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
          <Layout>
            <Auth requireLogin={Component.requireLogin ?? false}>
              <Component {...pageProps} />
            </Auth>
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
