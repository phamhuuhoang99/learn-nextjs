import { useTagList } from '@/hooks';
import { WorkPayload } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AutocompleteField, InputField, PhotoField } from '../form';

export interface WorkFormProps {
  initialValue?: Partial<WorkPayload>;
  onSubmit?: (payload: FormData) => void;
}

const WorkForm = ({ initialValue, onSubmit }: WorkFormProps) => {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter work title'),
    shortDescription: yup.string().required('Please enter work description'),
    tagList: yup.array().of(yup.string()).min(1, 'Please select at least one category'),
    thumbnail: yup
      .object()
      .nullable()
      .test('test-required', 'Please select an image.', (value, context) => {
        //required when add
        // optional when edit
        if (Boolean(initialValue?.id) || Boolean(value?.file)) return true;

        return false;
      })
      .test('test-size', 'Maximum size exceeded', (value) => {
        // limit size to 3MB
        const fileSize = value?.file?.['size'] || 0;
        const MB_TO_BYTES = 1024 * 1024;
        const MAX_SIZE = 3 * MB_TO_BYTES; // 3MB
        return fileSize <= MAX_SIZE;
      }),
  });

  const { data } = useTagList({});
  const tagList = data.data || [];

  console.log('initialValue', initialValue);

  const { control, handleSubmit } = useForm<Partial<WorkPayload>>({
    defaultValues: {
      title: '',
      shortDescription: '',
      tagList: [],
      thumbnail: initialValue?.id
        ? {
            file: null,
            previewUrl: initialValue.thumbnailUrl,
          }
        : null,
      ...initialValue,
    },
    resolver: yupResolver(schema),
  });

  const handleLoginSubmit = async (payload: Partial<WorkPayload>) => {
    if (!payload) return;
    console.log('form submit', payload);
    // await onSubmit?.(payload);
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField name="title" placeholder="Your Work Title" control={control} />
      <InputField
        name="shortDescription"
        label="Short description"
        placeholder="Your work description"
        control={control}
        InputProps={{
          multiline: true,
          rows: 3,
        }}
      />

      <AutocompleteField
        isOptionEqualToValue={(option, value) => option === value}
        name="tagList"
        label="Categories"
        placeholder="Categories"
        options={tagList}
        getOptionLabel={(option) => option}
        control={control}
      />

      <PhotoField name="thumbnail" control={control} label="Thumbnail" />
      <Button variant="contained" type="submit">
        {initialValue?.id ? 'Save' : 'Submit'}
      </Button>
    </Box>
  );
};

export default WorkForm;
