import { PostItem } from '@/components/blog';
import { MainLayout } from '@/components/layout';
import { Post } from '@/models';
import { getPostList } from '@/utils';
import { Box, Container, Divider } from '@mui/material';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';

export interface BlogListPageProps {
  posts: Post[];
}

export default function BlogListPage({ posts }: BlogListPageProps) {
  return (
    <Box>
      <Container>
        <h1>Blog</h1>
        <Box component={'ul'} sx={{ listStyleType: 'none' }}>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`} legacyBehavior>
                <div>
                  <PostItem post={post} />
                </div>
              </Link>
              <Divider sx={{ my: 3 }} />
            </li>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

BlogListPage.Layout = MainLayout;

export const getStaticProps: GetStaticProps<BlogListPageProps> = async (
  context: GetStaticPropsContext,
) => {
  //convert markdown file into list of js object
  const postList = await getPostList();
  return {
    props: {
      posts: postList,
    },
  };
};
