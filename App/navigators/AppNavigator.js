import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginScreen from '../screens/LoginScreen.js';
import HomeScreen from '../screens/HomeScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import ScheduleScreen from '../screens/ScheduleScreen.js';
import AppointmentScreen from '../screens/AppointmentScreen.js';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

export const AppNavigator = StackNavigator({
	  Login: {
		    screen: LoginScreen,
		  },
			Home: {
				screen: HomeScreen,
			},
			Profile: {
				screen: ProfileScreen,
			},
			Schedule: {
				screen: ScheduleScreen,
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