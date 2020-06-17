import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

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
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [locations, setLocations] = useState<any>([]);
    
    const PLACE = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
    const PROXY = "https://secret-atoll-96241.herokuapp.com/";
    const RADIUS = radius;
    const SEARCH_QUERY = searchText;
    const TYPE = 'hospital';

    console.log(SEARCH_QUERY);
    console.log(RADIUS); 

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    }

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);    
    }

    const handleRadiusChange = (event: ChangeEvent<HTMLInputElement>) => {
      setRadius(event.target.value);   
    }

    useEffect(() => {      
      if(searchText !== ''){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            console.log(lat, long)
            axios.get(`${PROXY}${PLACE}query=${SEARCH_QUERY}&location=${lat},${long}&radius=${RADIUS}&type=${TYPE}&key=${process.env.REACT_APP_PLACES_API_KEY}`)
              .then(response => {
              console.log(response);
              setLocations(response.data.results)
              setIsLoaded(true);
            })
          });
        }
        
      }
    }, [searchText, radius])

  return (
    <div>
        <Grid container spacing={1}>
            <Grid item xs={9}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField 
                      id="outlined-search" 
                      label="Search Hospitals" 
                      variant="outlined" 
                      name="searchText"
                      value={searchText}
                      onChange={handleTextChange}
                    />
                  </form>
            </Grid>
            <Grid item xs={3}>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                   id="standard-select-radius"
                   select
                   variant="outlined"
                   label="Raduis in KM"
                   value={radius}
                   onChange={handleRadiusChange}
                 >
                  <MenuItem value={5000}>5 Km</MenuItem>
                  <MenuItem value={10000}>10 Km</MenuItem>
                  <MenuItem value={15000}>15 Km</MenuItem>
                  <MenuItem value={20000}>20 Km</MenuItem>
                 </TextField>
              </form>
            </Grid>
        </Grid>

        { isLoaded ? (locations.map((location: Location) => {
            return <LocationResults {...location}/>
    })) : (null) }

    </div>
  );
}

export default Search;