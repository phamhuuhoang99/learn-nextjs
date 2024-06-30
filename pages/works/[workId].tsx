import { MainLayout } from '@/components/layout';
import WorkForm from '@/components/work/work-form';
import { useWorkDetails } from '@/hooks';
import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export interface AddEditPageProps {}

export default function AddEditPageProps(props: AddEditPageProps) {
  const router = useRouter();
  const { workId } = router.query;
  const isAddMode = workId === 'add';

  const { data: workDetails, isLoading } = useWorkDetails({
    workId: (workId as string) || '',
    enabled: router.isReady && !isAddMode,
  });

  console.log('workDetails', workDetails);

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component={'h1'} variant="h3" fontWeight={'bold'}>
            {isAddMode ? 'Add new Work' : `Edit work #${workId}`}
          </Typography>
        </Box>
        <Box>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur deserunt esse maiores,
          explicabo eius eum iste id nobis soluta praesentium hic corrupti veritatis aut amet,
          doloribus quaerat eveniet dolorem nulla?
        </Box>
        <Box>{(isAddMode || Boolean(workDetails)) && <WorkForm initialValue={workDetails} />}</Box>
      </Container>
    </Box>
  );
}

AddEditPageProps.Layout = MainLayout;
