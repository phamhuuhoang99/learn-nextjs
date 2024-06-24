import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import { Autocomplete, AutocompleteProps, Checkbox, TextField } from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

export type AutocompleteFieldProps<T, K extends FieldValues> = Partial<
  AutocompleteProps<T, boolean, boolean, boolean>
> & {
  name: Path<K>;
  control: Control<K>;
  placeholder: string;
  label?: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  onChange: (selectedOptions: T[]) => void;
};

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export function AutocompleteField<T, K extends FieldValues>({
  name,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalRef,
  value: externalValue,
  label,
  options,
  placeholder,
  getOptionLabel,
  isOptionEqualToValue,
  ...props
}: AutocompleteFieldProps<T, K>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      fullWidth
      size="small"
      options={options}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />

          {getOptionLabel(option) || '-'}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          margin={'normal'}
          name={name}
          {...params}
          label={label}
          placeholder={placeholder || ''}
          error={!!error}
          helperText={error?.message}
        />
      )}
      onChange={(event, value) => {
        onChange(value);
        externalOnChange?.(value);
      }}
      onBlur={onBlur}
      value={value}
      ref={ref}
    />
  );
}
