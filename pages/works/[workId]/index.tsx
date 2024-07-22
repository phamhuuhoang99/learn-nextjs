import { MainLayout } from '@/components/layout';
import WorkForm from '@/components/work/work-form';
import { useAddWork, useWorkDetails } from '@/hooks';
import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { toast } from 'react-toastify';

export interface AddEditPageProps {}

export default function AddEditPageProps(props: AddEditPageProps) {
  const router = useRouter();
  const { workId } = router.query;
  const isAddMode = workId === 'add';

  const {
    data: workDetails,
    isLoading,
    updateWork,
  } = useWorkDetails({
    workId: (workId as string) || '',
    enabled: router.isReady && !isAddMode,
  });

  const { addNewWork } = useAddWork();

  const handleSubmit = async (payload: FormData) => {
    try {
      let newWork = null;
      if (isAddMode) {
        newWork = await addNewWork(payload);
        toast.success(`add work successfully!',${newWork?.id}`);
      } else {
        newWork = await updateWork(payload);
        toast.success('update work successfully!');
      }

      router.push(`/works/${newWork?.id}/details`);

      //navigate to details
    } catch (error) {
      console.log(error);
    }
  };

  if (!router.isReady) return false;

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
        <Box>
          {(isAddMode || Boolean(workDetails)) && (
            <WorkForm onSubmit={handleSubmit} initialValues={workDetails} />
          )}
        </Box>
      </Container>
      <Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="afterInteractive" />
    </Box>
  );
}

AddEditPageProps.Layout = MainLayout;
AddEditPageProps.requireLogin = true;
