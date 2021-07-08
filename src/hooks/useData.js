import { useGet, useMutate } from "restful-react";
import { ENDPOINTS } from "../constants";

export const useAPI = (path) => {
  const { data, loading, error, refetch } = useGet({
    path
  });

  return [loading, data, error, refetch];
};

export const usePostMutation = (path) => {
  const { mutate, loading, error } = useMutate({
    verb: "POST",
    path
  });
  return [loading, error, mutate];
};

export const useDeleteMutation = (path) => {
  const { mutate, loading, error } = useMutate({
    verb: "DELETE",
    path
  });
  return [loading, error, mutate];
};

/** Specialized queries */

export const useFavourite = ({ image_id: imageId }) => {
  const [loading, error, post] = usePostMutation(
    ENDPOINTS.POST_ONE_FAVOURITE()
  );
  const favourite = () =>
    post({ image_id: imageId, sub_id: localStorage.SUB_ID });
  return [loading, error, favourite];
};

export const useUnfavourite = ({ favourite_id: favouriteId }) => {
  const [loading, error, del] = useDeleteMutation(
    ENDPOINTS.DELETE_ONE_FAVOURITE({ favourite_id: favouriteId })
  );
  const unfavourite = () => del();
  return [loading, error, unfavourite];
};
