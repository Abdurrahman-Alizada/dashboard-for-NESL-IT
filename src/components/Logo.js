import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
   
    <Box
      // component="img"
      // src="/static/logo1.jpg"
      // sx={{ borderRadius: 50, width: 70, height: 70, ...sx }}
    />
  );
}
