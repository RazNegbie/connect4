import React, { Component } from "react";

export default class FinishScreen extends Component {
  render() {
    return (
      <div className="finishScreen">
        <button
          className="shadow1 startOverButton"
          onClick={this.props.onClick}
        >
          start over
        </button>
        <div className="textWinner">
          The winner is:
          {this.props.currentPlayer === "greeny" ? (
            <p className="pinkyFinishScreen"> Pinky :)</p>
          ) : (
            <p className="greenyFinishScreen"> Greeny :)</p>
          )}
        </div>
        <div />
        <p className="congratulationsFinishScreen"> Congratulations!</p>
      </div>
    );
  }
}
