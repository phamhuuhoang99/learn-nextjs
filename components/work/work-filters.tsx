import { WorkFiltersPayload } from '@/models';
import { Box, Button, InputAdornment, debounce } from '@mui/material';
import { useForm } from 'react-hook-form';
import { InputField } from '../form';
import { Search } from '@mui/icons-material';

export interface WorkFiltersProps {
  initialValue?: WorkFiltersPayload;
  onSubmit?: (payload: WorkFiltersPayload) => void;
}

const WorksFilters = ({ initialValue, onSubmit }: WorkFiltersProps) => {
  const { control, handleSubmit } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
      ...initialValue,
    },
  });

  const handleLoginSubmit = async (payload: WorkFiltersPayload) => {
    await onSubmit?.(payload);
  };

  const debounceSearchChange = debounce(handleSubmit(handleLoginSubmit), 500);

  return (
    <Box onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField
        name="search"
        placeholder="Search work by title "
        control={control}
        onChange={(event) => {
          debounceSearchChange();
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default WorksFilters;