import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import useErrorToast from "../hooks/useNotification";
import { AiFillCloseCircle } from "react-icons/ai";

const ErrorNotification: React.FC = () => {
  const { error } = useErrorToast();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error?.message !== undefined) {
      setShow(true);
    }
  }, [error]);

  if (!show) return <React.Fragment></React.Fragment>;
  return (
    <Alert className="alert-notification" variant={error.type}>
      <Alert.Heading className="text-center">
        Notification Message
      </Alert.Heading>
      <p className="text-center">{error.message}</p>
      <Button size="sm" variant="danger" onClick={() => setShow(false)}>
        <AiFillCloseCircle />
      </Button>
    </Alert>
  );
};

export default ErrorNotification;
