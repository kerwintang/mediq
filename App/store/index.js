import { combineReducers } from 'redux';
import AppointmentReducer from './appointment-reducer';
import PatientReducer from './patient-reducer';
import SessionReducer from './session-reducer';
import DoctorReducer from './doctor-reducer';
import NavReducer from './nav-reducer';

const reducers = {
	doctorStore: DoctorReducer,
	sessionStore: SessionReducer,
	appointmentStore: AppointmentReducer,
	patientStore: PatientReducer,
	navStore: NavReducer,
}

const rootReducer = combineReducers(reducers);

export default rootReducer;