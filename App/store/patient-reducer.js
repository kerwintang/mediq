
const defaultState = {
  patientsList: [
  ],
  loading: false,
  reload: false,
  showProfileForm: false,
  showPatientList: false,
  profileForm: {},
  errors: {}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
  	case 'SET_PATIENTS': {
      return {
        ...state,
        patientsList: action.patients
      }
    }

  	case 'SHOW_PATIENT': {
      return {
        ...state,
        patient: action.patient
      }
    }

    case 'NEW_PATIENT': {
      return {
        ...state,
        showProfileForm: true
      }
    }

  	case 'CANCEL_PATIENT': {
      return {
        ...state,
        showProfileForm: false
      }
    }

  	case 'SAVE_PATIENT_FORM': {
      return {
        ...state,
        profileForm: action.profileForm
      }
    }

    case 'SAVE_PATIENT': {
      patientsList = [];
      for(var i=0;i<state.patientsList.length;i++){
        patientsList.push(state.patientsList[i]);
      }
      patientsList.push(state.profileForm);
      return {
        ...state,
        patientsList:patientsList
      }
    }

    default:
      return state;
  }
}

