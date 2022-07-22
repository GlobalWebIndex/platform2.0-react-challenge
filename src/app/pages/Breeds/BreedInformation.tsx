import * as React from 'react';
import { Breed } from 'store/breeds/types';
import Rating from 'app/components/Rating';
import tw from 'tailwind-styled-components';

interface BreedInformationProps {
  breed: Breed;
}

const catPerks = {
  experimental: 'Expiremental',
  rex: 'Rex',
  natural: 'Natural',
  rare: 'Rare',
  hairless: 'Hairless',
  suppressed_tail: 'Suppressed Tail',
  short_legs: 'Short Legs',
  hypoallergenic: 'Hypoallergenic',
};

function makePerks(breed: Breed): string {
  const perks: string[] = [];
  Object.keys(catPerks).forEach(perk => {
    if (breed[perk]) {
      perks.push(catPerks[perk]);
    }
  });

  if (perks.length === 0) {
    return `None`;
  }
  return perks.join(', ');
}

const BreedInformation: React.FC<BreedInformationProps> = ({ breed }) => {
  return (
    <div>
      <div>{breed.description}</div>
      <div className="flex justify-between mt-3">
        <div className="flex flex-row justify-center items-center">
          <img
            className="h-5 w-8"
            src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${breed.country_code.toLowerCase()}.svg`}
            alt={breed.country_code}
          />
          <span className="ml-2"> {breed.origin}</span>
        </div>
        <div>
          <a
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            href={breed.wikipedia_url}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
            }}
            target="_blank"
            rel="noreferrer"
          >
            Wikipedia Information
          </a>
        </div>
      </div>

      <div className="mt-3">
        <span className="font-bold">Temperament:</span> {breed.temperament}
      </div>
      <div className="mt-3">
        <span className="font-bold">Perks:</span> {makePerks(breed)}
      </div>
      <div className="mt-5 justify-center items-center grid grid-cols-3 gap-4">
        <RatingContainer className="font-bold">
          Affection Level
          <Rating stars={breed.affection_level} />
        </RatingContainer>
        <RatingContainer className="font-bold">
          Adaptability
          <Rating stars={breed.adaptability} />
        </RatingContainer>
        <RatingContainer className="font-bold">
          Child Friendly
          <Rating stars={breed.child_friendly} />
        </RatingContainer>
        <RatingContainer className="font-bold">
          Dog Friendly
          <Rating stars={breed.dog_friendly} />
        </RatingContainer>
        <RatingContainer className="font-bold">
          Energy Level
          <Rating stars={breed.energy_level} />
        </RatingContainer>
        <RatingContainer className="font-bold">
          Grooming
          <Rating stars={breed.grooming} />
        </RatingContainer>
        <RatingContainer className="font-bold">
          Health Issues
          <Rating stars={breed.health_issues} />
        </RatingContainer>
        <RatingContainer className="font-bold">
          Intelligence
          <Rating stars={breed.intelligence} />
        </RatingContainer>
        <RatingContainer className="font-bold">
          Shedding Level
          <Rating stars={breed.shedding_level} />
        </RatingContainer>
        <RatingContainer className="font-bold">
          Social Needs
          <Rating stars={breed.social_needs} />
        </RatingContainer>
        <RatingContainer className="font-bold">
          Stranger Friendly
          <Rating stars={breed.stranger_friendly} />
        </RatingContainer>
        <RatingContainer className="font-bold">
          Vocalisation
          <Rating stars={breed.vocalisation} />
        </RatingContainer>
      </div>
    </div>
  );
};

export default BreedInformation;

const RatingContainer = tw.div`flex flex-col justify-center items-center font-bold`;
