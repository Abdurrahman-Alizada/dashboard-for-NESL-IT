// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppWeeklySales,
  AppWebsiteVisits
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const userData = localStorage.getItem('loginInfo');
  const userUpdataData = JSON.parse(userData);
  return (
    <Page title="Dashboard | Admin-panel">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }} style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4">
            Hi {userUpdataData?.username}, Welcome to HungerCare Admin-panel
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <AppBugReports /> */}
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            {/* <AppWebsiteVisits /> */}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
