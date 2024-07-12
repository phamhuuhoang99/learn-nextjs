import { MainLayout } from '@/components/layout';
import { Work } from '@/models';
import { Box, Chip, Container, Stack, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import sanitize from 'sanitize-html';

export interface WorkDetailsPageProps {
  work: Work;
}

export default function WorkDetailsPage({ work }: WorkDetailsPageProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>;
  }
  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component={'h1'} variant="h3" fontWeight={'bold'}>
            {work.title}
          </Typography>
        </Box>

        <Stack direction={'row'} my={2}>
          <Chip
            color="primary"
            label={new Date(Number(work.createdAt)).getFullYear()}
            size="small"
          />
          <Typography ml={3} color="GrayText">
            {work.tagList.join(', ')}
          </Typography>
        </Stack>
        <Typography>{work.shortDescription}</Typography>

        <Box
          component={'div'}
          dangerouslySetInnerHTML={{ __html: work.fullDescription }}
          sx={{
            img: {
              maxWidth: '100%',
            },
          }}
        ></Box>
      </Container>
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.API_URL}/api/works?_page=1&_limit=5`);
  const data = await response.json();

  return {
    paths: data.data.map((work: any) => ({ params: { workId: work.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<WorkDetailsPageProps> = async (
  context: GetStaticPropsContext,
) => {
  const workId = context.params?.workId;
  if (!workId) return { notFound: true };

  const response = await fetch(`${process.env.API_URL}/api/works/${workId}`);
  const data = await response.json();
  //
  data.fullDescription = sanitize(data.fullDescription, {
    allowedTags: sanitize.defaults.allowedTags.concat(['img']),
  });

  return {
    props: {
      work: data,
    },
    revalidate: 300, //300s =5m
  };
};

WorkDetailsPage.Layout = MainLayout;
