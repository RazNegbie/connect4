import React from "react";
import ReactDOM from "react-dom";
import Board from "./Components/Board";

class App extends React.Component {
  render() {
    return <Board />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
