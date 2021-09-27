export type DefaultStateType = {
  loading: boolean;
  hasError: boolean;
  error: string;
};

export type DefaultPaginationStateType<T> = DefaultStateType & {
  page: number;
  list: T[];
};

export type ErrorPayload = {
  error: string;
};
