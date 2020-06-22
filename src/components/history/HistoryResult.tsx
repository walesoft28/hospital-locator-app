import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
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
    marginTop: 20
  }
});

interface HistoryResultsProps {
  location: string;
  date: string;
  radius: number;
  target: any;
}

function HistoryResults(props: HistoryResultsProps){
    const classes = useStyles();

    const {location, date, radius, target} = props;

  return (
    <Grid container className={classes.spaceTop}>
      <Grid item xs={12}>
        <Card className={classes.root}>
        <CardActionArea  onClick={() => target(location, radius)}>
            <CardContent>
            <Typography variant="h5" component="h2">
                {location}
            </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {date}
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
    </Grid>
  </Grid>
  );
}

export default HistoryResults;