import React from 'react';
import useCatLoverApp from "../../hooks/useCatLoverApp"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const Catbreedlist = (data: any) => {
  const { breedsList, setSelectedBreed, selectedBreed } = useCatLoverApp()

  let cartsUnique: any = breedsList.filter(function (item: any, index: any) {
    return breedsList.indexOf(item) >= index;
  });
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: "no",
    name: '',
  });

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    // setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setSelectedBreed(event.target.value)
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name as string]: event.target.value,
    }));
  };
  return (
    <form className={classes.root} autoComplete="off">
        {cartsUnique.length>0?
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          BREEDS
        </InputLabel>
        <Select
          value={selectedBreed}
          onChange={handleChange}
          labelWidth={labelWidth}
          inputProps={{
            name: 'cat',
            id: 'outlined-age-simple',
          }}
        >
          
          <MenuItem value="no">
            <em>Select a Breed</em>
          </MenuItem>
          {cartsUnique.map((breed: any) => {
            return <MenuItem key={breed.id} value={breed.id}>{breed.name}</MenuItem>
          })}
        </Select>
        </FormControl>:null}
     
    </form>
  );
};


export default Catbreedlist