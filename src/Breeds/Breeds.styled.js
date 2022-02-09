import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  position: relative;
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: center;
  padding: 20px 40px;
  column-gap: 20px;
  row-gap: 40px;
  color: ${({ theme }) => theme.accent};

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, 180px);
    column-gap: 10px;
    row-gap: 20px;
    padding: 20px 0;
  }
`;

export const GridItem = styled(motion.div)`
  width: 200px;
  height: 200px;
  text-align: center;

  p {
    font-weight: 600;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 500px) {
    width: 180px;
    height: 180px;
  }
`;
