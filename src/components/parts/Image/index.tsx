import { useEffect, useState } from 'react';

import Styled from './styled';

type Props = {
  ['data-test']?: string;
  url: string;
  width?: number;
  height?: number;
};

function Image(props: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [props.url]);

  return props.width && props.height ? (
    <Styled.Figure role="img" width={props.width} height={props.height}>
      <img
        data-test={props['data-test']}
        src={props.url}
        alt="A cute cat!"
        onLoad={() => setIsLoaded(true)}
      />
      <Styled.Skeleton isVisible={!isLoaded} />
    </Styled.Figure>
  ) : (
    <>
      {/* It's not gonna be a performance issue 
          as the browser caches images */}
      <img
        style={{ width: 0, height: 0 }}
        src={props.url}
        alt="A cute cat!"
        onLoad={() => setIsLoaded(true)}
      />
      <Styled.Image url={props.url} />
      <Styled.Skeleton isVisible={!isLoaded} />
    </>
  );
}

export default Image;
