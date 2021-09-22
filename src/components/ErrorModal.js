import styled from "@emotion/styled";
import { Modal } from "semantic-ui-react";

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const modalStyles = {
  width: 300,
  height: 250,
  padding: 15,
};

export default function ErrorModal({ active }) {
  return (
    <Modal
      open={active}
      style={modalStyles}
      content={
        <ModalContent>
          <h3>Error</h3>
          <p>Please reload the page</p>
        </ModalContent>
      }
    />
  );
}
