import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginScreen from '../screens/LoginScreen.js';
import HomeScreen from '../screens/HomeScreen.js';
import PatientScreen from '../screens/PatientScreen.js';
import DoctorScreen from '../screens/DoctorScreen.js';
import AppointmentScreen from '../screens/AppointmentScreen.js';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

export const AppNavigator = StackNavigator({
	  Login: {
		    screen: LoginScreen,
		  },
			Home: {
				screen: HomeScreen,
			},
			Patient: {
				screen: PatientScreen,
			},
			Doctor: {
				screen: DoctorScreen,
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