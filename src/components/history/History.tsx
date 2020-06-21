import React, { useState, useEffect } from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import firebase from '../config/firebase-config';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import HistoryResults from './HistoryResult';
import LocationResults from '../location-results/LocationResults';

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

interface Location {
    name: string;
    formatted_address: string;
    business_status: string
  }

function History() {
  const classes = useStyles();

  const [places, setPlaces] = useState<any[]>([]);

  

  const [target, setTarget] = useState<string | null>(null);
  const [range, setRange] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [locations, setLocations] = useState<any>([]);

  const PLACE = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
  const PROXY = "https://secret-atoll-96241.herokuapp.com/";
  const RADIUS = range;
  const SEARCH_QUERY = target;
  const TYPE = 'hospital';

  const handleClick = (target: string, range: number) => {
      setTarget(target);
      setRange(range);
      setLoading(true);
      setStatus(false);
  }

  console.log(target, range);


  const getPlaces = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          console.log(lat, long)
          axios.get(`${PROXY}${PLACE}query=${SEARCH_QUERY}&location=${lat}, ${long}&radius=${RADIUS}&type=${TYPE}&key=${process.env.REACT_APP_PLACES_API_KEY}`)
            .then(response => {
            console.log(response);
            if (response.data.results.length > 0) {
              setLoading(false);
            } else {
              setLoading(false);
              setStatus(true);
            }
            setLocations(response.data.results);
          })
          .catch(err => console.log(err))
        });
      }
    }

    useEffect(() => {      
      (() => {
          if(target){
              getPlaces();
          } else { }
      })(); 
    }, [target])

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
        {target && locations.length > 0 ? (locations.map((location: Location) => {
            return <LocationResults {...location}/>
    })) : (<div className={classes.root}>
                <Typography variant="h5" gutterBottom>
                    View your search history below!
                </Typography>
                {places.map(place => <HistoryResults target={handleClick} {...place} />)}
            </div>
       )}

        {loading ? ( <div className={classes.root} style={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress color="secondary" />
        </div>) : (null)}

        {status ? (<div><h4 style={{textAlign: 'center'}}>Oops!......there are no search results for your query!</h4></div>) : (null)}
    
    </div>
  );
}
 
export default History;