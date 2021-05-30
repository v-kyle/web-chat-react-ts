import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footerBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: '100%',
    background: 'orange',
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerBar}>
      Footer
    </div>
  );
};

export default Footer;
