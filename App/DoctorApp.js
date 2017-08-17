import React, { Component } from 'react';
import { Platform, AppRegistry, StyleSheet, Text, Image, View, TextInput, ListView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import LoginScreen from './components/LoginScreen.js';
import HomeScreen from './components/HomeScreen.js';
import AppointmentScreen from './components/AppointmentScreen.js';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

const FBSDK = require('react-native-fbsdk');
const {
  AccessToken
} = FBSDK;

const AppNavigator = StackNavigator({
	  Home: {
	    screen: HomeScreen,
	  },
	  Appointment: {
		screen: AppointmentScreen,
	  },
	});

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

const navReducer = (state = initialState, action) => {
	  const nextState = AppNavigator.router.getStateForAction(action, state);

	  // Simply return the original `state` if `nextState` is null or undefined.
	  return nextState || state;
};

class DoctorApp extends Component {
	
	  constructor(props) {
		    super(props);
            

	  }

	    render() {
		    this.styles = StyleSheet.create({
		    	container: {
		    	    flex: 1,
		    	    alignItems: 'center',
		    	  },
		    	  backgroundContainer: {
		    	    position: 'absolute',
		    	    top: 0,
		    	    bottom: 0,
		    	    left: 0,
		    	    right: 0,
		    	  }
		    });

	    return (
	    		<AppNavigator navigation={addNavigationHelpers({
	    	        dispatch: this.props.dispatch,
	    	        state: this.props.nav
	    	      })} />
	    );
	  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
	deviceInfo:state.deviceInfo,
	fbInfo:state.fbInfo,
	nav: state.navStore
})

const mapDispatchToProps = (dispatch) => ({
	setFbInfo: (info) => { dispatch({ type: 'LOGIN', fbInfo:info }) }
})

export default connect(mapStateToProps)(DoctorApp)