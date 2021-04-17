import React, { useEffect } from "react";
import Hangman from "./components/Hangman";
import ReactGA from "react-ga";

function App({ initGA }) {
  const PageView = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  };

  useEffect(() => {
    initGA();
    PageView();
  }, [initGA]);

  return (
    <div className="App">
      <Hangman />
    </div>
  );
}

export default App;
