import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteMulUsers } from '../../../services/api';
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};

export default function UserListToolbar({
  selectUser,
  numSelected,
  filterName,
  onFilterName,
  setSelected
}) {
  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = async () => {
    console.log('delted userlist', selectUser);
    try {
      const response = await deleteMulUsers(selectUser);
      console.log(response);
      setSelected([]);
      // setIsDelete(true);
    } catch (e) {
      console.error(e);
    }
  };
  const submit = () => {
    confirmAlert({
      title: 'Are you sure?',
      message: `You want to delete these accounts!`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete()
        },
        {
          label: 'No'
        }
      ]
    });
  };

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {
        numSelected > 0 && (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        )
        //  (
        //   <SearchStyle
        //     value={filterName}
        //     onChange={onFilterName}
        //     placeholder="Search user..."
        //     startAdornment={
        //       <InputAdornment position="start">
        //         <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
        //       </InputAdornment>
        //     }
        //   />
        // )
      }

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={submit}>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
