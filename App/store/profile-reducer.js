
const defaultState = {
  profile: {},
  profileId: null,
  loading: false,
  appointments:[],
  showProfileForm: false,
  showHmoForm: false,
  showClinicScheduleForm: false,
  role:"patient",
  patientsList:[],
  hmos:[],
  errors: {}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
    
    case 'SET_CLINICS': {
      return {
        ...state,
        clinics: action.clinics
      }
    }

    case 'SET_PROFILE': {
      console.log(action.profile);
      return {
        ...state,
        profile: action.profile,
        role: action.role,
        profileId: action.profile.id
      }
    }

    case 'SET_HMOS': {
      return {
        ...state,
        hmos: action.hmos
      }
    }


    case 'SET_APPOINTMENTS': {
      return {
        ...state,
        appointments: action.appointments
      }
    }

  case 'NEW_PATIENT': {
    return {
      ...state,
      profile: {},
      role:"patient",
      profileId:null,
      showProfileForm: true
    }
  }

  case 'NEW_APPOINTMENT_PATIENT': {
    return {
      ...state,
      profile: {},
      role:"patient",
      profileId:null,
    }
  }

    case 'SHOW_PROFILE_FORM': {
      return {
        ...state,
        showProfileForm: true
      }
    }
    
    case 'CLOSE_PROFILE_FORM': {
      return {
        ...state,
        showProfileForm: false
      }
    }

    case 'SHOW_HMO_FORM': {
      return {
        ...state,
        showHmoForm: true
      }
    }
    
    case 'CLOSE_HMO_FORM': {
      return {
        ...state,
        showHmoForm: false
      }
    }

    case 'SHOW_CLINIC_SCHEDULE_FORM': {
      return {
        ...state,
        showClinicScheduleForm: true
      }
    }
    
    case 'CLOSE_MODAL': {
      return {
        ...state,
        showProfileForm: false,
        showHmoForm: false,
        showClinicScheduleForm: false,
      }
    }

    case 'SAVE_PROFILE_FORM': {
      return {
        ...state,
        profileForm: action.profileForm
      }
    }

    case 'SAVE_HMO_FORM': {
      return {
        ...state,
        hmoForm: action.hmoForm
      }
    }

    case 'SAVE_PROFILE': {
      patientsList = [];
      for(var i=0;i<state.patientsList.length;i++){
        patientsList.push(state.patientsList[i]);
      }
      patientsList.push(state.profileForm);
      var profile = {
        ...state.profile,
        ...state.profileForm
      }
      return {
        ...state,
        patientsList:patientsList,
        profile:profile
      }
    }

    case 'SET_PICTURE': {
      var profile = state.profile;
      profile.picture = action.picture;
      return {
        ...state,
        profile: profile
      }
    }

    case 'SAVE_HMO': {
      return {
        ...state,
      }
    }

  default:
      return state;
  }


}

