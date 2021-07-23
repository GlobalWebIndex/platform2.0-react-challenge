import React from "react";
import { useCallback, useState } from "react";

interface IError {
  message?: string;
  type?: string;
}
const _error: IError = {};
export const ErrorContext = React.createContext({
  error: _error,
  addNotification: (_error: IError) => {},
});

const ErrorProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<IError>({});

  const addError = (message?: string, type?: string) =>
    setError({ message, type });

  const contextValue = {
    error,
    addNotification: useCallback(
      (error: IError) => addError(error.message, error.type),
      []
    ),
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
