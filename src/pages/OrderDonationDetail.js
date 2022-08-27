/* eslint-disable */
import React, { useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DetailOfComment from './DetailOfComment';
import { Routes, Route, useParams } from 'react-router-dom';
import OrderPage from './OrderPage';

function createData(id, name, email, userType, comments) {
  return { id, name, email, userType, comments };
}

function OrderDonationDetail({ totalFeedback }) {
  // const {state} = useParams();

  const [isPostId, setIsPostId] = useState();
  const [isPost, setIsPost] = useState();

  return (
    <div>
      <Typography mb={5} ml={3}>
        <Typography variant="h4" gutterBottom>
          Donations
        </Typography>
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead style={{ fontSize: '15px' }}>
            <TableRow>
              <TableCell align="center">Name of Donee</TableCell>
              <TableCell align="center">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalFeedback?.map((post) => {
              return (
                <TableRow
                  style={{ cursor: 'pointer' }}
                  hover="true"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{post.username}</TableCell>
                  <TableCell align="center">{post.email}</TableCell>

                  {/* <TableCell style={{ paddingLeft: '50px' }} align="left">
            
              </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OrderDonationDetail;
