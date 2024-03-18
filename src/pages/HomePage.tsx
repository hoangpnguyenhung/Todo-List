import React from "react";
import Control from "../components/common/Control";
import Todos from "../components/common/Todos";

const HomePage: React.FC = () => {
  return (
    <>
      <Control />
      <Todos />
    </>
  );
};

export default HomePage;
