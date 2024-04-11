import { Post } from '@/models';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import { PostItem } from '../blog';

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardContent>
        <PostItem post={post} />
      </CardContent>
    </Card>
  );
}
