import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';


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

function Search() {
    const classes = useStyles();
    
    const [searchText, setSearchText] = useState<string>('');
    const [radius, setRadius] = useState<number>(15);

    
   const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
            
  }

  const onRadiusChange = (e: React.ChangeEvent<{
    name?: string | undefined;
    value: number;
}>) => {
    setRadius(e.target.value);
  }

  return (
    <div>
        <Grid container spacing={1}>
            <Grid item xs={9}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField 
                      id="outlined-search" 
                      label="Search Hospitals" 
                      variant="outlined" 
                      name="searchText"
                      value={searchText}
                      onChange={onTextChange}
                    />
                </form>
            </Grid>
            <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="outlined-label">Radius</InputLabel>
                <Select
                    id="geo-fencing-radius"
                    label="Radius"
                    value={radius}
                >
                <MenuItem value={5}>5 km</MenuItem>
                <MenuItem value={10}>10 km</MenuItem>
                <MenuItem value={15}>15 km</MenuItem>
                </Select>
            </FormControl>
            </Grid>
        </Grid>
        
    
    </div>
  );
}

export default Search;