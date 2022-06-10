import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://fn5dyk1mei9y.usemoralis.com:2053/server" appId="XG3H7yNFngoNruQjehrWpdqGvJ82m68ZshCxUlcM">
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);