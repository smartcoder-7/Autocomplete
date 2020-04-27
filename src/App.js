import React, { Component } from 'react';

import Autocomplete from './Autocomplete';
import { debounce } from './utils/debounce';
import { asyncSearch } from './utils/asyncSearch';

class App extends Component {
  state = {
    loading: false,
    suggestions: [],
    searchText: '',
  };

  handleInputChange = (value) => {
    this.setState({ searchText: value });
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (this.state.searchText !== prevState.searchText) {
      try {
        this.setState({ loading: true });
        const results = await asyncSearch(this.state.searchText);
        this.setState({ suggestions: results });
      } catch (err) {
        this.setState({ loading: false });
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  render() {
    const { suggestions, loading } = this.state;
    return (
      <div className="App">
        <Autocomplete
          loading={loading}
          options={suggestions}
          onChange={debounce(this.handleInputChange, 500)}
        />
      </div>
    );
  }
}

export default App;
