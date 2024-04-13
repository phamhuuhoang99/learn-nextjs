import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { InputField } from '../form';
import { Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { LoginPayload } from '@/models';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface LoginFormProps {
  onSubmit: (payload: LoginPayload) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter user name')
      .min(4, 'Username is required to have at least 4 chars'),
    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'Password is required to have at least 6 chars'),
  });

  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleLoginSubmit = async (payload: LoginPayload) => {
    await onSubmit?.(payload);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField label="Username" name="username" control={control} />
      <InputField
        type={showPassword ? 'text' : 'password'}
        label="Password"
        name="password"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((showPassword) => !showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress color="inherit" size={'1rem'} /> : null}
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};
