import React from 'react';
import Autocomplete from './Autocomplete';

class App extends React.Component {
  state = {
    loading: false,
    suggestions: [],
  };

  componentDidMount = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users/1/todos',
      );
      const data = await response.json();
      const suggestions = data.reduce((acc, current) => {
        acc.push(current.title);
        return acc;
      }, []);
      this.setState({ suggestions });
    } catch (err) {
      this.setState({ loading: false });
      console.error('Errors occured!', err);
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    const { suggestions, loading } = this.state;
    return (
      <div className="App">
        {loading ? (
          <div>Loading suggestions...</div>
        ) : (
          <Autocomplete options={suggestions} />
        )}
      </div>
    );
  }
}

export default App;
