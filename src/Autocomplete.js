import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Autocomplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired,
    onChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  state = {
    activeOption: 0,
    showOptions: false,
    userInput: '',
  };

  onChange = (e) => {
    const { onChange } = this.props;
    onChange(e.currentTarget.value);

    this.setState({
      activeOption: 0,
      showOptions: true,
      userInput: e.currentTarget.value,
    });
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      showOptions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  onKeyDown = (e) => {
    const { activeOption } = this.state;
    const { options } = this.props;
    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: options[activeOption],
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === options.length - 1) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeOption, showOptions, userInput },
    } = this;
    const { loading, options } = this.props;
    let optionList;
    if (showOptions && userInput) {
      if (options.length) {
        optionList = (
          <ul className="options">
            {options.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li
                  className={className}
                  key={optionName + index}
                  onClick={onClick}
                >
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <input
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <input type="submit" value="" className="search-btn" />
        </div>
        {loading ? (
          <div className="no-options">
            <em>Loading...</em>
          </div>
        ) : (
          optionList
        )}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
