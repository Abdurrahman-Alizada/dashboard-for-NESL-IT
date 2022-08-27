import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// ----------------------------------------------------------------------
export default function AuthSocial1({ disabled, setDisabled }) {
  const socialLogin = () => {
    setDisabled(true);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      // icon: 'error',
      icon: 'success',
      title: 'Signed in successfully'
      // title: 'Email or password is invalid'
    });
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
  };

  const socialTopLogin = () => {
    setDisabled(true);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      // icon: 'error',
      icon: 'warning',
      title: 'Social-login is disable'
      // title: 'Email or password is invalid'
    });
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
  };

  return (
    <>
      <Stack
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
        direction="row"
        spacing={2}
      >
        <Button
          disabled={disabled}
          onClick={socialTopLogin}
          size="large"
          color="inherit"
          variant="outlined"
        >
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>

        <Button
          disabled={disabled}
          onClick={socialTopLogin}
          size="large"
          color="inherit"
          variant="outlined"
        >
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>

        {/* <Button
          disabled={disabled}
          onClick={socialTopLogin}
          size="large"
          color="inherit"
          variant="outlined"
        >
          <Icon icon={twitterFill} color="#1C9CEA" height={24} />
        </Button> */}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
