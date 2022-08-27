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
import { UserListHead, UserListToolbar, UseMoreUser } from '../components/_dashboard/user';
import { getAllDoneeNumber } from '../services/api';
// import totalRegUser from '../_mocks_/Useruser';
import { getAllUsers } from '../services/api';
import EditForm from './EditForm';
import OrderPage from '../pages/OrderPage';
import dateFormat from 'dateformat';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '1', label: 'Donee Name', alignRight: false },
  { id: '2', label: 'Email', alignRight: false }
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
    return filter(
      array,
      (_user) => _user.itemName?.toLowerCase().indexOf(query?.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function User({ title }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState({});
  const [totalRegUser, setTotalRegUser] = useState([]);
  const [selectUser, setSelectUser] = useState([]);
  // console.log(isEdit);
  // console.log(editId);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllDoneeNumber();
        console.log('donee ddddddddddddd::', response.data);
        setTotalRegUser(response.data.donees);
        console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);
  // console.log(totalRegUser);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('itemName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isExist, setIsExist] = useState(false);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = totalRegUser.map((n) => n.itemName);
      setSelectUser(totalRegUser.map((n) => n._id));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const userClick = (id) => {
    const newData = selectUser.filter((e) => e !== id);
    console.log(newData);
  };

  const handleClick = (event, itemName, _id) => {
    if (selectUser.includes(_id)) {
      setSelectUser(selectUser.filter((e) => e !== _id));
    } else {
      setSelectUser([...selectUser, _id]);
    }

    //code to practice above login on different method

    // console.log('force called');
    // const newData = selectUser.filter((e) => e !== _id);
    // setSelectUser(newData);
    // console.log(selectUser);
    // setSelectUser([...selectUser, _id]);
    // console.log(selectUser);

    const selectedIndex = selected.indexOf(itemName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, itemName);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalRegUser?.length) : 0;

  const filteredUsers = applySortFilter(totalRegUser, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers?.length === 0;

  // Test the selected user through the following line
  // console.log(selectUser);
  const [isOrder, setIsOrder] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const handleOrderClick = (id, itemName) => {
    setIsOrder(true);
    setOrderId(id);
    setName(itemName);
    // console.log(id);
  };

  return (
    <Page title="User | Admin-panel">
      {isOrder ? (
        <OrderPage isAdmin={isAdmin} name={name} orderId={orderId} setIsOrder={setIsOrder} />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              {title ? (
                <Typography variant="h4" gutterBottom>
                  {title}
                </Typography>
              ) : (
                <Typography variant="h4" gutterBottom>
                  {isEdit ? '' : 'Registered Donees'}
                </Typography>
              )}
              {/* <Typography variant="h4" gutterBottom>
            All Register User
          </Typography> */}
            </Stack>

            <Card>
              {!isEdit ? (
                <>
                  <UserListToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                    selectUser={selectUser}
                    setSelected={setSelected}
                  />

                  <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                      <Table>
                        <UserListHead
                          order={order}
                          orderBy={orderBy}
                          headLabel={TABLE_HEAD}
                          rowCount={totalRegUser?.length}
                          numSelected={selected.length}
                          onRequestSort={handleRequestSort}
                          onSelectAllClick={handleSelectAllClick}
                        />

                        <TableBody>
                          {totalRegUser
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                              const { _id, username, email } = row;
                              const isItemSelected = false;

                              return (
                                <TableRow
                                  hover
                                  key={_id}
                                  tabIndex={-1}
                                  role="checkbox"
                                  selected={isItemSelected}
                                  aria-checked={isItemSelected}
                                  // onClick={() => handleOrderClick(_id, itemName)}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isItemSelected}
                                      // onChange={(event) => handleClick(event, itemName, _id)}
                                    />
                                  </TableCell>
                                  <TableCell
                                    onClick={() => handleOrderClick(_id, username)}
                                    component="th"
                                    scope="row"
                                    padding="none"
                                  >
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                      {/* <Avatar alt={itemName} src={profilePic} /> */}
                                      <Typography variant="subtitle2" noWrap>
                                        {username}
                                      </Typography>
                                    </Stack>
                                  </TableCell>
                                  <TableCell
                                    onClick={() => handleOrderClick(_id, email)}
                                    align="left"
                                  >
                                    {email}
                                  </TableCell>

                                  {/* <TableCell align="left">
                                    <UseMoreUser
                                      row={row}
                                      setEditId={setEditId}
                                      setIsEdit={setIsEdit}
                                      _id={_id}
                                    />
                                  </TableCell> */}
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                        {isUserNotFound && (
                          <TableBody>
                            {/* <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow> */}
                          </TableBody>
                        )}
                      </Table>
                    </TableContainer>
                  </Scrollbar>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalRegUser?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              ) : (
                <div>
                  <EditForm setIsEdit={setIsEdit} editId={editId} />
                </div>
              )}
            </Card>
          </Container>
        </>
      )}
    </Page>
  );
}

// /* eslint-disable */
// import { filter } from 'lodash';
// import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
// import { useState, useEffect } from 'react';
// import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink, useNavigate,useParams } from 'react-router-dom';

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
// import { UserListHead, UserListToolbar, UseMoreUser } from '../components/_dashboard/user';
// //
// // import regUsers from '../_mocks_/registerUsers'
// // import totalRegUser from '../_mocks_/Useruser'
// // import { getAllUsers } from '../services/api';
// import EditForm from './EditForm';
// import OrderPage from './OrderPage';
// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'id', label: 'id', alignRight: false },
//   { id: 'itemName', label: 'itemName', alignRight: false },
//   { id: 'desc', label: 'description', alignRight: false },
//   {id:'orders', label:'orders',alignRight: false},
//   { id: 'price',label: 'price',alignRight:false},

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
//     return filter(
//       array,
//       (itemName) => itemName.itemName?.toLowerCase().indexOf(query?.toLowerCase()) !== -1
//     );
//   }
//   return stabilizedThis?.map((el) => el[0]);
// }

// export default function User({ title }) {
//   const navigate = useNavigate();

//   const [isEdit, setIsEdit] = useState(false);
//   const [editId, setEditId] = useState({});
//   // const [totalRegUser, setTotalRegUser] = useState(regUsers);
//   // const [regUsers,setRegUsers] = useState()
//   const [selectUser, setSelectUser] = useState([]);
//   const [regUsers,setRegUsers] = useState(  [
//     {
//       id: 11,
//       itemName: "baazmuhammad313",
//       description: "dinner with chinee Rice",
//       orders: 200,
//       price: 5887
//   },
//   {
//       id: 12,
//       itemName: "kaleemprot12",
//       description: "Noodles with char siu",
//       orders: 40,
//       price: 5039
//   },
//   {
//       id: 13,
//       itemName: "phalawan13",
//       description: "chicken handi",
//       orders: 30,
//       price: 500
//   },
//   {
//     id: 14,
//     itemName: "abdurehmanseekh14",
//     description: "chicken handi",
//     orders: 30,
//     price: 500
// },
// {
//   id: 15,
//   itemName: "zakirboss15",
//   description: "chicken handi",
//   orders: 30,
//   price: 500
// },
// {
//   id: 16,
//   itemName: "roman16",
//   description: "chicken handi",
//   orders: 30,
//   price: 500
// },
// {
//   id: 17,
//   itemName: "bmk17",
//   description: "chicken handi",
//   orders: 30,
//   price: 500
// },
// {
//   id: 18,
//   itemName: "haris18",
//   description: "chicken handi",
//   orders: 30,
//   price: 500
// },
// {
//   id: 19,
//   itemName: "ismail19",
//   description: "chicken handi",
//   orders: 30,
//   price: 500
// }
// ,{
//   id: 20,
//   itemName: "jalal20",
//   description: "chicken handi",
//   orders: 30,
//   price: 500
// }
//   ]
//   )

//   // console.log(isEdit);
//   // console.log(editId);
//   // useEffect(() => {
//   //   async function fetchData() {
//   //     try {
//   //       const response = await getAllUsers();
//   //       setTotalRegUser(response.data);
//   //     } catch (e) {
//   //       console.error(e);
//   //     }
//   //   }
//   //   fetchData();
//   // });
//   // console.log(totalRegUser);
//   const [page, setPage] = useState(0);
//   const [order, setOrder] = useState('asc');
//   const [selected, setSelected] = useState([]);
//   const [orderBy, setOrderBy] = useState('itemName');
//   const [filterName, setFilterName] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [isExist, setIsExist] = useState(false);
//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = regUsers?.map((n) => n.itemName);
//       setSelectUser(regUsers?.map((n) => n.id));
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };
//   const userClick = (id) => {
//     const newData = selectUser.filter((e) => e !== id);
//     console.log(newData);

//     // setSelectUser(newData);
//     // console.log(isExist);

//     // const newData = selectUser.filter((e) => {
//     //   if (e != id) {
//     //     setIsExist(true);
//     //     return e != id;
//     //   }
//     // });

//     // selectUser.map((e) => {
//     //   if (e == id) {

//     //   }
//     // });
//   };

//   const handleClick = (event, itemName, id) => {
//     if (selectUser.includes(id)) {
//       setSelectUser(selectUser.filter((e) => e !== id));
//     } else {
//       setSelectUser([...selectUser, id]);
//     }

//     const selectedIndex = selected.indexOf(itemName);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, itemName);
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

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - regUsers?.length) : 0;

//   const filteredUsers = applySortFilter(regUsers, getComparator(order, orderBy), filterName);

//   const isUserNotFound = filteredUsers?.length === 0;

//   // Test the selected user through the following line`
//   // console.log(selectUser);
//   const [isOrder, setIsOrder] = useState(false);
//   const [orderId, setOrderId] = useState('');
//   const [name, setName] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false);
//   const handleOrderClick = (id, itemName) => {

//     setIsOrder(true);
//     setOrderId(id);
//     setName(itemName);
//     // console.log(id);
//   };

//   return (
//     <Page title="User | Admin-panel">
//       {isOrder ? (
//         <OrderPage isAdmin={isAdmin} name={name} orderId={orderId} setIsOrder={setIsOrder} />
//       ) : (
//         <>
//           <Container>
//             <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

//               {/* {title ? (
//                 <Typography variant="h4" gutterBottom>
//                   {title}
//                 </Typography>
//               ) : (
//                 <Typography variant="h4" gutterBottom>
//                   {isEdit ? '' : 'Register Users list....'}
//                 </Typography>
//               )} */}

//               <Typography variant="h4" gutterBottom>
//            Registered Donees
//           </Typography>
//             </Stack>

//             <Card>
//               {/* {!isEdit ? ( */}
//                 <>
//                   <UserListToolbar
//                     numSelected={selected.length}
//                     filterName={filterName}
//                     onFilterName={handleFilterByName}
//                     selectUser={selectUser}
//                     setSelected={setSelected}
//                   />

//                   <Scrollbar>
//                     <TableContainer sx={{ minWidth: 800 }}>
//                       <Table>
//                         <UserListHead
//                           order={order}
//                           orderBy={orderBy}
//                           headLabel={TABLE_HEAD}
//                           rowCount={regUsers?.length}
//                           numSelected={selected.length}
//                           onRequestSort={handleRequestSort}
//                           onSelectAllClick={handleSelectAllClick}
//                         />

//                         <TableBody>
//                           {regUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                             .map((row,index) => {
//                               const {
//                                 id,
//                                 itemName,
//                                 orders,
//                                 description,
//                                 price
//                               } = row;
//                               const isItemSelected = selected.indexOf(itemName) !== -1;

//                               return (
//                                 <TableRow
//                                   hover
//                                   key={id}
//                                   tabIndex={-1}
//                                   role="checkbox"
//                                   selected={isItemSelected}
//                                   aria-checked={isItemSelected}
//                                   onClick={() => handleOrderClick(id, itemName)}
//                                 >
//                                   <TableCell padding="checkbox">
//                                     <Checkbox
//                                       checked={isItemSelected}
//                                       onChange={(event) => handleClick(event, itemName, id)}
//                                     />
//                                   </TableCell>

//                                   <TableCell
//                                     onClick={() => handleOrderClick(id, itemName)}
//                                     component="th"
//                                     scope="row"
//                                     padding="none"
//                                   >
//                                     <Stack direction="row" alignItems="right" style={{marginLeft: '15px'}} >

//                                       <Typography variant="subtitle2" noWrap>
//                                         {id}
//                                       </Typography>
//                                     </Stack>
//                                   </TableCell>
//                                   <TableCell
//                                     onClick={() => {
//                                       handleOrderClick(id, itemName)
//                                      navigate('/dashboard/OrderDetail')
//                                     }}
//                                     component="th"
//                                     scope="row"
//                                     padding="none"
//                                   >
//                                     <Stack direction="row" alignItems="right">

//                                       <Typography variant="subtitle2" noWrap style={{marginLeft: '15px'}}>
//                                         {itemName}
//                                       </Typography>
//                                     </Stack>
//                                   </TableCell>
//                                   <TableCell
//                                     onClick={() => handleOrderClick(id, itemName)}
//                                     component="th"
//                                     scope="row"
//                                     padding="none"
//                                   >
//                                     <Stack direction="row" alignItems="center" spacing={2}>

//                                       <Typography variant="subtitle2" noWrap style={{marginLeft: '20px'}}>
//                                         {description}
//                                       </Typography>
//                                     </Stack>
//                                   </TableCell>
//                                   <TableCell
//                                     onClick={() => handleOrderClick(id, itemName)}
//                                     component="th"
//                                     scope="row"
//                                     padding="none"
//                                   >
//                                     <Stack direction="row" alignItems="center" spacing={2}>

//                                       <Typography variant="subtitle2" noWrap style={{marginLeft: '20px'}}>
//                                         {orders}
//                                       </Typography>
//                                     </Stack>
//                                   </TableCell>
//                                   <TableCell
//                                     onClick={() => handleOrderClick(id, itemName)}
//                                     component="th"
//                                     scope="row"
//                                     padding="none"
//                                   >
//                                     <Stack direction="row" alignItems="center" spacing={2}>

//                                       <Typography variant="subtitle2" noWrap style={{marginLeft: 20}}>
//                                         {price}
//                                       </Typography>
//                                     </Stack>
//                                    </TableCell>
//                                  {/* <TableCell align="left">
//                                     <UseMoreUser
//                                       row={row}
//                                       setEditId={setEditId}
//                                       setIsEdit={setIsEdit}
//                                       id={id}
//                                     />
//                                   </TableCell> */}
//                                 </TableRow>
//                               );
//                             })}
//                           {emptyRows > 0 && (
//                             <TableRow style={{ height: 53 * emptyRows }}>
//                               <TableCell colSpan={6} />
//                             </TableRow>
//                           )}
//                         </TableBody>
//                         {isUserNotFound && (
//                           <TableBody>
//                             {/* <TableRow>
//                       <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//                         <SearchNotFound searchQuery={filterName} />
//                       </TableCell>
//                     </TableRow> */}
//                           </TableBody>
//                         )}
//                       </Table>
//                     </TableContainer>
//                   </Scrollbar>

//                   <TablePagination
//                     rowsPerPageOptions={[4, 8, 12]}
//                     component="div"
//                     count={regUsers?.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                   />
//                 </>
//               {/* ) : ( */}
//                 {/* <div>
//                   <EditForm setIsEdit={setIsEdit} editId={editId} />
//                 </div> */}
//               {/* )} */}
//             </Card>
//           </Container>
//         </>
//       )}
//     </Page>
//   );
// }

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import TablePagination from "@material-ui/core/TablePagination";
// import Paper from "@material-ui/core/Paper";
// import { Stack } from "@mui/material";

// const useStyles = makeStyles({
//   // table: {
//   //   minWidth: 650
//   // }
// });

// function createData(name, orders, fat, carbs, protein) {
//   return { name, orders, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Gingerbread2", 356, 16.0, 49, 3.9),
//   createData("Gingerbread3", 356, 16.0, 49, 3.9),
//   createData("Gingerbread4", 356, 16.0, 49, 3.9),
//   createData("Gingerbread5", 356, 16.0, 49, 3.9),
//   createData("Gingerbread6", 356, 16.0, 49, 3.9),
//   createData("Gingerbread7", 356, 16.0, 49, 3.9),
//   createData("Gingerbread8", 356, 16.0, 49, 3.9),
//   createData("Gingerbread9", 356, 16.0, 49, 3.9),
//   createData("Gingerbread10", 356, 16.0, 49, 3.9),
//   createData("Gingerbread11", 356, 16.0, 49, 3.9),
//   createData("Gingerbread12", 356, 16.0, 49, 3.9),
//   createData("Gingerbread13", 356, 16.0, 49, 3.9)
// ];

// export default function User() {
//   const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     console.log(newPage);

//   };

//   const handleChangeRowsPerPage = event => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   const emptyRows =
//     rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//   return (
//     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="left">orders</TableCell>
//             <TableCell align="left">Fat&nbsp;(g)</TableCell>
//             <TableCell align="left">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="left">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows
//             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             .map((row, index) => (
//               <TableRow key={row.name}>
//                 <TableCell component="th" scope="row">
//                   {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.orders}</TableCell>
//                 <TableCell align="right">{row.fat}</TableCell>
//                 <TableCell align="right">{row.carbs}</TableCell>
//                 <TableCell align="right">{row.protein}</TableCell>
//               </TableRow>
//             ))}
//           {emptyRows > 0 && (
//             <TableRow style={{ height: 40 * emptyRows }}>
//               <TableCell colSpan={2} />
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={[2, 5, 20]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       />
//     </TableContainer>
//     </Stack>
//   );
// }
