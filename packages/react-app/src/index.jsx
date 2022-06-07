import React from "react";
import { ThemeProvider } from './contexts/ThemeContext'
import theme from './theme.json'
import ReactDOM from "react-dom";
import App from "./App";

const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

ReactDOM.render(
  <ThemeProvider theme={theme}>
      <App subgraphUri={subgraphUri} />
   </ThemeProvider>, 
  document.getElementById("root"),
);