import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginScreen from '../components/LoginScreen.js';
import HomeScreen from '../components/HomeScreen.js';
import AppointmentScreen from '../components/AppointmentScreen.js';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

export const AppNavigator = StackNavigator({
	  Login: {
		    screen: LoginScreen,
		  },
	  Home: {
	    screen: HomeScreen,
	  },
	  Appointment: {
		screen: AppointmentScreen,
	  },
	});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);