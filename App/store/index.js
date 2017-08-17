import { combineReducers } from 'redux';
import AppointmentReducer from './appointment-reducer';
import SessionReducer from './session-reducer';
import NavReducer from './nav-reducer';

const reducers = {
	sessionStore: SessionReducer,
	  appointmentStore: AppointmentReducer,
	  navStore: NavReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;