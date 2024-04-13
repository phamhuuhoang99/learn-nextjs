import { Post } from '@/models';
import { getPostList } from '@/utils';
import { Box, Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { unified } from 'unified';
import remarkPrism from 'remark-prism';
import Script from 'next/script';
import { Seo } from '@/components/common';

export interface BlogPageProps {
  post: Post;
}

export default function PostDetailPage({ post }: BlogPageProps) {
  if (!post) return null;

  return (
    <Box>
      <Seo
        data={{
          title: post.title,
          description: post.description,
          url: `${process.env.HOST_URL}/blog/${post.slug}`,
          thumbnailUrl: post.thumbnailUrl || '',
        }}
      />
      <Container>
        <h1>Post Detail </h1>
        <div dangerouslySetInnerHTML={{ __html: post.htmlContent }}></div>
      </Container>
      <Script src="/prism.js" strategy="afterInteractive"></Script>
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await getPostList();

  return {
    paths: postList.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async (
  context: GetStaticPropsContext,
) => {
  const postList = await getPostList();
  const slug = context.params?.slug;
  if (!slug) return { notFound: true };

  const post = postList.find((x) => x.slug === slug);
  if (!post) return { notFound: true };

  //convert md to html
  const file = await unified()
    .use(remarkParse)
    .use(remarkToc, { heading: 'agenda.*' })
    .use(remarkPrism)
    .use(remarkRehype)
    .use(rehypeDocument, { title: 'Blog detail page' })
    .use(rehypeFormat)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify)
    .process(post.mdContent || '');

  post.htmlContent = file.toString();
  return {
    props: {
      post,
    },
  };
};
