import { useGet, useMutate } from "restful-react";

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
