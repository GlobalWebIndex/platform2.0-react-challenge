import { repoErrorText, repoSuccessText } from 'app/pages/HomePage';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useBreedSlice } from 'store/breeds';
import { selectBreedsError } from 'store/breeds/selectors';
import { useCatSlice } from 'store/cats';
import { selectError, selectSuccess } from 'store/cats/selectors';

function useToastNotification() {
  const error = useSelector(selectError);
  const breedsError = useSelector(selectBreedsError);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions: catActions } = useCatSlice();
  const { actions: breedActions } = useBreedSlice();

  const success = useSelector(selectSuccess);

  useEffect(() => {
    if (error) {
      toast.error(t(repoErrorText(error)()));
      dispatch(catActions.catApiError(null));
    }

    if (breedsError) {
      toast.error(t(repoErrorText(breedsError)()));
      dispatch(breedActions.breedsApiError(null));
    }

    if (success) {
      toast.success(t(repoSuccessText(success)()));
      dispatch(catActions.catApiSuccess(null));
    }
  }, [breedActions, breedsError, catActions, dispatch, error, success, t]);
}

export default useToastNotification;
