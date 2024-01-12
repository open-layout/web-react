import { useState } from "react";
import { StyledDynamicIsland } from "./DynamicIsland.styles";
import { motion } from "framer-motion";

const StyledDynamicIslandMotion = motion(StyledDynamicIsland);

const DynamicIsland = () => {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: {
      width: "600px",
      heigth: "auto",
      borderRadius: "20px"
    },
    closed: {
      width: "96px",
      heigth: "auto",
      borderRadius: "99px"
    }
  };

  return (
    <StyledDynamicIslandMotion
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      onClick={() => setIsOpen(!isOpen)}
      isOpen={isOpen}
    >
    </StyledDynamicIslandMotion>
  );
};

DynamicIsland.displayName = "DynamicIsland";

export default DynamicIsland;

