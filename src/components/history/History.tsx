import React, { useState, useEffect } from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import firebase from '../config/firebase-config';

import HistoryResults from './HistoryResult';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%',
        marginTop: 20,
        padding: 20,
        height: 100,
        textAlign: 'center',
      },
  }),
);

function History() {
  const classes = useStyles();

  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    fetchPlaces();
  }, [])

  const fetchPlaces = async () => {
      const db = firebase.firestore();
      db.collection("Places")
        .onSnapshot((data) => {
            setPlaces(data.docs.map(doc => ({...doc.data()})));
        })
  }

  console.log(places)
  return (
    <div>
        <div className={classes.root}>
            <Typography variant="h5" gutterBottom>
                View your search history below!
            </Typography>
        </div>
    {places.map(place => <HistoryResults {...place} />)}
    </div>
  );
}
 
export default History;