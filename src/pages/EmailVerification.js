import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { confirmEmail } from '../services/api';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

function EmailVerification() {
  const { id } = useParams();
  const { token } = useParams();
  console.log(id);
  console.log(token);

  const verifyEmail = async () => {
    const res = await confirmEmail(id, token);
    console.log(res);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '14%',
        backgroundColor: 'whitesmoke',
        width: '100%',
        height: '100%'
      }}
    >
      <div>
        <LogoOnlyLayout />
        <h3 style={{ fontSize: '150.5%' }}>Click on the following button to Confirm your email</h3>
        <Button
          onClick={verifyEmail}
          variant="contained"
          style={{ marginLeft: '40%', marginTop: '20px' }}
        >
          Confirm Email
        </Button>
      </div>
    </div>
  );
}

export default EmailVerification;
