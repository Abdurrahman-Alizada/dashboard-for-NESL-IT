import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import Dhobies from '../../../pages/Dhobies';
// ----------------------------------------------------------------------

export default function AppWebsiteVisits() {
  return (
    <Card>
      <CardHeader title="Recent Donor Request for Account Creation" subheader="" />
      <Dhobies />
    </Card>
  );
}
