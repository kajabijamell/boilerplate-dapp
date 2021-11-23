import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";

import App from "./App.js";


ReactDOM.render(
  <MoralisProvider appId="B9KYHhJJxoRqdrBqYo7HUhfAWVaKdxpZoayzXDDl" serverUrl="https://el0pwjpcey7u.usemoralis.com:2053/server">
    <App />
  </MoralisProvider>,
  document.getElementById("root"),
);
