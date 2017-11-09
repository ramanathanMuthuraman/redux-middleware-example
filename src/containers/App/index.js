import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getAPIData} from './actions';
import {selectApiData} from './selectors';

import logo from './images/logo.svg';

import {
  GET_API_DATA,
} from './constants';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo"/>
          <h2>Redux middleware example</h2>
        </div>
        <h4>Redux Saga</h4>
        <p className="app-intro">
          <button onClick={() => {
            const counter = this.state.counter + 1;
            this.setState({
              counter
            });
            this.props.getAPIData({
              type: GET_API_DATA,
              data: counter
            });
          }}>Click
          </button>
          <h4>{this.props.apiData}</h4>
        </p>
      </div>
    );
  }
}

App.defaultProps = {
  apiData: {},
};

App.propTypes = {
  apiData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  apiData: selectApiData(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAPIData: (params) => {
      dispatch(getAPIData(params));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
