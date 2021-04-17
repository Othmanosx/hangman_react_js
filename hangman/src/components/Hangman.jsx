import React, { Component } from "react";
import Image from "./Image";
import "../App.css";
import "./keyboard.css";
import chalkbutton from "./hangman_images/chalkbutton.png";
import axios from "axios";
import ReactGA from "react-ga";

// import Keyboard from "./Keyboard";
// const axios = require("axios");

export default class Hangman extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: "",
      counter: 0,
      guessed: [],
    };
  }
  Event = (category, action, label) => {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  };
  componentDidMount() {
    axios
      .get("https://random-word-api.herokuapp.com/word?number=1")
      .then((result) =>
        this.setState({
          word: result.data[0],
          counter: 0,
          guessed: [],
        })
      )
      .catch((error) => console.log(error));
  }

  guessedWord() {
    return this.state.word.split("").map((letter) => {
      if (this.state.guessed.includes(letter)) return letter;
      else return " _ ";
    });
  }

  handleGuess = (e) => {
    // get the values of the clicked letter an
    let value = e;
    if (this.state.word.includes(value)) {
      this.setState({
        guessed: [...this.state.guessed, value],
      });
    } else {
      this.setState({
        counter: this.state.counter + 1,
        guessed: [...this.state.guessed, value],
      });
    }
    this.Event("KEYBOARD", `Letter ${e} pressed`, `${e}`);
  };

  resetButton = () => {
    this.componentDidMount();
    ReactGA.event({
      category: "Game Reset",
      action: "Game Reloads",
    });
  };

  generateButtons = () => {
    const letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    const keys = letters.map((letter) => (
      <button
        key={letter}
        className="buttons"
        onClick={() => this.handleGuess(letter)}
        disabled={this.state.guessed.includes(letter)}
        value={letter}
      >
        <div>
          <img className="button-img" src={chalkbutton} alt="buttons"></img>

          {letter}
        </div>
      </button>
    ));
    return <div className="buttons-container">{keys}</div>;
  };

  render() {
    const keyboard = this.generateButtons();
    return (
      <div className="main">
        <div>
          <Image mistakes={this.state.counter} />
        </div>
        <div className="keyboard">
          <p>
            {!(this.state.counter >= 6) ? this.guessedWord() : this.state.word}
          </p>
          {this.state.word
            ? this.guessedWord().join("") === this.state.word
              ? "YOU WON !! "
              : null
            : "Loading..."}
          {this.state.counter >= 6 ? "YOU LOST !!" : <div>{keyboard}</div>}
          <button className="reset" onClick={this.resetButton}>
            Play Again
          </button>
          <div className="counter">Mistakes: {this.state.counter}/6</div>
        </div>
      </div>
    );
  }
}
