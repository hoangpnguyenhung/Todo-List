import { Typography, keyframes } from "@mui/material";
import React from "react";

const logo = "TodoApp";

const textAnimation = keyframes`
    0%,100%{
        background: #ff0000;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    10%,90%{
        background: -webkit-linear-gradient(#eee, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const Logo: React.FC = () => {
  return (
    <>
      {logo.split("").map((element, index) => (
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.7rem",
            fontWeight: "700",
            animation: `${textAnimation} 2s infinite ease`,
            animationDelay: `${index * 0.25}s`,
          }}
          key={index}
        >
          {element}
        </Typography>
      ))}
    </>
  );
};

export default Logo;
