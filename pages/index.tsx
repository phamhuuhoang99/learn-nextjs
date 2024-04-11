import { Seo } from '@/components/common';
import { FeaturedWorks, HeroSession, RecentPosts } from '@/components/home';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models';
import { Box } from '@mui/material';

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          title: 'Nextjs Tutorials',
          description: 'Step by step tutarial to build a full CRUD',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <HeroSession />
      <RecentPosts />
      <FeaturedWorks />
    </Box>
  );
};

Home.Layout = MainLayout;

export default Home;
