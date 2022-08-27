/* eslint-disable */
import React, { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import { updateUser } from '../services/api';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const EditForm = ({ editId, setIsEdit }) => {
  const [err, setErr] = useState('');
  const [data, setData] = useState({
    username: editId.username,
    email: editId.email,
    password: editId.password,
    mobile_no: editId.mobile_no
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async () => {
    event.preventDefault();
    try {
      const response = await updateUser(editId._id, data);
      if (response.status == 203) {
        setErr(response.data.result);
      } else {
        setIsEdit(false);
      }
    } catch (e) {
      console.error(e);
    }
  };
  console.log(err);
  // console.log(err);
  const margin = { margin: '0 5px' };
  const handleBack = () => {
    setIsEdit(false);
  };
  return (
    <div>
      <Grid>
        <Card>
          <CardContent>
            <Typography variant="h5" color="primary">
              <ArrowBackIcon
                onClick={handleBack}
                style={{ marginBottom: '20px', marginBottom: '-3px', marginRight: '11px' }}
              />
              Edit User Account Info
            </Typography>
            <br />

            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    onFocus={() => setErr('')}
                    onChange={handleChange}
                    defaultValue={editId.username}
                    name="username"
                    placeholder="Enter username"
                    label="username"
                    variant="outlined"
                    fullWidth="true"
                    required="true"
                    type="text"
                  />
                  {err && <p style={{ color: 'red' }}>{err}</p>}
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    onChange={handleChange}
                    defaultValue={editId.email}
                    name="email"
                    placeholder="Enter email"
                    label="email"
                    variant="outlined"
                    fullWidth="true"
                    required="true"
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    onChange={handleChange}
                    defaultValue={editId.password}
                    name="password"
                    placeholder="Enter password"
                    label="password"
                    variant="outlined"
                    fullWidth="true"
                    required="true"
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    onChange={handleChange}
                    defaultValue={editId.mobile_no}
                    name="mobile_no"
                    placeholder="Enter mobileno"
                    label="mobile no"
                    variant="outlined"
                    fullWidth="true"
                    required="true"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} align="right">
                  {/* <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button> */}

                  <button
                    style={{
                      backgroundColor: '#3F51B5',
                      borderRadius: '5px',
                      border: 'none',
                      color: 'white',
                      padding: '8px 18px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontSize: '14px',
                      margin: '4px 2px',
                      cursor: 'pointer'
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default EditForm;
