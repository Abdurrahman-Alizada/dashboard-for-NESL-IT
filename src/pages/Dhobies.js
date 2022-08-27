// /* eslint-disable */
// import { filter } from 'lodash';
// import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
// import { useState, useEffect } from 'react';
// import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink } from 'react-router-dom';
// // material
// import {
//   Card,
//   Table,
//   Stack,
//   Avatar,
//   Button,
//   Checkbox,
//   TableRow,
//   TableBody,
//   TableCell,
//   Container,
//   Typography,
//   TableContainer,
//   TablePagination
// } from '@mui/material';
// // components
// import Page from '../components/Page';
// import Label from '../components/Label';
// import Scrollbar from '../components/Scrollbar';
// import SearchNotFound from '../components/SearchNotFound';
// import { DashboardListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
// //
// // import dhobies from '../_mocks_/user';
// import { FetchRecentDhobies } from '../services/api';

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'name', label: 'Name', alignRight: false },
//   { id: 'address', label: 'Address', alignRight: false },
//   { id: 'email', label: 'Email', alignRight: false },
//   { id: 'mobile_no', label: 'Mobile_no', alignRight: false },
//   { id: '' }
// ];

// // ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array?.map((el, index) => [el, index]);
//   stabilizedThis?.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis?.map((el) => el[0]);
// }

// export default function Dhobies() {
//   const [page, setPage] = useState(0);
//   const [order, setOrder] = useState('asc');
//   const [selected, setSelected] = useState([]);
//   const [orderBy, setOrderBy] = useState('name');
//   const [filterName, setFilterName] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [dhobies, setDhobies] = useState([]);

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     try {
//   //       const response = await FetchRecentDhobies();
//   //       setDhobies(response.data);
//   //       // console.log(response);
//   //     } catch (e) {
//   //       console.error(e);
//   //     }
//   //   }
//   //   fetchData();
//   // });

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = dhobies.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleFilterByName = (event) => {
//     setFilterName(event.target.value);
//   };

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dhobies.length) : 0;

//   const filteredUsers = applySortFilter(dhobies, getComparator(order, orderBy), filterName);

//   const isUserNotFound = filteredUsers.length === 0;

//   return (
//     <Page title="User | Admin-panel">
//       <br />
//       <Container>
//         <Scrollbar>
//           <TableContainer sx={{ minWidth: 800 }}>
//             <Table>
//               <DashboardListHead
//                 order={order}
//                 orderBy={orderBy}
//                 headLabel={TABLE_HEAD}
//                 rowCount={dhobies.length}
//                 numSelected={selected.length}
//                 onRequestSort={handleRequestSort}
//                 onSelectAllClick={handleSelectAllClick}
//               />
//               <TableBody>
//                 {dhobies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//                   const {
//                     _id,
//                     username,
//                     email,
//                     id,
//                     name,
//                     mobile_no,
//                     role,
//                     address,
//                     avatarUrl,
//                     isVerified,
//                     profilePic
//                   } = row;
//                   const isItemSelected = selected.indexOf(name) !== -1;

//                   return (
//                     <TableRow
//                       hover
//                       key={id}
//                       tabIndex={-1}
//                       role="checkbox"
//                       selected={isItemSelected}
//                       aria-checked={isItemSelected}
//                     >
//                       <TableCell component="th" scope="row" padding="none">
//                         <Stack direction="row" alignItems="center" spacing={2}>
//                           <Avatar alt={username} src={profilePic} />
//                           <Typography variant="subtitle2" noWrap>
//                             {username}
//                           </Typography>
//                         </Stack>
//                       </TableCell>
//                       <TableCell align="left">{address}</TableCell>
//                       <TableCell align="left">{email}</TableCell>
//                       <TableCell align="left">{mobile_no}</TableCell>
//                       <TableCell align="right">
//                         <UserMoreMenu _id={_id} />
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//                 {emptyRows > 0 && (
//                   <TableRow style={{ height: 53 * emptyRows }}>
//                     <TableCell colSpan={6} />
//                   </TableRow>
//                 )}
//               </TableBody>
//               {/* {isUserNotFound && (
//                 <TableBody>
//                   <TableRow>
//                     <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//                       <SearchNotFound searchQuery={filterName} />
//                     </TableCell>
//                   </TableRow>
//                 </TableBody> */}
//             </Table>
//           </TableContainer>
//         </Scrollbar>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={dhobies.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Container>
//     </Page>
//   );
// }

/* eslint-disable */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { DashboardListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import dhobies from '../_mocks_/registerUsers';
// import { FetchRecentDhobies } from '../services/api';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'id', alignRight: false },
  { id: 'username', label: 'username', alignRight: false },
  { id: 'desc', label: 'description', alignRight: false },
  { id: 'orders', label: 'orders', alignRight: false },
  { id: 'price', label: 'price', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function Donee() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dhobies, setDhobies] = useState([
    {
      id: 11,
      username: 'baazmuhammad313',
      description: 'dinner with chinee Rice',
      orders: 200,
      price: 5887
    },
    {
      id: 12,
      username: 'kaleemprot12',
      description: 'Noodles with char siu',
      orders: 40,
      price: 5039
    },
    {
      id: 13,
      username: 'phalawan13',
      description: 'chicken handi',
      orders: 30,
      price: 500
    },
    {
      id: 14,
      username: 'abdurehmanseekh14',
      description: 'chicken handi',
      orders: 30,
      price: 500
    },
    {
      id: 15,
      username: 'zakirboss15',
      description: 'chicken handi',
      orders: 30,
      price: 500
    },
    {
      id: 16,
      username: 'roman16',
      description: 'chicken handi',
      orders: 30,
      price: 500
    },
    {
      id: 17,
      username: 'bmk17',
      description: 'chicken handi',
      orders: 30,
      price: 500
    },
    {
      id: 18,
      username: 'haris18',
      description: 'chicken handi',
      orders: 30,
      price: 500
    },
    {
      id: 19,
      username: 'ismail19',
      description: 'chicken handi',
      orders: 30,
      price: 500
    },
    {
      id: 20,
      username: 'jalal20',
      description: 'chicken handi',
      orders: 30,
      price: 500
    }
  ]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await FetchRecentDhobies();
  //       setDhobies(response.data);
  //       // console.log(response);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   fetchData();
  // });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dhobies.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dhobies.length) : 0;

  const filteredUsers = applySortFilter(dhobies, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="User | Admin-panel">
      <Typography>Registered Donors</Typography>
      <br />

      <Container>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <DashboardListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dhobies?.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {dhobies?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, username, orders, description, price } = row;
                  const isItemSelected = selected.indexOf(name) !== -1;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {/* <Avatar alt={username} src={profilePic} /> */}
                          <Typography variant="subtitle2" noWrap>
                            {id}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{username}</TableCell>
                      <TableCell align="left">{description}</TableCell>
                      <TableCell align="left">{orders}</TableCell>
                      <TableCell align="left">{price}</TableCell>
                      <TableCell align="right">
                        <UserMoreMenu id={id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {/* {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody> */}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dhobies?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Page>
  );
}
