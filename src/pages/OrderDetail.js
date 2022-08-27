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

function OrderDetail({ title, totalFeedback, setIsOrder, name }) {
  // const {state} = useParams();

  const [isPostId, setIsPostId] = useState();
  const [isPost, setIsPost] = useState();

  const moveToDetailofDonationPage = (id) => {
    setIsPost(true);
    setIsPostId(id);
    console.log(id);
  };

  const handleBack = () => {
    // setIsOrder(false);
  };
  // console.log(totalFeedback);
  // const handleMessage = () => {
  //   setTimeout(() => {
  //     if (totalFeedback.length === 0) {
  //       // console.log('This will run after 1 second!');
  //       setIsMessage('There is no order  placed to this user');
  //     }
  //   }, 2000);

  // };

  if (!isPost) {
    return (
      <div>
        <Typography mb={5} ml={3}>
          <Typography variant="h4" gutterBottom>
            {/* <ArrowBackIcon
            onClick={handleBack}
            style={{ marginBottom: '-3px', marginRight: '5px' }}
          /> */}
            Donations
          </Typography>
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
            <TableHead style={{ fontSize: '15px' }}>
              <TableRow>
                <TableCell align="center">Post</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Date & Time</TableCell>
                <TableCell align="center">Remaining Packages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Typography>
                {/* {totalFeedback.length === 0 ? 'There is no order  placed to this user' : <></>} */}
                {/* {isMessage}
              {handleMessage()} */}
              </Typography>{' '}
              {totalFeedback?.map((post) => {
                return (
                  <TableRow
                    style={{ cursor: 'pointer' }}
                    hover="true"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" onClick={() => moveToDetailofDonationPage(post._id)}>
                      {post.itemName}
                    </TableCell>
                    <TableCell align="center" onClick={() => moveToDetailofDonationPage(post._id)}>
                      {post.total}
                    </TableCell>
                    <TableCell align="center" onClick={() => moveToDetailofDonationPage(post._id)}>
                      {post.location}
                    </TableCell>
                    <TableCell align="center" onClick={() => moveToDetailofDonationPage(post._id)}>
                      {post.createdAt}
                    </TableCell>
                    <TableCell align="center" onClick={() => moveToDetailofDonationPage(post._id)}>
                      {post.totalPackages}
                    </TableCell>

                    <TableCell style={{ paddingLeft: '50px' }} align="left">
                      {/* {truncate(row.message)} */}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <OrderPage isDetailofDonation={true} orderId={isPostId} />;
  }
}

export default OrderDetail;
