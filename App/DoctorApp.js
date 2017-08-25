import React, { Component } from 'react';
import { Platform, AppRegistry, StyleSheet, Text, Image, View, TextInput, ListView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import LoginScreen from './screens/LoginScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import AppointmentScreen from './screens/AppointmentScreen.js';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { AppNavigator } from './navigators/AppNavigator';


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
				
	    		(this.props.username?<AppNavigator navigation={addNavigationHelpers({
	    	        dispatch: this.props.dispatch,
	    	        state: this.props.nav
	    	      })} />:<LoginScreen/>)
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
	fbInfo:state.sessionStore.fbInfo,
	username:state.sessionStore.username,
	nav: state.navStore
})

const mapDispatchToProps = (dispatch) => ({
	setFbInfo: (info) => { dispatch({ type: 'SET_FB_INFO', fbInfo:info }) }
})

export default connect(mapStateToProps)(DoctorApp)