import React from "react";
import Row from "./Row";
import FinishScreen from "./FinishScreen";
import axios from "axios";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.initBoard(),
      stepsCount: 0,
      currentPlayer: "greeny",
      finishGame: false,
      history: [],
      customers: [],
      pinkyWins: 0,
      greenyWins: 0
    };

    this.renderRows = this.renderRows.bind(this);
    this.addStep = this.addStep.bind(this);
    this.changeCurrentPlayer = this.changeCurrentPlayer.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.saveHistory = this.saveHistory.bind(this);
    this.backToHistory = this.backToHistory.bind(this);
    this.finishGame = this.finishGame.bind(this);
  }

  // Initielize with null the matrix that represent the board
  initBoard = () => {
    let board = [];
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        row.push(null);
      }

      board.push(row);
    }

    // Get the number of victories
    this.getVictories(false);

    return board;
  };

  // Create the rows on the board with their cells
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

  //Initialize the beginning state of the game
  initGame = () => {
    this.setState({
      board: this.initBoard(),
      stepsCount: 0,
      currentPlayer: "greeny",
      finishGame: false,
      history: []
    });
  };

  //Responsible to the process that happens when a player clicks on a cell
  onCellClick = colID => {
    let boardCopy = this.state.board.slice();
    let isFound = false;
    for (let i = 5; i >= 0 && !isFound; i--) {
      if (boardCopy[i][colID] === null) {
        isFound = true;
        boardCopy[i][colID] = this.state.currentPlayer;
        this.setState({
          board: boardCopy
        });
        this.checkWinner(boardCopy);
        this.addStep();
        this.changeCurrentPlayer();
        this.saveHistory(i, colID);
      }
    }
  };

  //Checks whether one of the players completed a sequence of four tools in all variations
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

  getVictories = isFinish => {
    axios.get("/getVictories").then(response => {
      this.setState({
        greenyWins: response.data.greeny,
        pinkyWins: response.data.pinky,
        finishGame: isFinish
      });
    });
  };

  // Check if there is a winner. If there is, changing the status of to game in order to
  // pass to the finish screen
  finishGame = () => {
    var self = this;

    axios.post("/updateWinner", {
      winner: this.state.currentPlayer
    });

    this.setState({ finishGame: true });
  };

  //Edit count the amount of steps that have played already
  addStep = () => {
    let stepsCount = this.state.stepsCount;
    stepsCount++;
    this.setState({ stepsCount: stepsCount });
    if (stepsCount === 42) {
      alert(
        "It's a tie! Please press 'Try Again' button in order to start a new game"
      );
    }
  };

  //Check who is the current player and change the player in accordance
  changeCurrentPlayer = () => {
    this.state.currentPlayer === "greeny"
      ? this.setState({ currentPlayer: "pinky" })
      : this.setState({ currentPlayer: "greeny" });
  };

  // Save the history of the game after each step
  saveHistory = (rowId, colId) => {
    this.setState({
      history: [...this.state.history, { rowId: rowId, colId: colId }]
    });
  };

  // Going back to the wanted step
  backToHistory = index => {
    // Get copies of the arrays
    let historyCopy = this.state.history.slice();
    let boardCopy = this.state.board.slice();

    for (let i = 0; i < this.state.stepsCount - index; i++) {
      // Get the last step
      let lastMove = historyCopy.pop();

      // Set the step to null in the board
      boardCopy[lastMove.rowId][lastMove.colId] = null;
    }

    let updatedCurrentPlayer = this.state.currentPlayer;
    if (this.currentPlayer === "pinky" && index % 2 !== 0) {
      updatedCurrentPlayer = "pinky";
    } else if (index % 2 === 0) {
      updatedCurrentPlayer = "greeny";
    } else {
      updatedCurrentPlayer = "pinky";
    }

    this.setState({
      board: boardCopy,
      history: historyCopy,
      stepsCount: index,
      currentPlayer: updatedCurrentPlayer
    });
  };

  render() {
    return (
      <div>
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
              <div className="buttonsBox">
                {this.state.history.length !== 0 &&
                  this.state.history.map((currentHistory, index) => {
                    if (index !== 0) {
                      return (
                        <div>
                          <button
                            className="buttonStepBack"
                            key={index}
                            onClick={() => this.backToHistory(index)}
                          >
                            back to step: {index}
                          </button>
                        </div>
                      );
                    }
                  })}
              </div>
              <div className="textBelow">
                <p className="nowPlayingText">Now Playing: </p>
                {this.state.currentPlayer === "greeny" ? (
                  <p className="greenyTurn"> Greeny</p>
                ) : (
                  <p className="pinkyTurn "> Pinky</p>
                )}
              </div>
              <p className="stepsCounter">
                Have been played already: {this.state.stepsCount} steps
              </p>
              <div className="shadow startAgainButton" onClick={this.initGame}>
                Start Again
              </div>
              <div className="victoriesTable">
                <table>
                  <center>
                    <row className="victoryH">Victories:</row>
                    <br />

                    <row>
                      <td className="victoriesCells">
                        Greeny:
                        <br />
                        {this.state.greenyWins}
                      </td>

                      <td className="victoriesCells">
                        Pinky:
                        <br />
                        {this.state.pinkyWins}
                      </td>
                    </row>
                  </center>
                </table>
              </div>
            </div>
          )}
        </center>
      </div>
    );
  }
}

export default Board;
