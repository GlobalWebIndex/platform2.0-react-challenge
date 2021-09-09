import { Center, Image as ChakraImage, Skeleton } from '@chakra-ui/react';
import React, { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  boxSize?: string|number;
}

export const Image = ({ src, alt, boxSize = 60 } : ImageProps): JSX.Element => {
  const [isLoaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      { hasError || !src ? (
        <Center bg="tomato" boxSize={boxSize} color="white">
          Could not load :(
        </Center>
      ) : (
        <Skeleton isLoaded={isLoaded}>
          <ChakraImage
            onError={() => setHasError(true)}
            onLoad={() => {
              setLoaded(true);
            }}
            boxSize={boxSize}
            objectFit="cover"
            src={src}
            alt={alt}
          />
        </Skeleton>
      )}
    </>
  );
};
