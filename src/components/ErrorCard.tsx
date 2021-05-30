import React from 'react';
import useTypedSelector from '../hooks/useTypedSelector';

const styles = {
  width: '300px',
  height: '50px',
  background: '#ffa0a0',
  fontWeight: 700,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const ErrorCard: React.FC = () => {
  const error = useTypedSelector((state) => state.errorR.value);
  return (
    <>
      {error ? <div style={styles}>{error}</div> : ''}
    </>
  );
};

export default ErrorCard;
