var moment = require("moment");

const defaultState = {
  loading: false,
  appointmentListShow:true,
  patientListShow: false,
  scheduleListShow: true,
  reloadPatientList: false,
  reloadScheduleList: false,
  errors: {}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
        case 'SHOW_PATIENT_LIST': {
          return {
            ...state,
            patientListShow: true,
            appointmentListShow: false,
            scheduleListShow: false
          }
        }

        case 'RELOAD_PATIENT_LIST':{
          return {
            ...state,
            reloadPatientList:true
          }
        }
        
        case 'SHOW_APPOINTMENT_LIST': {
          return {
            ...state,
            patientListShow: false,
            appointmentListShow: true,
            scheduleListShow: false,
          }
        }

        case 'SHOW_SCHEDULE_LIST': {
          return {
            ...state,
            patientListShow: false,
            appointmentListShow: false,
            scheduleListShow: true,
          }
        }

        case 'SET_PATIENTS': {
          return {
            ...state,
            reloadPatientList:false
          }
        }

        case 'SET_CLINIC_SCHEDULE': {
          return {
            ...state,
            reloadScheduleList:false
          }
        }

        case 'SET_CLINIC_SCHEDULES': {
          return {
            ...state,
            reloadScheduleList:false
          }
        }

        case 'ADD_APPOINTMENT': {
          return {
            ...state,
            reloadScheduleList:true
          }
        }

        case 'RELOAD_SCHEDULE_LIST': {
          return {
            ...state,
            reloadScheduleList:true
          }
        }

      default:
      return state;
  }
}

