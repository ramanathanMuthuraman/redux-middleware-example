import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getAPIData} from './actions';
import {selectApiData} from './selectors';

import logo from './images/logo.svg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    this.buttonStyle = {
      border: 0,
      padding: '10px',
      background: '#ccc'
    };
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo"/>
          <h2>Redux middleware example</h2>
        </div>
        <h4>Redux Thunk and Redux Saga</h4>
        <em> Change the IS_SAGA_MIDDLEWARE variable to either use saga(default) or thunk middleware </em>
        <p className="app-intro">
          <button style={this.buttonStyle} onClick={() => {
            const counter = this.state.counter + 1;
            this.setState({
              counter
            });
            this.props.getAPIData({
              params: counter
            });
          }}>Fetch Data
          </button>
        </p>
        {this.props.apiData && <h4>No. of hits {this.props.apiData}</h4>}
      </div>
    );
  }
}

App.defaultProps = {
  apiData: '',
};

App.propTypes = {
  apiData: PropTypes.string,
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
