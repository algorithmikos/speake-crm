import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const Typewriter = ({ fullText = "Speak-E & Easy English..." }) => {
  const [text, setText] = useState("");
  const speed = 150; // Adjust typing speed in milliseconds

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        i = 0;
        setText(""); // Reset the text before starting again
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [fullText, speed]);

  return (
    <Typography variant="body1" className="app-font">
      {text}
    </Typography>
  );
};

export default Typewriter;
