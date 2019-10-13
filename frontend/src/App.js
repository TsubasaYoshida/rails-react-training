import React, { Component } from 'react';
import axios from 'axios';

const CSE_ENDPOINT = 'https://www.googleapis.com/customsearch/v1';
const GCP_API_KEY = process.env.REACT_APP_GCP_API_KEY;
const SEARCH_ENGINE_ID = process.env.REACT_APP_SEARCH_ENGINE_ID;

export default class App extends Component {
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
      .get(CSE_ENDPOINT, {
        params: {
          key: GCP_API_KEY,
          cx: SEARCH_ENGINE_ID,
          q: this.state.value,
        }
      })
      .then((response) => {
          const item = response.data.items[0]
          this.setState({
            title: item.title,
            link: item.link,
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
        <h1>検索</h1>

        <a href={this.state.link}>
          {this.state.title}
        </a>

        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="検索" />
        </form>
      </div>
    );
  }
}
