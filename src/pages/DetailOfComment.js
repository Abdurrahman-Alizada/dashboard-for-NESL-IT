import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function DetailOfComment(props) {
  const handleBack = () => {
    props.setIsComment(false);
  };
  const { message, userId } = props;
  return (
    <>
      <ArrowBackIcon onClick={handleBack} style={{ marginBottom: '20px' }} />
      <div>{message}</div>
    </>
  );
}

export default DetailOfComment;
