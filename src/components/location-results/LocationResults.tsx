import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  spaceTop: {
    marginTop: 30
  }
});

interface LocationProps {
  name: string;
  formatted_address: string;
  business_status: string
}

function LocationResults(props: LocationProps){
  const classes = useStyles();
  const {name, formatted_address, business_status} = props;
  return (
      <Grid container className={classes.spaceTop}>
      <Grid item xs={12}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {formatted_address}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{business_status}</Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
  );
}

export default LocationResults;