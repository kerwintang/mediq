
const defaultState = {
  appointments: [],
  procedures: [],
  loading: false,
  reload: false,
  showAppointmentForm:false,
  showProfileForm:false,
  clinicSchedules:[],
  showProcedureModal:false,
  errors: {}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
  	case 'SET_CLINIC_SCHEDULES': {
      return {
        ...state,
        clinicSchedules: action.clinicSchedules
      }
    }
  	case 'SHOW_APPOINTMENT': {
      return {
        ...state,
        appointment: action.appointment,
        showProfileForm:false
      }
    }

    case 'ADD_APPOINTMENT':{
      var appointments = [];
      for(var i=0;i<state.appointments;i++){
        appointments.push(state.appointments[i]);
      }
      appointments.push(action.appointment);
      return {
        ...state,
        appointments: appointments
      }     
    }

    case 'SEARCH_PROCEDURE':{
      return {
        ...state,
        showProcedureModal:true
      }
    }

    case 'SET_PROCEDURES':{
      return {
        ...state,
        procedures:action.procedures
      }
    }

    case 'ADD_PROCEDURE':{
      var procedures = [];
      for(var i=0;i<state.procedures.length;i++){
        procedures.push(state.procedures[i]);
      }
      procedures.push(action.procedure);
      return {
        ...state,
        procedures: procedures
      }     
    }

    case 'CLOSE_MODAL': {
      return {
        ...state,
        showProcedureModal:false
      }
    }
    
    case 'FETCH_APPOINTMENTS': {
      return {
        ...state,
        loading:true,
        reload:false,
        appointments: action.payload
      }
    }
    case "FETCH_APPOINTMENTS_FULFILLED": {
        return {
          ...state,
          loading:false,
          appointments: action.payload.data.data || action.payload.data // in case pagination is disabled
        }
      }
      case 'NEW_APPOINTMENT_PATIENT': {
        return {
          ...state,
          showProfileForm:true
        }
      }

      case 'APPOINTMENT_CLOSE_PATIENT_FORM': {
        return {
          ...state,
          showProfileForm:false
        }
      }

      case 'NEW_APPOINTMENT': {
        return {
          ...state,
          showAppointmentForm:true
        }
      }


    case 'FETCH_APPOINTMENT_PENDING': {
        return {
          ...state,
          loading: true,
          appointment: {}
        }
      }

    case 'FETCH_APPOINTMENT_FULFILLED': {
    	var appointment = action.payload.data
        return {
          ...state,
          loading: false,
          appointment: action.payload.data,
          errors: {}
        }
      }

    case 'UPDATE_APPOINTMENT_PENDING': {
        return {
          ...state,
          loading: true
        }
      }

    case 'UPDATE_APPOINTMENT_FULFILLED': {
    	  const appointment = action.payload.data;
    	  return {
    	    ...state,
    	    appointments: state.appointments.map(item => item.id === appointment.id ? appointment : item),
    	    errors: {},
    	    loading: false
    	  }
    	}
    
    case 'UPDATE_APPOINTMENT_REJECTED': {
    	  const data = action.payload.response.data;
          const { destination, startDate, endDate, comment } = data.errors;
          const errors = { global: data.message, destination, startDate, endDate, comment };
    	  return {
    	    ...state,
    	    errors: errors,
    	    loading: false
    	  }
    	}
    
    case 'SAVE_APPOINTMENT_PENDING': {
        return {
          ...state,
          loading: true
        }
      }

      case 'SAVE_APPOINTMENT_FULFILLED': {
        return {
          ...state,
          appointments: [...state.appointments, action.payload.data],
          errors: {},
          loading: false
        }
      }

      case 'SAVE_APPOINTMENT':{
        var appointment = {id:3, date: {day:"28", month: "Aug", weekday:"Monday"}, patient:action.patient, doctor: action.doctor, status:"SCHEDULED" };
        return {
          ...state,
          appointment:appointment
        }
      }

      case 'SAVE_APPOINTMENT_REJECTED': {
        const data = action.payload.response.data;
        alert("ERROR: "+JSON.stringify(data.errors));
        // convert feathers error formatting to match client-side error formatting
        const { destination, startDate, endDate, comment } = data.errors;
        const errors = { global: data.message, destination, startDate, endDate, comment };
        return {
          ...state,
          errors: errors,
          loading: false
        }
      }
      case 'DELETE_APPOINTMENT_PENDING': {
          return {
            ...state,
            loading: true
          }
        }

      case 'DELETE_APPOINTMENT_FULFILLED': {
      	  const id = action.payload.data.id;
      	  return {
      	    ...state,
      	    appointments: state.appointments.filter(item => item.id !== id),
      	    errors: {},
      	    loading: false,
      	    reload:true
      	  }
      	}
      
      
      default:
      return state;
  }
}

