/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BreedDetailsProps } from '../../types';
import { generateUniqueKey } from '../../helpers';

const BreedDetails: React.FC<BreedDetailsProps> = ({ breed, url, padding }) => {
  const [measureSystem, toggleMeasureSystem] = useState<'metric' | 'imperial'>(
    'metric'
  );

  if (Object.keys(breed).length === 0) return null;

  const {
    description,
    temperament,
    origin,
    id,
    weight,
    life_span,
    affection_level,
    energy_level,
    intelligence,
    health_issues,
    dog_friendly,
    adaptability,
  } = breed;
  const { imperial, metric } = weight;
  const chips = temperament.split(', ');

  return (
    <Box p={padding}>
      <LazyLoadImage alt={url} src={url} effect="blur" style={{ width: '100%' }} />
      <Box>
        <List>
          <ListItem>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <p>
                id: <b>{id}</b>
              </p>
              <p>
                Origin: <em>{origin}</em>
              </p>
            </Box>
          </ListItem>
          <Divider />
          <ListItem>
            <p>{description}</p>
          </ListItem>
          <ListItem>
            <Box
              mb={3}
              sx={{ display: 'flex', flexWrap: 'wrap' }}
              style={{ gap: '2%', rowGap: '10px', width: '100%' }}
            >
              {chips?.map((value: string) => (
                <Chip key={generateUniqueKey(value)} label={value} />
              ))}
            </Box>
          </ListItem>

          <Divider />
          <ListItem>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <b>Weight: </b>
              <em>{measureSystem === 'metric' ? metric : imperial}</em>
              <FormControl>
                <RadioGroup
                  row
                  defaultValue={measureSystem === 'metric' ? 'metric' : 'imperial'}
                  name="radio-buttons-group"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    toggleMeasureSystem(event.target.value as 'metric' | 'imperial');
                  }}
                >
                  <FormControlLabel value="metric" control={<Radio />} label="kg" />
                  <FormControlLabel
                    value="imperial"
                    control={<Radio />}
                    label="lbs"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </ListItem>
          <ListItem>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <b>Avg Life Span: </b>
              <em>{life_span}</em>
              <span>years</span>
            </Box>
          </ListItem>
          <Divider />
          <ListItem>
            <List>
              <ListItem>
                <Typography component="legend">Affection Level</Typography>
                <Rating readOnly name="Affection Level" value={affection_level} />
              </ListItem>
              <ListItem>
                <Typography component="legend">Energy Level</Typography>
                <Rating readOnly name="Energy Level" value={energy_level} />
              </ListItem>
              <ListItem>
                <Typography component="legend">Intelligence</Typography>
                <Rating readOnly name="Intelligence" value={intelligence} />
              </ListItem>
              <ListItem>
                <Typography component="legend">Health Issues</Typography>
                <Rating readOnly name="Health Issues" value={health_issues} />
              </ListItem>
              <ListItem>
                <Typography component="legend">Dog Friendly</Typography>
                <Rating readOnly name="Dog Friendly" value={dog_friendly} />
              </ListItem>
              <ListItem>
                <Typography component="legend">Adaptability</Typography>
                <Rating readOnly name="Adaptability" value={adaptability} />
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default BreedDetails;
