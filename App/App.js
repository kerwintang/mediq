import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store/store.js';
import DoctorApp from './DoctorApp.js';

export default class App extends Component {
	constructor() {
	      super();
	    }
	    render() {
	      return (
	        <Provider store={store}>
	          <DoctorApp />
	        </Provider>
	      );
	    }
}