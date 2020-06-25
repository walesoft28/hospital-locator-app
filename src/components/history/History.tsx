import React, { useState, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import firebase from '../config/firebase-config';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import HistoryResults from './HistoryResult';
import NavBar from '../navbar/NavBar';
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
      loader: {
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
      button: {
        width: '100%',
        marginTop: 20,
        textAlign: 'center',
      },
      textColor: {
        color: 'white',
        textDecorationLine: 'none',
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
  const [category, setCategory] = useState<string>('hospital');
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [locations, setLocations] = useState<any>([]);
  const [initLoad, setInitLoad] = useState<boolean>(true);

  const PLACE = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
  const PROXY = "https://secret-atoll-96241.herokuapp.com/";
  const RADIUS = range;
  const SEARCH_QUERY = target;
  const TYPE = category;

  const handleClick = (target: string, range: number, category: string) => {
      setTarget(target);
      setRange(range);
      setCategory(category);
      setLoading(true);
      setStatus(false);
  }

  const getPlaces = () => {
    axios.get(`${PROXY}${PLACE}query=${SEARCH_QUERY}&radius=${RADIUS}&type=${TYPE}&key=${process.env.REACT_APP_PLACES_API_KEY}`)
      .then(response => {
      if (response.data.results.length > 0) {
        setLoading(false);
      } else {
        setLoading(false);
        setStatus(true);
      }
      setLocations(response.data.results);
    })
    .catch(err => console.log(err))
};

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
            setInitLoad(false);
        })
  }

  return (
    <div>
      <NavBar />
       {initLoad ? ( <div className={classes.loader} >
          <CircularProgress color="secondary" />
        </div>) : (null)}
        {target && locations.length > 0 ? (<div><NavLink to="/" className={classes.textColor} ><Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          startIcon={<SearchIcon />}
        >Go to Search</Button></NavLink> {locations.map((location: Location) => {
            return <LocationResults {...location}/>
    })}</div>) : (<div className={classes.root}>
                <Typography variant="h5" gutterBottom>
                    View your search history below!
                </Typography>
                {places.map(place => <HistoryResults target={handleClick} {...place} />)}
            </div>
       )}

        {loading ? ( <div className={classes.loader} >
          <CircularProgress color="secondary" />
        </div>) : (null)}

        {status ? (<div><h4 style={{textAlign: 'center'}}>Oops!......there are no search results for your query!</h4></div>) : (null)}
    
    </div>
  );
}
 
export default History;