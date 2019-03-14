import React from "react";
import { GamePage } from "App/Pages/GamePage";

class App extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center"
        }}
      >
        <h1>Tanks</h1>
        <GamePage />
      </div>
    );
  }
}

export default App;
