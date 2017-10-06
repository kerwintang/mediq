import { combineReducers } from 'redux';
import AppointmentReducer from './appointment-reducer';
import PatientReducer from './patient-reducer';
import SessionReducer from './session-reducer';
import DoctorReducer from './doctor-reducer';
import ProfileReducer from './profile-reducer';
import ScheduleReducer from './schedule-reducer';
import NotesReducer from './notes-reducer';
import SearchReducer from './search-reducer';
import HomeReducer from './home-reducer';
import NavReducer from './nav-reducer';

const reducers = {
	doctorStore: DoctorReducer,
	sessionStore: SessionReducer,
	appointmentStore: AppointmentReducer,
	patientStore: PatientReducer,
	scheduleStore: ScheduleReducer,
	profileStore: ProfileReducer,
	notesStore: NotesReducer,
	searchStore: SearchReducer,
	homeStore: HomeReducer,
	navStore: NavReducer,
}

const rootReducer = combineReducers(reducers);

export default rootReducer;