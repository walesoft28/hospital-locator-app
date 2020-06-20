import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import { NavLink } from 'react-router-dom';



interface Props {
    children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    textColor: {
      color: 'white',
      textDecorationLine: 'none',
    },
  }),
);

function ScrollTop(props: Props) {
    const { children } = props;
    const classes = useStyles();

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
        '#back-to-top-anchor',
      );
  
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
         {children}
        </div>
      </Zoom>
    );
  }
 
const NavBar: React.SFC = () => {
    const classes = useStyles();
    return ( 
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 5}}>
            <NavLink to="/" className={classes.textColor}>Hospital Locator App</NavLink>
          </Typography>
          <Button className={classes.textColor} style={{flexGrow: 1}}>
            <NavLink to="/history" className={classes.textColor}>History</NavLink>
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" /> 
         <ScrollTop>
            <Fab color="secondary" size="large" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
            </Fab>
        </ScrollTop>  
    </React.Fragment>
     );
}
 
export default NavBar;