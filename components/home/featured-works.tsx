import { Box, Container, Stack, Typography, Link as MuiLink, Card } from '@mui/material';
import Link from 'next/link';
import { PostCard } from './post-card';
import { Post, Work } from '@/models';
import { WorkList } from '../work';

export const FeaturedWorks = () => {
  //call api to get recent post
  const workList: Work[] = [
    {
      id: '1',
      title: 'Designing Dashboards',
      createdAt: '1648363391671',
      updatedAt: '1648363391671',
      tagList: ['Dashboard'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/easy-frontend/image/upload/v1648712410/learn-nextjs/item1_cbidwn.jpg',
    },
    {
      id: '2',
      title: 'Vibrant Portraits of 2020',
      createdAt: '1648363391671',
      updatedAt: '1648363391671',
      tagList: ['Illustration'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/easy-frontend/image/upload/v1648712410/learn-nextjs/item2_usidpx.jpg',
    },
    {
      id: '3',
      title: '36 Days of Malayalam type',
      createdAt: '1648363391671',
      updatedAt: '1648363391671',
      tagList: ['Typography'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/easy-frontend/image/upload/v1648712410/learn-nextjs/item3_jlfuun.jpg',
    },
  ];
  return (
    <Box component={'section'} pt={2} py={4}>
      <Container>
        <Typography variant="h5" mb={4}>
          Featured Works
        </Typography>

        <WorkList workList={workList} />
      </Container>
    </Box>
  );
};
