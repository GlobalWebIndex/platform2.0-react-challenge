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
  display: flex;

  border-radius: 5px;
  overflow: hidden;
  text-align: center;
  position: relative;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.bg2};

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 5px;
  }
`;

export const CloseIcon = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.accent};
  font-size: 22px;
`;

export const ImageWrapper = styled.div`
  width: 300px;
  /* height: 300px; */

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    width: 380px;
  }
`;

export const Content = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 370px;
  h5 {
    font-size: 19px;
    margin-bottom: 10px;
  }
`;

export const InfoDiv = styled.div`
  width: 60%;
  margin: 0 auto;
`;
export const InfoItem = styled.div`
  display: flex;

  justify-content: space-between;
  margin-bottom: 4px;

  span {
    text-transform: capitalize;
  }

  span:last-child {
    font-weight: 500;
  }
`;

export const BreedsContainer = styled.div`
  padding: 20px 0;
  text-align: center;

  p {
    margin-bottom: 10px;
    font-weight: 500;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  span {
    padding: 5px 10px;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.accent};
    border-radius: 999px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  span:hover {
    opacity: 0.8;
  }

  button {
    padding: 3px 10px;
    background: none;
    border: 1px solid ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.color};
    cursor: pointer;
    border-radius: 3px;
    transition: 0.3s ease;
  }
  button:hover {
    color: ${({ theme }) => theme.accent};
    border: 1px solid ${({ theme }) => theme.accent};
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;

  button:first-child {
    margin-bottom: 20px;
  }
  button {
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.color};
    padding: 9px 9px;
    width: 100%;
    justify-content: space-between;
    border-radius: 3px;
    cursor: pointer;
    background: transparent;
    color: ${({ theme }) => theme.color};
    transition: 0.3s ease;
  }

  button:hover {
    color: ${({ theme }) => theme.accent};
    border: 1px solid ${({ theme }) => theme.accent};
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
