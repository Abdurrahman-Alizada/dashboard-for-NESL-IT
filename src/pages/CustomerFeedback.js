import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DetailOfComment from './DetailOfComment';

function createData(id, name, email, userType, comments) {
  return { id, name, email, userType, comments };
}
// const rows = [
//   createData(1, 'Muhammad', 'mi477048@gmail.com', 'user', 'We are facing some problem at..'),
//   createData(2, 'Haris', '18mdswe013@gmail.com', 'admin', 'We are facing some problem at..'),
//   createData(3, 'Ismail', 'hariskhan@gmail.com', 'admin', 'We are facing some problem at..'),
//   createData(4, 'Hilal', 'hilal3322@gmail.com', 'user', 'We are facing some problem at..'),
//   createData(5, 'Ahmad', 'aliahmad78@gmail.com', 'user', 'We are facing some problem at..'),
//   createData(6, 'Muhammad', 'mi477048@gmail.com', 'user', 'We are facing some problem at..'),
//   createData(7, 'Haris', '18mdswe013@gmail.com', 'admin', 'We are facing some problem at..'),
//   createData(8, 'Ismail', 'hariskhan@gmail.com', 'admin', 'We are facing some problem at..'),
//   createData(9, 'Hilal', 'hilal3322@gmail.com', 'user', 'We are facing some problem at..'),
//   createData(10, 'Ahmad', 'aliahmad78@gmail.com', 'user', 'We are facing some problem at..'),
//   createData(11, 'Muhammad', 'mi477048@gmail.com', 'user', 'We are facing some problem at..'),
//   createData(12, 'Haris', '18mdswe013@gmail.com', 'admin', 'We are facing some problem at..'),
//   createData(13, 'Ismail', 'hariskhan@gmail.com', 'admin', 'We are facing some problem at..'),
//   createData(14, 'Hilal', 'hilal3322@gmail.com', 'user', 'We are facing some problem at..'),
//   createData(15, 'Ahmad', 'aliahmad78@gmail.com', 'user', 'We are facing some problem at..')
// ];

function CustomerFeedback({ title, totalFeedback }) {
  const [isComment, setIsComment] = useState(false);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');

  function truncate(string, limit = 40) {
    return string.length > limit ? `${string.substr(0, limit)}...` : string;
  }

  const nextpage = (id, message) => {
    setIsComment(true);
    setUserId(id);
    setMessage(message);
  };
  return (
    <div>
      <Typography mb={5} ml={3}>
        {title ? (
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        ) : (
          <Typography variant="h4" gutterBottom>
            Register User list
          </Typography>
        )}
      </Typography>
      {isComment ? (
        <DetailOfComment message={message} userId={userId} setIsComment={setIsComment} />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
            <TableHead style={{ fontSize: '15px' }}>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">User_type</TableCell>
                <TableCell align="center">Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalFeedback.map((row) => (
                <TableRow
                  style={{ cursor: 'pointer' }}
                  hover="true"
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => nextpage(row._id, row.message)}
                >
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.user_type}</TableCell>

                  <TableCell style={{ paddingLeft: '50px' }} align="left">
                    {truncate(row.message)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default CustomerFeedback;
