import { Box, Container, Stack, Typography, Link as MuiLink, Card } from '@mui/material';
import Link from 'next/link';
import { PostCard } from './post-card';
import { Post } from '@/models';

export const RecentPosts = () => {
  //call api to get recent post
  const postList: Post[] = [
    {
      id: '1',
      slug: '',
      title: 'Making a design system from scratch',
      publishedDate: '2020-05-11',
      tagList: ['Design', 'Pattern'],
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
    {
      id: '2',
      slug: '',
      title: 'Creating pixel perfect icons in Figma',
      publishedDate: '2020-05-11',
      tagList: ['Figma', 'Icon Design'],
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
  ];
  return (
    <Box component={'section'} bgcolor="secondary.light" pt={2} py={4}>
      <Container>
        <Stack
          direction={'row'}
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems={'center'}
          mb={2}
        >
          <Typography variant="h5">React Posts</Typography>
          <Link href={'/blog'} passHref legacyBehavior>
            <MuiLink sx={{ display: { xs: 'none', md: 'inline' } }}>View all</MuiLink>
          </Link>
        </Stack>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{
            '& > div': {
              width: {
                xs: '100%',
                md: '50%',
              },
            },
          }}
        >
          {postList.map((post) => (
            <Box key={post.id}>
              <PostCard post={post} />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};
