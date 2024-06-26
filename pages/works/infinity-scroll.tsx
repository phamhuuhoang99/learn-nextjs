import { MainLayout } from '@/components/layout';
import { WorkList } from '@/components/work';
import WorksFilters from '@/components/work/work-filters';
import { useWorkListInfinity } from '@/hooks';
import { ListParams, ListResponse, Work, WorkFiltersPayload } from '@/models';
import { Box, Button, CircularProgress, Container, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';

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

  const workList: Array<Work> =
    data?.reduce((result: Array<Work>, currentPage: ListResponse<Work>) => {
      result.push(...currentPage.data);
      return result;
    }, []) || [];

  const { ref } = useInView({
    onChange(inView, entry) {
      if (inView) {
        setSize((x) => x + 1);
      }
    },
  });

  const totalRows = data?.[0].pagination?._totalRows || 0;
  const showLoadMore = totalRows > workList.length;
  const loadingMore = isValidating && workList.length > 0;

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
        <WorkList workList={workList} loading={!router.isReady || isLoading} />
        {showLoadMore && (
          <Button
            ref={ref}
            variant="contained"
            onClick={() => setSize((x) => x + 1)}
            disabled={loadingMore}
          >
            Load more {loadingMore && <CircularProgress size={24} />}
          </Button>
        )}
      </Container>
    </Box>
  );
}

WorksPage.Layout = MainLayout;
