import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { AppContext, AppContextType } from './AppContext';
import { generateUniqueKey } from '../helpers';

const Breeds: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const appContext: AppContextType = useContext(AppContext);
  const { breedOptions, toggleModal } = appContext;

  const openModalForBreed = (breed: string) => {
    toggleModal(true);
    navigate(`/breeds/${breed}`);
  };

  useEffect(() => {
    if (id) openModalForBreed(id);
  }, [id]);

  return (
    <Box p={5}>
      <Grid container>
        {breedOptions.map(({ label, value }, i: number) => (
          <Grid key={generateUniqueKey(i.toString())} xs={4} md={4} item>
            <Button onClick={() => openModalForBreed(value)}>{label}</Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Breeds;
