import styled from "styled-components";
import { motion } from "framer-motion";

export const ModalContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const Modal = styled(motion.div)`
  padding: 10px;
  border-radius: 5px;
  position: relative;
  background: white;
  max-width: 380px;
  text-align: center;
  background: ${({ theme }) => theme.bg2};

  h5 {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.color};
    font-size: 22px;
  }

  section {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }

  div {
    width: 100px;
    height: 100px;
    cursor: pointer;

    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: 0.3s ease;
  }

  img:hover {
    opacity: 0.9;
    transform: scale(1.1);
  }

  @media (max-width: 500px) {
    padding: 5px;
    margin: 5px;
  }
`;

export const CloseIcon = styled.span`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  font-size: 20px;

  color: ${({ theme }) => theme.accent};
`;
