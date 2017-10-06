
const defaultState = {
  editVitals: false,
  editNotes: false,
  notesType:true,
  notesDraw: false,
  notesCamera: false,
  notesText:"",
  notesCategory:"doctor",
  doctorNotes:[],
  patientNotes:[],
  reloadDoctorNotes:false,
  reloadPatientNotes:false,
  errors: {}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
    
  	case 'EDIT_VITALS': {
      return {
        ...state,
        editVitals: true
      }
    }
  	case 'EDIT_NOTES': {
      return {
        ...state,
        editNotes: true,
        notesType:true,
        notesDraw: false,
        notesCamera: false,
        notesCategory: action.category,
        notesText:""
            }
    }
  	case 'CLOSE_NOTES': {
      return {
        ...state,
        editNotes: false,
      }
    }
    case 'SET_DOCTOR_NOTES': {
      return {
        ...state,
        doctorNotes: action.notes,
        reloadDoctorNotes:false
      }
    }
    case 'SET_PATIENT_NOTES': {
      return {
        ...state,
        patientNotes: action.notes,
        reloadPatientNotes:false
      }
    }
    case 'RELOAD_DOCTOR_NOTES':{
      return {
        ...state,
        reloadDoctorNotes:true
      }
    }
    case 'RELOAD_PATIENT_NOTES':{
      return {
        ...state,
        reloadPatientNotes:true
      }
    }
  	case 'SHOW_NOTES_TYPE': {
      return {
        ...state,
        notesType: true,
        notesDraw: false,
        notesCamera: false,
            }
    }
  	case 'SHOW_NOTES_DRAW': {
      return {
        ...state,
        notesType: false,
        notesDraw: true,
        notesCamera: false,
            }
    }
  	case 'SHOW_NOTES_CAMERA': {
      return {
        ...state,
        notesType: false,
        notesDraw: false,
        notesCamera: true,
            }
    }
  	case 'SET_NOTES_CATEGORY': {
      return {
        ...state,
        notesCategory: action.category,
            }
    }
  	case 'SET_NOTES_TEXT': {
      return {
        ...state,
        notesText: action.notesText,
            }
    }
  	case 'SET_UPLOAD_PICTURE': {
      return {
        ...state,
        uploadPicture: action.path
            }
    }

      
      default:
      return state;
  }
}

