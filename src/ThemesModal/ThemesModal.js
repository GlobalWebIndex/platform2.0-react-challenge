import React from "react";
import { useGlobalContext } from "../context";
import { Ul, Li } from "./ThemesModal.styled";
import { motion } from "framer-motion";

const ThemesModal = ({ position }) => {
  const {
    state: { themes },
    handleThemeChange,
  } = useGlobalContext();

  return (
    <Ul
      left={position.left + "px"}
      top={position.y + "px"}
      as={motion.div}
      initial={{ opacity: 0, x: "100vw" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ x: "100vw" }}
    >
      {themes.map((theme, index) => {
        const { bg, accent, name } = theme;
        return (
          <Li
            key={index}
            color={accent}
            bg={bg}
            onClick={() => handleThemeChange(name)}
          >
            {name}
          </Li>
        );
      })}
    </Ul>
  );
};

export default ThemesModal;
