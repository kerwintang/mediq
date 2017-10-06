const moment = require("moment");

const defaultState = {
  loading: false,
  reload: false,
  showAppointmentForm: false,
  schedules:[],
  clinicSchedules:{},
  showCalendar:false,
  date: moment(new Date()).startOf('day').toDate(),
  clinicSchedule:{},
  errors: {}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
  	case 'SHOW_SCHEDULE': {
      return {
        ...state,
        schedule: action.schedule,
        clinicSchedule: action.clinicSchedule,
        appointments: action.clinicSchedule?action.clinicSchedule.Appointments:[]
      }
    }

  	case 'SET_CLINIC_SCHEDULES': {
      return {
        ...state,
        clinicSchedules: action.clinicSchedules,
      }
    }
    
  	case 'SET_SCHEDULES': {
      return {
        ...state,
        schedules: action.schedules
      }
    }
    
  	case 'SET_CLINIC_SCHEDULE': {
      return {
        ...state,
        clinicSchedule: action.clinicSchedule,
        appointments: action.clinicSchedule?action.clinicSchedule.Appointments:state.appointments
      }
    }
    
    case 'SHOW_CALENDAR': {
      return {
        ...state,
        showCalendar: true
      }
    }

    case 'HIDE_CALENDAR': {
      return {
        ...state,
        showCalendar: false
      }
    }

    case 'SET_SCHEDULE_DATE':{
      return {
        ...state,
        date: action.date
      }
    }
    
  	case 'NEW_APPOINTMENT': {
      return {
        ...state,
        showAppointmentForm: true,
      }
    }

  	case 'CLOSE_APPOINTMENT_FORM': {
      return {
        ...state,
        showAppointmentForm: false,
      }
    }

  	case 'SAVE_APPOINTMENT_TO_SCHEDULE': {
        var appointment = {id:3, date: {day:"28", month: "Aug", weekday:"Monday"}, 
          patient:action.patient, doctor: action.doctor, clinic:action.schedule.schedule,
          status:"SCHEDULED" };
      var a = [];
      for(var i=0;i<state.appointments.length;i++){
        a.push(state.appointments[i]);
      }
      a.push(appointment);
      return {
        ...state,
        appointments:a
      }
    }


    default:
      return state;
  }
}

