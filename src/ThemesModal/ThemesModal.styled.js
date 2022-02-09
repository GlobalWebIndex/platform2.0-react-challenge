import styled from "styled-components";
import { motion } from "framer-motion";

export const Ul = styled(motion.ul)`
  list-style-type: none;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  background-color: ${({ theme }) => theme.bg2};
  padding: 6px 14px;
  border-radius: 5px;

  box-shadow: 0 4px 14px ${({ theme }) => theme.bg};
  z-index: 5;
  width: 160px;

  li {
    margin-bottom: 8px;
  }
`;

export const Li = styled.li`
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  padding: 8px 25px;
  width: 100%;
  text-align: center;
  text-transform: capitalize;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;
