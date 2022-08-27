import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
import PeopleIcon from '@material-ui/icons/People';
import { useEffect, useState } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Button, Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { getAllDoneeNumber } from '../../../services/api';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppNewUsers() {
  const [totalRegDonees, setTotalRegDonees] = useState('');
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllDoneeNumber();
        setTotalRegDonees(response.data.donees);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  });
  return (
    <RootStyle>
      <IconWrapperStyle>
        {/* <Icon icon={appleFilled} width={24} height={24} /> */}
        <PeopleIcon fontSize="large" />
      </IconWrapperStyle>
      <Typography variant="h3">
        {' '}
        {!totalRegDonees ? fShortenNumber(totalRegDonees) : <p style={{ color: '#D0F2FF' }}>.</p>}
      </Typography>
      <Typography>{totalRegDonees?.length ? totalRegDonees.length : '0'}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Registered Donees
      </Typography>
    </RootStyle>
  );
}
