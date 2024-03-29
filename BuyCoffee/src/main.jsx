import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "goerli";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
        {/* <App /> */}
        </Routes>
        </BrowserRouter>,
      </ChakraProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
