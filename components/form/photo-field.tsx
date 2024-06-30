import { Box, FormHelperText, Typography } from '@mui/material';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import ClickToUpload from '../../images/246x180.svg';

export type PhotoFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
};
export function PhotoField<T extends FieldValues>({
  name,
  control,
  label,
  ...props
}: PhotoFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    onChange({
      file,
      previewUrl: url,
    });
  };

  //value data type
  // - null
  // - {file: File, previewUrl: string}

  const previewUrl = value?.previewUrl || ClickToUpload;
  const inputField = `photo-field-${name}`;

  return (
    <Box>
      <Typography variant="body2">{label}</Typography>
      <Box component={'label'} htmlFor={inputField} sx={{ cursor: 'pointer' }} ref={ref}>
        <Image src={previewUrl} width={246} height={180} layout="fixed" alt={'work thumbnail'} />
      </Box>
      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      <Box
        id={inputField}
        component={'input'}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      ></Box>
    </Box>
  );
}
