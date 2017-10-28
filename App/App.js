import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store/store.js';
import DoctorApp from './DoctorApp.js';
import { Root } from "native-base";


export default class App extends Component {
	constructor() {
	      super();
	    }
	    render() {
	      return (
					<Root>
	        <Provider store={store}>
	          <DoctorApp />
	        </Provider>
					</Root>
	      );
	    }
}