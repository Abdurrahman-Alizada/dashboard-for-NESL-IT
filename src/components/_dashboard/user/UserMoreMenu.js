/* eslint-disable */
import { Button } from '@mui/material';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { updateRecentDhobieStatus } from '../../../services/api';

export default function UserMoreMenu({ _id }) {
  const handleStatus = async (status) => {
    const response = await updateRecentDhobieStatus(status, _id);
    console.log(response);
  };

  const submit = (value) => {
    if (value == 'approve') {
      confirmAlert({
        title: 'Are you sure?',
        message: `You want to ${value} this account!`,
        buttons: [
          {
            label: 'Yes',
            onClick: () => handleStatus(true)
          },
          {
            label: 'No'
          }
        ]
      });
    } else if (value == 'reject') {
      confirmAlert({
        title: 'Are you sure?',
        message: `You want to ${value} this account!`,
        buttons: [
          {
            label: 'Yes',
            onClick: () => handleStatus(false)
          },
          {
            label: 'No'
          }
        ]
      });
    }
  };

  return (
    <>
      <Button
        style={{ width: '25px' }}
        size="small"
        variant="contained"
        color="error"
        onClick={() => submit('reject')}
      >
        Cancel
      </Button>
      <Button onClick={() => submit('approve')} size="small" variant="contained" color="success">
        Approve
      </Button>
    </>
  );
}
