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
import { UserListHead, DhobiListToolbar, UseMoreDhobie } from '../components/_dashboard/user';
import OrderPage from './OrderPage';
import { getAllRegisterDonors } from 'src/services/api';
import dateFormat from 'dateformat';
//
// import totalRegUser from '../_mocks_/registerUsers';
// import { getAllDhobieUser } from '../services/api';
import EditFormDhobie from './EditFormDhobie';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Username', label: 'Username', alignRight: false },
  { id: 'Email', label: 'Email', alignRight: false },
  { id: 'DonationPosts', label: 'DonationPosts', alignRight: false }
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
      (_user) => _user.email?.toLowerCase().indexOf(query?.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function DonorScreen({ title }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState({});
  // const [totalRegUser, setTotalRegUser] = useState([]);
  const [selectUser, setSelectUser] = useState([]);
  // console.log(isEdit);
  // console.log(editId);

  const [totalRegDonor, setTotalRegDonor] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllRegisterDonors();
        // setTotalRegUser(response.data);
        console.log('93::', response.data);
        let Users = response.data.Users;
        let count = response.data.count;
        const keys = Object.keys(count);
        console.log(keys);

        let userArray = [];

        console.log(Users);

        setTotalRegDonor(response.data.Users);
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
  const [orderBy, setOrderBy] = useState('email');
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
      const newSelecteds = totalRegDonor.map((n) => n.email);
      setSelectUser(totalRegDonor?.map((n) => n._id));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const userClick = (_id) => {
    const newData = selectUser.filter((e) => e !== _id);
    console.log(newData);
  };

  const handleClick = (event, email, _id) => {
    if (selectUser.includes(id)) {
      setSelectUser(selectUser.filter((e) => e !== _id));
    } else {
      setSelectUser([...selectUser, _id]);
    }

    const selectedIndex = selected.indexOf(email);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalRegDonor?.length) : 0;

  const filteredUsers = applySortFilter(totalRegDonor, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers?.length === 0;
  const [isOrder, setIsOrder] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(true);
  const handleOrderClick = (_id, email) => {
    console.log('this is id::', _id);
    setIsOrder(true);
    setOrderId(_id);
    setName(email);
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
                  {isEdit ? '' : 'Registered Donors'}
                </Typography>
              )}
              {/* <Typography variant="h4" gutterBottom>
           Registered Donors
          </Typography> */}
            </Stack>

            <Card>
              {!isEdit ? (
                <>
                  <DhobiListToolbar
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
                          rowCount={totalRegDonor?.length}
                          numSelected={selected.length}
                          onRequestSort={handleRequestSort}
                          onSelectAllClick={handleSelectAllClick}
                        />

                        <TableBody>
                          {totalRegDonor
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                              const { _id, username, email, location } = row;
                              const isItemSelected = selected.indexOf(_id) !== -1;

                              return (
                                <TableRow
                                  hover
                                  key={_id}
                                  tabIndex={-1}
                                  role="checkbox"
                                  selected={isItemSelected}
                                  aria-checked={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isItemSelected}
                                      // onChange={(event) => handleClick(event, email, _id)}
                                      // onChange={(event) => handleUserSelect()}
                                    />
                                  </TableCell>

                                  <TableCell
                                    onClick={() => handleOrderClick(_id, email)}
                                    component="th"
                                    scope="row"
                                    padding="none"
                                  >
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                      {/* <Avatar alt={email} src={profilePic} /> */}

                                      <Typography
                                        variant="subtitle2"
                                        noWrap
                                        style={{ marginLeft: 15 }}
                                      >
                                        {username}
                                      </Typography>
                                    </Stack>
                                  </TableCell>

                                  <TableCell
                                    onClick={() => handleOrderClick(_id, email)}
                                    align="left"
                                    style={{ marginLeft: 20 }}
                                  >
                                    {email}
                                  </TableCell>

                                  <TableCell
                                    onClick={() => handleOrderClick(_id, email)}
                                    align="left"
                                    style={{ marginLeft: 20 }}
                                  >
                                    Click me
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
                        {isUserNotFound && <TableBody></TableBody>}
                      </Table>
                    </TableContainer>
                  </Scrollbar>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalRegDonor?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              ) : (
                <div>
                  <EditFormDhobie setIsEdit={setIsEdit} editId={editId} />
                </div>
              )}
            </Card>
          </Container>
        </>
      )}
    </Page>
  );
}
