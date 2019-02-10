import React, { Component } from "react";

export default class FinishScreen extends Component {
  render() {
    return (
      <div className="finishScreen">
        <button className="startOverButton" onClick={this.props.onClick}>
          start over
        </button>
        <div className="textWinner">
          The winner is:{"  "}
          {this.props.currentPlayer === "Greeny" ? (
            <p className="pinkyFinishScreen1"> Pinky :)</p>
          ) : (
            <p className="greenyFinishScreen1"> Greeny :)</p>
          )}
        </div>
        <p className="congratulations"> Congratulations!</p>
      </div>
    );
  }
}
