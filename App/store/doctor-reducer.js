
const defaultState = {
    appointmentListShow:true,
    patientListShow: false,
  }
  
  export default (state=defaultState, action={}) => {
    switch (action.type) {
        case 'SHOW_PATIENT_LIST': {
            return {
              ...state,
              patientListShow: true,
              appointmentListShow: false
            }
          }
          
          case 'SHOW_APPOINTMENT_LIST': {
            return {
              ...state,
              patientListShow: false,
              appointmentListShow: true
            }
          }
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
  
  