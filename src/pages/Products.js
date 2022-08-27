import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import DhobiUser from './DhobiUser';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [isOrder, setIsOrder] = useState(false);
  return (
    <Page title="Dashboard: Dhobies | Admin-panel">
      <DhobiUser isOrder={isOrder} setIsOrder={setIsOrder} title="Register Dhobie list" />
    </Page>
  );
}
