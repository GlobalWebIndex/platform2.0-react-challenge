import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  position: relative;
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;

  h5 {
    font-size: 19px;
    margin-top: 100px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);

  padding: 20px 40px;
  gap: 10px;
`;

export const GridItem = styled(motion.div)`
  width: 200px;
  height: 200px;

  img {
    width: 100%;
    display: block;
    height: 100%;
    object-fit: cover;
  }
`;
