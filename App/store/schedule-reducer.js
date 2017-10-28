const moment = require("moment");

const defaultState = {
  loading: false,
  reload: false,
  reloadAppointments: false,
  showAppointmentForm: false,
  schedules:[],
  appointments:[],
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

    case 'SET_APPOINTMENTS': {
      return {
        ...state,
        appointments: action.appointments,
        reloadAppointments:false
      }
    }

  	case 'ADD_SCHEDULE': {
      var schedules = [];
      for(var i=0;i<state.schedules.length;i++){
        schedules.push(state.schedules[i]);
      }
      for(var i=0;i<actio .schedules.length;i++){
        schedules.push(action.schedules[i]);
      }
      return {
        ...state,
        schedules: schedules
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
        appointments: (action.clinicSchedule && action.clinicSchedule.Appointments)?action.clinicSchedule.Appointments:state.appointments
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
    
    
  	case 'SHOW_APPOINTMENT': {
      var schedule = state.schedule;
      if(action.appointment.ClinicSchedule){
        schedule = action.appointment.ClinicSchedule.Schedule;
        schedule.Clinic = action.appointment.ClinicSchedule.Clinic;
      }
      return {
        ...state,
        schedule: schedule
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
        reloadAppointments: true
      }
    }

  	case 'CLOSE_PROFILE_FORM': {
      return {
        ...state,
        showAppointmentForm: false,
        reloadAppointments: true
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

