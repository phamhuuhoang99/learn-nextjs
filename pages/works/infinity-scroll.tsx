import { MainLayout } from '@/components/layout';
import { WorkList } from '@/components/work';
import WorksFilters from '@/components/work/work-filters';
import { useWorkListInfinity } from '@/hooks';
import { useWorkList } from '@/hooks/use-worklist';
import { ListParams, WorkFiltersPayload } from '@/models';
import { Box, Container, Pagination, Skeleton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export interface WorksPageProps {}

export default function WorksPage() {
  const router = useRouter();
  const filters: Partial<ListParams> = {
    ...router.query,
  };

  const initFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || '',
    selectedTagList: filters.tagList_like?.split('|') || [],
  };

  const { data, isLoading, isValidating, size, setSize } = useWorkListInfinity({
    params: filters,
    enabled: router.isReady,
  });

  // const { _limit, _totalRows, _page } = data.pagination || {};

  // const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0;

  console.log('data::', data);

  const handleFiltersChange = ({ search, tagList_like }: WorkFiltersPayload) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: 1,
          title_like: search,
          tagList_like,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>

        {router.isReady ? (
          <WorksFilters initialValue={initFiltersPayload} onSubmit={handleFiltersChange} />
        ) : (
          <Skeleton
            variant="rectangular"
            height={40}
            sx={{ display: 'inline-block', width: '100%', mt: 2, mb: 1 }}
          />
        )}
        <WorkList workList={[]} loading={!router.isReady || isLoading} />
      </Container>
    </Box>
  );
}

WorksPage.Layout = MainLayout;
