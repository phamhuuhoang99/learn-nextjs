import axiosClient from '@/api-client/axios-client';
import { EmptyLayout } from '@/components/layout';
import { AppPropsWithLayout } from '@/models';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache, theme } from '@/utils';
import '../styles/globals.css';
import '../styles/prism.css';

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
        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
