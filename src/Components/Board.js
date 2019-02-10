import React from "react";
import Row from "./Row";
import FinishScreen from "./FinishScreen";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      stepsCount: 0,
      currentPlayer: "Greeny",
      finishGame: false
    };
  }

  initGame = () => {
    this.setState({
      board: this.initBoard(),
      stepsCount: 0,
      currentPlayer: "Greeny",
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
    for (let rowIndex = 5; rowIndex >= 3; rowIndex--) {
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
    this.state.currentPlayer === "Greeny"
      ? this.setState({ currentPlayer: "Pinky" })
      : this.setState({ currentPlayer: "Greeny" });
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
        <Row
          onCellClick={this.onCellClick}
          cells={row}
          rowIndex={index}
          key={index}
        />
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
      <center className="board">
        {this.state.finishGame ? (
          <FinishScreen
            currentPlayer={this.state.currentPlayer}
            onClick={this.initGame}
          />
        ) : (
          <div>
            <div className="mainHeadLine">Welcome to:</div>
            <div className="gameName"> Connect-4</div>

            <table>
              <tbody>{this.renderRows()}</tbody>
            </table>
            <div className="textBelow">
              <p className="p1Text">Now Playing: </p>
              {this.state.currentPlayer === "Greeny" ? (
                <p className="greenyFinishScreen"> Greeny</p>
              ) : (
                <p className="pinkyFinishScreen"> Pinky</p>
              )}
            </div>
            <p className="p2Text">
              Have been played already: {this.state.stepsCount} steps
            </p>
            <div className="startAgainButton" onClick={this.initGame}>
              Start Again
            </div>
          </div>
        )}
      </center>
    );
  }
}

export default Board;
