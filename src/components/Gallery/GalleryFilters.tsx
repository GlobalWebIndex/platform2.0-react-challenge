import React, { BaseSyntheticEvent, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import { Dropdown } from '../shared';
import { AppContext, AppContextType } from '../AppContext';
import { GalleryFilterProps } from '../../types';

const GalleryFilters: React.FC<GalleryFilterProps> = ({
  order,
  breed,
  category,
  type,
  setOrder,
  setBreed,
  setCategory,
  setType,
}) => {
  const appContext: AppContextType = useContext(AppContext);
  const { breedOptions, categoryOptions, orderOptions, typeOptions } = appContext;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
        <Dropdown
          filterLabel="Order"
          options={orderOptions}
          handleChange={(event: BaseSyntheticEvent) => setOrder(event.target.value)}
          active={order}
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <Dropdown
          filterLabel="Breed"
          options={breedOptions}
          handleChange={(event: BaseSyntheticEvent) => setBreed(event.target.value)}
          active={breed}
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <Dropdown
          filterLabel="Category"
          options={categoryOptions}
          handleChange={(event: BaseSyntheticEvent) =>
            setCategory(event.target.value.toString())
          }
          active={category}
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <Dropdown
          filterLabel="Type"
          options={typeOptions}
          handleChange={(event: BaseSyntheticEvent) => setType(event.target.value)}
          active={type}
        />
      </Grid>
    </Grid>
  );
};

export default GalleryFilters;
