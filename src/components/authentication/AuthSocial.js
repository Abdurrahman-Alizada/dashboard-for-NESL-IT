import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

const responseFacebook = (response) => {
  console.log('login result', response);
};
const componentClicked = (data) => {
  console.warn(data);
};

export default function AuthSocial({ setDisabled, disabled }) {
  // const [disabled, setDisabled] = useState(false);
  const socialLogin = () => {
    setDisabled(true);
    toast.warn('Social-login is disable', {
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: 0
    });
    setTimeout(() => {
      setDisabled(false);
    }, 5000);
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
          onClick={socialLogin}
          size="large"
          color="inherit"
          variant="outlined"
        >
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>

        <Button
          disabled={disabled}
          onClick={socialLogin}
          size="large"
          color="inherit"
          variant="outlined"
        >
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>

        {/* <Button
          disabled={disabled}
          onClick={socialLogin}
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
