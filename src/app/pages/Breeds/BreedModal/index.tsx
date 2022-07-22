import React from 'react';
import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCatImages, selectError } from 'store/cats/selectors';
import { repoErrorText } from 'app/pages/HomePage';
import tw from 'tailwind-styled-components';
import { useHistory } from 'react-router-dom';
import { useCatSlice } from 'store/cats';

interface BreedModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const BreedModal: React.FC<BreedModalProps> = ({ isOpen, setIsOpen }) => {
  let panelRef = useRef(null);
  let history = useHistory();
  const { actions: catActions } = useCatSlice();

  const dispatch = useDispatch();

  const catImages = useSelector(selectCatImages);
  const error = useSelector(selectError);

  return (
    <Dialog
      initialFocus={panelRef}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel ref={panelRef} className="mx-auto rounded bg-white">
          {catImages.length > 0 ? (
            <div className="max-w-5xl container px-5 py-10 mx-auto lg:pt-12 lg:px-16">
              <div
                style={{ maxHeight: 700 }}
                className="container mx-auto space-y-2 overflow-y-scroll  lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-2"
              >
                {catImages.map(image => (
                  <div
                    key={image.id}
                    className="w-full relative group rounded hover:shadow-2xl"
                  >
                    <img
                      src={image.url}
                      alt={image.id}
                      className="cursor-pointer min-w-150 min-h-150 block object-cover object-center w-full h-full rounded-lg"
                      onClick={() => {
                        dispatch(catActions.selectBreed(null));
                        history.push(`/?catImageId=${image.id}`);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <ErrorText>{repoErrorText(error)}</ErrorText>
          ) : null}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BreedModal;

const ErrorText = tw.span`
  color:red;
`;
