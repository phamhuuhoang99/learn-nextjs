import { MainLayout } from '@/components/layout';
import { WorkList } from '@/components/work';
import WorksFilters from '@/components/work/work-filters';
import { useAuth } from '@/hooks';
import { useWorkList } from '@/hooks/use-worklist';
import { ListParams, WorkFiltersPayload } from '@/models';
import { Box, Button, Container, Pagination, Skeleton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export interface WorksPageProps {}

export default function WorksPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const filters: Partial<ListParams> = {
    _page: 1,
    _limit: 3,
    ...router.query,
  };

  const initFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || '',
    selectedTagList: filters.tagList_like?.split('|') || [],
  };

  const { data, isLoading } = useWorkList({ params: filters, enabled: router.isReady });

  const { _limit, _totalRows, _page } = data.pagination || {};

  const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: value,
        },
      },
      undefined,
      { shallow: true },
    );
  };

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
        <Stack
          mb={4}
          mt={8}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
          {isLoggedIn && (
            <Button variant="contained" onClick={() => router.push('/works/add')}>
              Add new Work
            </Button>
          )}
        </Stack>

        {router.isReady ? (
          <WorksFilters initialValue={initFiltersPayload} onSubmit={handleFiltersChange} />
        ) : (
          <Skeleton
            variant="rectangular"
            height={40}
            sx={{ display: 'inline-block', width: '100%', mt: 2, mb: 1 }}
          />
        )}
        <WorkList workList={data?.data || []} loading={!router.isReady || isLoading} />
        {totalPages > 0 && (
          <Stack alignItems={'center'}>
            <Pagination count={totalPages} page={_page} onChange={handlePageChange}></Pagination>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

WorksPage.Layout = MainLayout;
