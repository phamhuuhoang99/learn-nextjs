import { Work } from '@/models';
import { Box, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { WorkCard } from './work-card';
import Image from 'next/image';
import noData from '@/images/no-data.jpg';
import { WorkSkeleton } from './work-skeleton';

export interface WorkListProps {
  workList: Work[];
  loading?: boolean;
}

export const WorkList = ({ workList, loading }: WorkListProps) => {
  if (loading) {
    return (
      <Box>
        {Array.from({ length: 3 }).map((_, index) => (
          <Fragment key={index}>
            <WorkSkeleton />
            <Divider sx={{ my: 3 }} />
          </Fragment>
        ))}
      </Box>
    );
  }
  if (workList.length === 0)
    return (
      <Box textAlign={'center'}>
        <Image src={noData} width={150} height={150} alt="no data" />
        <Typography>No data</Typography>
      </Box>
    );

  return (
    <Box>
      {workList.map((work) => (
        <Fragment key={work.id}>
          <WorkCard work={work} />
          <Divider sx={{ my: 3 }} />
        </Fragment>
      ))}
    </Box>
  );
};
