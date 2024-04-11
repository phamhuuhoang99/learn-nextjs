// import Header from '@/components/common/header';
import { AdminLayout, MainLayout } from '@/components/layout';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// export async function getServerSideProps() {
//   return {
//     props: {},
//   };
// }

// const Header = dynamic(() => import('@/components/common/header'), { ssr: false });

const AboutPage = () => {
  const router = useRouter();

  return (
    <Box>
      <Typography component="h1" variant="h3" color="primary.main">
        About Page
      </Typography>

      {/* <Header /> */}
    </Box>
  );
};

AboutPage.Layout = AdminLayout;

export default AboutPage;
