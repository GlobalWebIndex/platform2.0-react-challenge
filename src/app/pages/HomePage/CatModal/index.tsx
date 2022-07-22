import * as React from 'react';
import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCat } from 'store/cats/selectors';
import toast from 'react-hot-toast';
import tw from 'tailwind-styled-components';
import { useCatSlice } from 'store/cats';
import { useTranslation } from 'react-i18next';
import { messages } from '../../../messages';

interface CatModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function makeShareLink(catImageId: string): string {
  return `${window.location.protocol}//${window.location.host}?catImageId=${catImageId}`;
}

const CatModal: React.FC<CatModalProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

  let markFavoriteButtonRef = useRef(null);
  const { actions: catActions } = useCatSlice();

  const catImage = useSelector(selectCat);
  const dispatch = useDispatch();

  return (
    <Dialog
      initialFocus={markFavoriteButtonRef}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      {catImage && (
        <>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
              <div
                style={{ minWidth: 400 }}
                className="bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  style={{ minHeight: 300, minWidth: 200 }}
                  className="p-8 rounded-t-lg mx-auto"
                  src={catImage.url}
                  alt={catImage.id}
                />

                <div className="px-5 pb-5">
                  <div className="flex flex-row justify-between space-between text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {t(messages.breed())} :
                    {catImage &&
                    catImage.breeds &&
                    catImage.breeds.length > 0 ? (
                      <div className="tracking-tight  dark:text-white">
                        {'            '}
                        {catImage.breeds[0].name}
                      </div>
                    ) : (
                      <div className="tracking-tight  dark:text-white">
                        {t(messages.notAvailable())}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row w-full mt-4">
                    <div className="relative w-11/12">
                      <ShareLinkInput
                        type="text"
                        id="input-group-1"
                        value={makeShareLink(catImage.id)}
                        readOnly
                      />
                    </div>
                    <div
                      onClick={() => {
                        // The following code will only work on localhost or https domains
                        // it is a limitation for the new browsers, we should if the functionality
                        // is supported and if not show the text field only
                        navigator.clipboard.writeText(
                          makeShareLink(catImage.id),
                        );
                        toast.success(t(messages.textCopied()));
                      }}
                      className="flex w-1/12	ml-2 cursor-pointer justify-center items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex mt-6 justify-between items-center">
                    <FavoriteButton
                      ref={markFavoriteButtonRef}
                      onClick={() => {
                        dispatch(catActions.setFavoriteCat(catImage));
                      }}
                    >
                      {t(messages.markFavorite())}
                    </FavoriteButton>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </>
      )}
    </Dialog>
  );
};

export default CatModal;

const FavoriteButton = tw.button`text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`;

const ShareLinkInput = tw.input`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
  focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;
