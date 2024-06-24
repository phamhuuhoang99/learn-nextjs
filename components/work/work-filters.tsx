import { WorkFiltersPayload } from '@/models';
import { Box, Button, InputAdornment, debounce } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AutocompleteField, InputField } from '../form';
import { Search } from '@mui/icons-material';
import { useTagList } from '@/hooks';
import { ChangeEvent } from 'react';

export interface WorkFiltersProps {
  initialValue?: WorkFiltersPayload;
  onSubmit?: (payload: WorkFiltersPayload) => void;
}

const WorksFilters = ({ initialValue, onSubmit }: WorkFiltersProps) => {
  const { control, handleSubmit } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
      selectedTagList: [],
      ...initialValue,
    },
  });

  const { data } = useTagList({});
  const tagList = data.data || [];

  const handleLoginSubmit = async (payload: WorkFiltersPayload) => {
    if (!payload) return;
    payload.tagList_like = payload.selectedTagList?.join('|') || '';
    delete payload.selectedTagList;
    await onSubmit?.(payload);
  };

  const debounceSearchChange = debounce(handleSubmit(handleLoginSubmit), 500);

  return (
    <Box onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField
        name="search"
        placeholder="Search work by title "
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          debounceSearchChange();
        }}
      />
      <AutocompleteField
        isOptionEqualToValue={(option, value) => option === value}
        name="selectedTagList"
        label="Filter by category"
        placeholder="Categories"
        options={tagList}
        getOptionLabel={(option) => option}
        control={control}
        onChange={() => debounceSearchChange()}
      />
    </Box>
  );
};

export default WorksFilters;
