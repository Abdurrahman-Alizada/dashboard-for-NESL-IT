import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { registration } from '../../../services/api';

// ----------------------------------------------------------------------

export default function RegisterForm({ setDisabled, disabled }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  // const [disabled, setDisabled] = useState(false);
  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (data) => {
      setMessage('Sorry, new admin registration is disable');

      // setDisabled(true);
      // toast.warn('Sorry, New admin registration is disable', {
      //   position: 'top-right',
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   progress: 0
      // });
      // setTimeout(() => {
      //   setDisabled(false);
      // }, 5000);

      // show toast message to the user
      // const res = await registration(data);
      // code for 403 status code forbiden request
      // if (res.response.status === 403) {
      // setData(res.response.data.message);
      // console.log(res.response.data.message);
      // notify();
      // if (res.response.status === 200)
      // }
      // console.log(res.status);
      // if (res.status === 200) {
      //   console.log(res.data.message);
      //   toast.success(res.data.message, {
      //     position: 'top-right',
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     progress: 0
      //   });
      //   setTimeout(() => {
      //     navigate('/login', { replace: true });
      //   }, 5000);
      // } else if (res.status === 203) {
      //   console.log(res.data.message);
      //   toast.warn(res.data.message, {
      //     position: 'top-right',
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     progress: 0
      //   });
      // }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="User name"
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              onFocus={() => setMessage('')}
            />

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              onFocus={() => setMessage('')}
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              onFocus={() => setMessage('')}
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <p
              style={{
                color: 'red',
                marginLeft: '5px',
                marginTop: '8px'
              }}
            >
              {message}
            </p>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={disabled}
            >
              Register
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
      <ToastContainer />
    </>
  );
}
