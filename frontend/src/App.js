import React, { Component } from 'react';
import axios from 'axios';

const CSE_ENDPOINT = 'https://www.googleapis.com/customsearch/v1';
const GCP_API_KEY = process.env.REACT_APP_GCP_API_KEY;
const SEARCH_ENGINE_ID = process.env.REACT_APP_SEARCH_ENGINE_ID;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSearch() {
    axios
      .get(CSE_ENDPOINT, {
        params: {
          key: GCP_API_KEY,
          cx: SEARCH_ENGINE_ID,
          q: '札幌学生野球連盟',
        }
      })
      .then((response) => {
          this.setState({
            title: response.data.items[0].title
          });
        },
      )
      .catch(() => {
        console.log('通信に失敗しました。');
      });
  }

  render() {
    return (
      <div className="App">
        <h1>検索</h1>
        <p> {this.state.title} </p>
        <input
          type="button"
          value="検索"
          onClick={() => this.handleSearch()}
        />
      </div>
    );
  }
}
