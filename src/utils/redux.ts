import { DefaultStateType } from "../types/app";

const getLoadingState = (): DefaultStateType => ({
  loading: true,
  hasError: false,
  error: "",
});

const getSuccessState = (): DefaultStateType => ({
  loading: false,
  hasError: false,
  error: "",
});

const getFailureState = (error: string): DefaultStateType => ({
  loading: false,
  hasError: true,
  error,
});

export { getLoadingState, getSuccessState, getFailureState };
