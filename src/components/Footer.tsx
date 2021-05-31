import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  footerBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: '100%',
    background: blue[900],
    textAlign: 'center',
    color: 'white',
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerBar}>
      2021
    </div>
  );
};

export default Footer;
