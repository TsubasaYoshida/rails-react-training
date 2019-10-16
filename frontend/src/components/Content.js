import React, { Component } from 'react';
import axios from 'axios';

const ENDPOINT = 'http://satsu6.com/game_infos/';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .get(ENDPOINT + this.state.value + ".json")
      .then((response) => {
          this.setState({
            batting_first_team: response.batting_first_team,
          });
        },
      )
      .catch(() => {
        console.log('エラーが発生しました。');
      });
  }

  render() {
    return (
      <div className="App">
        <h1>satsu6</h1>
        <p>
          {this.state.batting_first_team}
        </p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="検索" />
        </form>
      </div>
    );
  }
}
