
const defaultState = {
  appointments: [],
  loading: false,
  reload: false,
  errors: {}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
  	case 'SHOW_APPOINTMENT': {
      return {
        ...state,
        appointment: action.appointment
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
    case 'NEW_APPOINTMENT': {
        return {
          ...state,
          appointment: {}
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

