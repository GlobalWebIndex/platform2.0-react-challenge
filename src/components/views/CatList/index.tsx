import { type PropsWithChildren, useEffect, useState } from 'react';

import List from 'components/parts/List';
import Image from 'components/parts/Image';
import Api from 'data/api';
import type Cat from 'types';
import Styled from './styled';
import { useNavigate } from 'react-router-dom';

interface Props extends PropsWithChildren {
  onSelectItem: (item: Cat.Image) => void;
}

function CatList(props: Props) {
  const navigate = useNavigate();
  const [imageList, setImageList] = useState<Cat.Image[]>([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    if (showMore) {
      Api.search().then(
        (result) => setImageList(imageList.concat(result)),
        console.error
      );
      setShowMore(false);
    }
  }, [showMore, imageList]);

  return (
    <>
      <List<Cat.Image>
        data={imageList}
        onSelectItem={(item) => {
          props.onSelectItem(item);
          navigate(`/images/${item.id}`);
        }}
        onRenderItemContent={(item) => <Image url={item.url} />}
      />
      <Styled.Pane>
        <Styled.Button
          role="button"
          data-test="show-more"
          onClick={() => setShowMore(true)}
        >
          🐈 &nbsp; More kitties! &nbsp; 🐈
        </Styled.Button>
      </Styled.Pane>
      {props.children}
    </>
  );
}

export default CatList;
