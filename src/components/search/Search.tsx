import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import firebase from '../config/firebase-config';

import LocationResults from '../location-results/LocationResults';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(7),
        width: '100%'
      },
    },
    formControl: {
        marginTop: theme.spacing(7),
        width: '100%',
      },
    fullWidth: {
      width: '100%',
    },
  }),
);

interface Location {
  name: string;
  formatted_address: string;
  business_status: string
}

function Search() {
    const classes = useStyles();
        
    const [searchText, setSearchText] = useState<string>('');
    const [radius, setRadius] = useState<number | any>(15000);
    const [category, setCategory] = useState<string>('hospital');
    const [submit, setSubmit] = useState<boolean>(false);
    const [query, setQuery] = useState<string>(searchText);
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const [locations, setLocations] = useState<any>([]);
    
    const PLACE = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
    const PROXY = "https://secret-atoll-96241.herokuapp.com/";
    const RADIUS = radius;
    const SEARCH_QUERY = query;
    const TYPE = category;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmit(prev => !prev);
      if (searchText !== '') setLoading(true);
      setStatus(false);
      console.log('submitted');
      setQuery(searchText);
      saveToDatabase();
      // setSearchText('');
    }
   
    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value); 
    }

    const handleRadiusChange = (e: ChangeEvent<HTMLInputElement>) => {
      setRadius(e.target.value);   
    }

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCategory(e.target.value);
    }

    const saveToDatabase = () => {
      const db = firebase.firestore();
      if (searchText !== '') {
        db.collection("Places").add({
          location: searchText, 
          date: new Date().toLocaleDateString(), 
          radius: radius,
          category: category
        });
        console.log('Record Added Successfully');
      }
    }

    const getPlaces = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          // console.log(lat, long)
          axios.get(`${PROXY}${PLACE}query=${SEARCH_QUERY}&location=${lat}, ${long}&radius=${RADIUS}&type=${TYPE}&key=${process.env.REACT_APP_PLACES_API_KEY}`)
            .then(response => {
            // console.log(response);
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
      if(query){
        getPlaces();
      } else { setLocations([])}
    }, [submit])

  return (
    <div>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <TextField 
                  id="outlined-search" 
                  label="Search hospitals, clinics, pharmacy .... " 
                  variant="outlined" 
                  name="searchText"
                  value={searchText}
                  onChange={handleTextChange}
                  className={classes.fullWidth}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={4} md={2}>
                <TextField
                   id="standard-select-radius"
                   select
                   variant="outlined"
                   label="Raduis"
                   value={radius}
                   onChange={handleRadiusChange}
                   className={classes.fullWidth}
                 >
                  <MenuItem value={5000}>5 Km</MenuItem>
                  <MenuItem value={10000}>10 Km</MenuItem>
                  <MenuItem value={15000}>15 Km</MenuItem>
                  <MenuItem value={20000}>20 Km</MenuItem>
                 </TextField>
              </Grid>  
              <Grid item xs={8} md={4}>
                <TextField
                   id="standard-select-category"
                   select
                   variant="outlined"
                   label="Choose Catergory"
                   value={category}
                   onChange={handleCategoryChange}
                   className={classes.fullWidth}
                 >
                  <MenuItem value="hospital">Hospitals</MenuItem>
                  <MenuItem value="clinic">Clinics</MenuItem>
                  <MenuItem value="pharmacy">Pharmacy</MenuItem>
                  <MenuItem value="medical office">Medical Offices</MenuItem>
                 </TextField>
              </Grid>  
          </Grid>         
        </form>

        {status ? (<div><h4 style={{textAlign: 'center'}}>Oops!......there are no search results for your query!</h4></div>) : (null)}

        {loading ? ( <div className={classes.root} style={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress color="secondary" />
        </div>) : (null)}
       
        { query && locations.length > 0 ? (locations.map((location: Location) => {
            return <LocationResults {...location}/>
    })) : (null)}


    </div>
  );

}

export default Search;