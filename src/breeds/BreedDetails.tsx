import React from 'react';
import {
  Container, Heading, Link, List, ListItem, SimpleGrid, Text, HStack,
} from '@chakra-ui/react';
import { Breed } from '../common/models';
import { Empty, Loader } from '../common/components';

// Ugly but works
const validateProperty = (property: string|number): string|number => (
  (property !== null && property !== undefined && property !== '')
    ? property
    : ' N/A');

interface Props {
    breeds?: Breed[]; // Some images don't have breeds property!
    loading?: boolean;
    error?: Error|null;
}

export const BreedDetails = ({ breeds = [], loading = false, error = null }: Props): JSX.Element => (
  <>
    {/* Loading */}
    {
        loading && <Loader />
    }
    {/* Error */}
    {
        error && error.message // For demo purposes only this error handling
    }
    {/* Stats */}
    {
         breeds.length === 0
           ? <Empty>No available information about breed.</Empty>
           : breeds.map((breed) => (
             <Container key={breed.id} centerContent maxW="container.lg">
               {/* Name */}
               <Heading>{breed.name}</Heading>
               {/* Links */}
               <HStack mt={2}>
                 {
                breed?.wikipedia_url && (
                <Link color="blue" href={breed.wikipedia_url} isExternal>
                  Wikipedia
                </Link>
                )
              }
                 {
                breed?.vetstreet_url && (
                <Link mt={2} color="blue" href={breed.vetstreet_url} isExternal>
                  VET Street
                </Link>
                )
              }
               </HStack>
               {/* Description */}
               <Text mt={2}>{breed.description}</Text>
               {/* Attributes */}
               <SimpleGrid mt={3} columns={2} spacing={10}>
                 <List spacing={3}>
                   <ListItem>
                     <strong>Weight : </strong>
                     {`${validateProperty(breed?.weight.metric)} kg, 
                  ${validateProperty(breed?.weight?.metric)} lbs`}
                   </ListItem>
                   <ListItem>
                     <strong>Suppressed Tail: </strong>
                     {`${validateProperty(breed?.suppressed_tail)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Temperament: </strong>
                     {`${validateProperty(breed?.temperament)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Origin: </strong>
                     {`${validateProperty(breed?.origin)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Country: </strong>
                     {`${validateProperty(breed?.country_code)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Lifespan: </strong>
                     {`${validateProperty(breed?.life_span)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Indoor: </strong>
                     {`${validateProperty(breed?.indoor)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Lap: </strong>
                     {`${validateProperty(breed?.lap)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Alt Names: </strong>
                     {`${validateProperty(breed?.alt_names)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Adaptability: </strong>
                     {`${validateProperty(breed?.adaptability)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Affection: </strong>
                     {`${validateProperty(breed?.affection_level)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Child Friendly: </strong>
                     {`${validateProperty(breed?.child_friendly)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Dog Friendly: </strong>
                     {`${validateProperty(breed?.dog_friendly)}`}
                   </ListItem>
                 </List>
                 <List spacing={3}>
                   <ListItem>
                     <strong>Energy: </strong>
                     {`${validateProperty(breed?.energy_level)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Grooming: </strong>
                     {`${validateProperty(breed?.grooming)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Health Issues: </strong>
                     {`${validateProperty(breed?.health_issues)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Intelligence: </strong>
                     {`${validateProperty(breed?.intelligence)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Shedding: </strong>
                     {`${validateProperty(breed?.shedding_level)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Social: </strong>
                     {`${validateProperty(breed?.social_needs)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Friendly: </strong>
                     {`${validateProperty(breed?.stranger_friendly)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Vocal: </strong>
                     {`${validateProperty(breed?.vocalisation)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Experimental: </strong>
                     {`${validateProperty(breed?.experimental)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Hairless: </strong>
                     {`${validateProperty(breed?.hairless)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Natural: </strong>
                     {`${validateProperty(breed?.natural)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Rare: </strong>
                     {`${validateProperty(breed?.rare)}`}
                   </ListItem>
                   <ListItem>
                     <strong>Rex: </strong>
                     {`${validateProperty(breed?.rex)}`}
                   </ListItem>
                 </List>
               </SimpleGrid>
             </Container>
           ))
    }
  </>
);
