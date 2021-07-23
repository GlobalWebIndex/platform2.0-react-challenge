import { useContext } from "react";
import { ErrorContext } from "../context/ErrorProvider";

const useNotification = () => {
  const { error, addNotification } = useContext(ErrorContext);
  return { error, addNotification };
};

export default useNotification;
