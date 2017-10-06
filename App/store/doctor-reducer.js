
const defaultState = {
  }
  
  export default (state=defaultState, action={}) => {
    switch (action.type) {
          case 'VIEW_DOCTOR_PROFILE': {
            return {
              ...state,
              doctor: action.doctor
            }
          }
        
        
        default:
        return state;
    }
  }
  
  