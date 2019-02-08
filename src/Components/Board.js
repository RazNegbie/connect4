import React from "react";
import Row from "./Row";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      stepsCount: 0,
      currentPlayer: "player1",
      finishGame: false
    };
  }

  addStep = () => {
    let stepsCount = this.state.stepsCount;
    stepsCount++;
    this.setState({ stepsCount: stepsCount });
  };
  changeCurrentPlayer = () => {
    this.state.currentPlayer === "player1"
      ? this.setState({ currentPlayer: "player2" })
      : this.setState({ currentPlayer: "player1" });
  };
  onCellClick = colID => {
    let board = this.state.board;
    let isFound = false;
    for (let i = 5; i >= 0 && !isFound; i--) {
      if (board[i][colID] === null) {
        isFound = true;
        board[i][colID] = this.state.currentPlayer;
        this.addStep();
        this.changeCurrentPlayer();
      }
    }

    this.setState({ board: board });
  };
  renderRows = () => {
    return this.state.board.map((row, index) => {
      return (
        <Row onCellClick={this.onCellClick} cells={row} rowIndex={index} />
      );
    });
  };
  initBoard = () => {
    let board = [];
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        row.push(null);
      }

      board.push(row);
    }
    return board;
  };

  render() {

      return (
        <div>
          <h1>{this.state.currentPlayer}</h1>
          <h1>{this.state.stepsCount}</h1>

          <table>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </div>
      );
    }
  }
}

export default Board;
