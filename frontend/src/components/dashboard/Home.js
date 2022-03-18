import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="homePage">
          Dashboard
      </div>

    </ThemeProvider>
  );
};
export default Home;
