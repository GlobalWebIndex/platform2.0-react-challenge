import { useEffect, useState, type PropsWithChildren } from 'react';

import Modal from 'components/parts/Modal';
import List from 'components/parts/List';
import Image from 'components/parts/Image';
import Api from 'data/api';

import { useData } from 'hooks';
import Cat from 'types';
import Styled from './styled';

type Props = {
  selectedImage: Cat.Image | null;
  onSelectImage: (image: Cat.Image) => void;
} & PropsWithChildren;

function BreedList(props: Props) {
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

  const handleSelectImage = (item: Cat.Image) => {
    setIsImageListVisible(false);
    props.onSelectImage(item);
  };

  useEffect(() => {
    if (props.selectedImage?.id === '' && images.length > 0) {
      setIsImageListVisible(true);
    }
  }, [props.selectedImage, images]);

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
              onSelectItem={handleSelectImage}
              onRenderItemContent={(props) => <Image url={props.url} />}
            />
          )}
        </Styled.BreedList>
      </Modal>
      {props.children}
    </>
  ) : null;
}

export default BreedList;
