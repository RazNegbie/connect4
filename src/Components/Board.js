import React from "react";
import Row from "./Row";
import FinishScreen from "./FinishScreen";
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

  initGame = () => {
    this.setState({
      board: this.initBoard(),
      stepsCount: 0,
      currentPlayer: "player1",
      finishGame: false
    });
  };
  finishGame = () => {
    this.setState({ finishGame: true });
  };

  checkWinner = board => {
    return (
      this.checkRows(board) ||
      this.checkCols(board) ||
      this.checkRightDiagonal(board) ||
      this.checkLeftDiagonal(board)
    );
  };

  checkRows = board => {
    for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        if (board[rowIndex][colIndex]) {
          if (
            board[rowIndex][colIndex] === board[rowIndex][colIndex + 1] &&
            board[rowIndex][colIndex] === board[rowIndex][colIndex + 2] &&
            board[rowIndex][colIndex] === board[rowIndex][colIndex + 3]
          ) {
            return this.finishGame();
          }
        }
      }
    }
  };
  checkCols = board => {
    for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
      for (let colIndex = 0; colIndex < 7; colIndex++) {
        if (board[rowIndex][colIndex]) {
          if (
            board[rowIndex][colIndex] === board[rowIndex - 1][colIndex] &&
            board[rowIndex][colIndex] === board[rowIndex - 2][colIndex] &&
            board[rowIndex][colIndex] === board[rowIndex - 3][colIndex]
          ) {
            return this.finishGame();
          }
        }
      }
    }
  };

  checkRightDiagonal = board => {
    for (let rowIndex = 3; rowIndex < 6; rowIndex++) {
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        if (board[rowIndex][colIndex]) {
          if (
            board[rowIndex][colIndex] === board[rowIndex - 1][colIndex + 1] &&
            board[rowIndex][colIndex] === board[rowIndex - 2][colIndex + 2] &&
            board[rowIndex][colIndex] === board[rowIndex - 3][colIndex + 3]
          ) {
            return this.finishGame();
          }
        }
      }
    }
  };

  checkLeftDiagonal = board => {
    for (let rowIndex = 3; rowIndex < 6; rowIndex++) {
      for (let colIndex = 3; colIndex < 7; colIndex++) {
        if (board[rowIndex][colIndex]) {
          if (
            board[rowIndex][colIndex] === board[rowIndex - 1][colIndex - 1] &&
            board[rowIndex][colIndex] === board[rowIndex - 2][colIndex - 2] &&
            board[rowIndex][colIndex] === board[rowIndex - 3][colIndex - 3]
          ) {
            return this.finishGame();
          }
        }
      }
    }
  };

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
        this.checkWinner(board);
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
    if (this.state.finishGame) {
      return <FinishScreen onClick={this.initGame} />;
    } else {
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
