import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from 'components/parts/Modal';
import List from 'components/parts/List';
import Api from 'data/api';

import { useData } from 'hooks';
import Cat from 'types';
import Styled from './styled';

type Props = {
  onSelectImage: (image: Cat.Image) => void;
};

function BreedList(props: Props) {
  const navigate = useNavigate();
  const [isImageListVisible, setIsImageListVisible] = useState(false);
  const [images, setImages] = useState<Cat.Image[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<Cat.Breed>();
  const [hasData, breeds] = useData<Cat.Breed[]>(
    () => Api.breeds.getAll(),
    console.error
  );

  const handleSelectItem = (breed: Cat.Breed) => {
    setSelectedBreed(breed);
    Api.breeds.getImages(breed.id).then((images) => {
      setImages(images);
      setIsImageListVisible(true);
    }, console.error);
  };

  return hasData ? (
    <>
      <Styled.Table role="table">
        <Styled.TableRow>
          <Styled.TableCell role="cell" width="30%">
            Name
          </Styled.TableCell>
          <Styled.TableCell role="cell" width="30%">
            Origin
          </Styled.TableCell>
        </Styled.TableRow>
        {breeds.map((item) => (
          <Styled.TableRow
            key={item.id}
            data-test="table-row"
            role="row"
            onClick={() => handleSelectItem(item)}
          >
            <Styled.TableCell role="cell" width="30%">
              {item.name}
            </Styled.TableCell>
            <Styled.TableCell role="cell" width="30%">
              {item.origin}
            </Styled.TableCell>
            <Styled.TableCell role="cell" width="40%">
              <Styled.Image role="img" url={item.image?.url} small />
            </Styled.TableCell>
          </Styled.TableRow>
        ))}
      </Styled.Table>
      <Modal
        id="cat-breed-images"
        data-test="breed-images-modal"
        isVisible={isImageListVisible}
        onClose={() => setIsImageListVisible(false)}
      >
        <Styled.Title>{selectedBreed?.name}</Styled.Title>
        <Styled.BreedList>
          {images.length > 0 && (
            <List<Cat.Image>
              data={images}
              onSelectItem={props.onSelectImage}
              onRenderItemContent={(props) => (
                <Styled.Image
                  role="img"
                  url={props.url}
                  onClick={() => navigate(`/images/${props.id}`)}
                />
              )}
            />
          )}
        </Styled.BreedList>
      </Modal>
    </>
  ) : null;
}

export default BreedList;
