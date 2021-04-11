import React, {useEffect} from "react";
import Hangman from "./components/Hangman";

function App({initGA}) {
  // eslint-disable-next-line
  useEffect(() => { initGA(); }, []);
  
  return (
    <div className="App">
      <Hangman />
    </div>
  );
}

export default App;
