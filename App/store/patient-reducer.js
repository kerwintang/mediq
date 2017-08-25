
const defaultState = {
  patientsList: [
    {id:1, firstName:"Jamie Kiara", lastName:"Tang", address:"Residencias de Manila", birthday:"02/02/2016"},
    {id:2, firstName:"Jasmine Micah", lastName:"Tang", address:"Residencias de Manila", birthday:"11/28/2009"},
    {id:3, firstName:"Joy Emarie", lastName:"Tang", address:"Residencias de Manila", birthday:"09/04/1982"},
    {id:4, firstName:"Kerwin Anthony", lastName:"Tang", address:"Residencias de Manila", birthday:"05/28/1982"},
  ],
  loading: false,
  reload: false,
  showPatientForm: false,
  showPatientList: false,
  patientForm: {},
  errors: {}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
  	case 'SHOW_PATIENT': {
      return {
        ...state,
        patient: action.patient
      }
    }

    case 'NEW_PATIENT': {
      return {
        ...state,
        showPatientForm: true
      }
    }

  	case 'CANCEL_PATIENT': {
      return {
        ...state,
        showPatientForm: false
      }
    }

  	case 'SAVE_PATIENT_FORM': {
      return {
        ...state,
        patientForm: action.patientForm
      }
    }

    case 'SAVE_PATIENT': {
      patientsList = [];
      for(var i=0;i<state.patientsList.length;i++){
        patientsList.push(state.patientsList[i]);
      }
      patientsList.push(state.patientForm);
      return {
        ...state,
        patientsList:patientsList
      }
    }

    default:
      return state;
  }
}

