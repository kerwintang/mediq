
const defaultState = {
  users: [],
  user: {},
  loading: false,
  displayPassword: false,
  updatedUser: false,
  errors: {}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
    case 'FETCH_USERS': {
      return {
        ...state,
        users: action.payload
      }
    }
    case "FETCH_USERS_FULFILLED": {
        return {
          ...state,
          users: action.payload.data.data || action.payload.data // in case pagination is disabled
        }
      }
    case "SEARCH_USERS_FULFILLED": {
    	console.log(action.payload);
        return {
          ...state,
          users: action.payload.data.data || action.payload.data // in case pagination is disabled
        }
      }
    case 'NEW_USER': {
        return {
          ...state,
          user: {}
        }
      }

    case 'FETCH_USER_PENDING': {
        return {
          ...state,
          loading: true,
          user: {}
        }
      }

    case 'FETCH_USER_FULFILLED': {
    	var user = action.payload.data
    	var moment = require('moment');
    	user.startDate = moment(user.startDate);
    	user.endDate = moment(user.endDate);
        return {
          ...state,
          loading: false,
          user: action.payload.data,
          errors: {}
        }
      }

    case 'UPDATE_USER_PENDING': {
        return {
          ...state,
          loading: true
        }
      }

    case 'UPDATE_USER_FULFILLED': {
    	  const user = action.payload.data;
    	  return {
    	    ...state,
    	    users: state.users.map(item => item.id === user.id ? user : item),
    	    errors: {},
    	    loading: false,
    	    updatedUser: true
    	  }
    	}
    
    case 'UPDATE_USER_REJECTED': {
    	  const data = action.payload.response.data;
          const { destination, startDate, endDate, comment } = data.errors;
          const errors = { global: data.message, destination, startDate, endDate, comment };
    	  return {
    	    ...state,
    	    errors: errors,
    	    loading: false
    	  }
    	}
    
    case 'SAVE_USER_PENDING': {
        return {
          ...state,
          loading: true
        }
      }

      case 'SAVE_USER_FULFILLED': {
        return {
          ...state,
          users: [...state.users, action.payload.data],
          errors: {},
          loading: false
        }
      }

      case 'SAVE_USER_REJECTED': {
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
      case 'DELETE_USER_PENDING': {
          return {
            ...state,
            loading: true
          }
        }

      case 'DELETE_USER_FULFILLED': {
      	  const id = action.payload.data.id;
      	  return {
      	    ...state,
      	    users: state.users.filter(item => item.id !== id),
      	    errors: {},
      	    loading: false,
      	    reload:true
      	  }
      	}
      
      case 'CHANGE_PASSWORD': {
          return {
            ...state,
            displayPassword: true
          }
        }

 
      
      default:
      return state;
  }
}

