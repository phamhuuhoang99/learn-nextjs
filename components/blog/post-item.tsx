import { Post } from '@/models';
import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';

export interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={'bold'}>
        {post.title}
      </Typography>
      <Stack direction={'row'}>
        <Typography variant="body1" my={2}>
          {format(new Date(post.publishedDate), 'dd MMM yyyy')}
        </Typography>
        <Divider orientation="vertical" sx={{ m: 2 }} flexItem />
        <Typography variant="body1" my={2}>
          {post.tagList.join(', ')}
        </Typography>
      </Stack>
      <Typography variant="body2">{post.description}</Typography>
    </Box>
  );
}
