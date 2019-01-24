import React from "react";
import { Homepage } from "App/Pages/HomePage";

class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center", margin: "auto", width: "50%" }}>
        <h1>Tanks</h1>
        <Homepage />
      </div>
    );
  }
}

export default App;
