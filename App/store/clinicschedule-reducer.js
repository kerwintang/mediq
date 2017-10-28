
const defaultState = {
  csForm:{
    mon:false, tues:false, wed:false, thurs:false, fri:false, sat:false, sun:false
  }
  }
  
  export default (state=defaultState, action={}) => {
    switch (action.type) {
          case 'SET_CLINIC_SCHEDULE': {
            return {
              ...state,
              csForm: action.csForm
            }
          }
        
          case 'SET_MONDAY': {
            return {
              ...state,
              csForm: {
                ...state.csForm,
                mon:!state.csForm.mon,
              }
            }
          }
        
          case 'SET_TUESDAY': {
            return {
              ...state,
              csForm: {
                ...state.csForm,
                tues:!state.csForm.tues,
              }
            }
          }
        
          case 'SET_WEDNESDAY': {
            return {
              ...state,
              csForm: {
                ...state.csForm,
                wed:!state.csForm.wed,
              }
            }
          }
        
          case 'SET_THURSDAY': {
            return {
              ...state,
              csForm: {
                ...state.csForm,
                thurs:!state.csForm.thurs,
              }
            }
          }
        
          case 'SET_FRIDAY': {
            return {
              ...state,
              csForm: {
                ...state.csForm,
                fri:!state.csForm.fri,
              }
            }
          }
        
          case 'SET_SATURDAY': {
            return {
              ...state,
              csForm: {
                ...state.csForm,
                sat:!state.csForm.sat,
              }
            }
          }
        
          case 'SET_SUNDAY': {
            return {
              ...state,
              csForm: {
                ...state.csForm,
                sun:!state.csForm.sun,
              }
            }
          }
        
        default:
        return state;
    }
  }
  
  