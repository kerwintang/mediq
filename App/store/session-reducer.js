const defaultState = {
	session:{
		username:null,
		fbInfo:null,
		signup:false,
		fbLoginLoading:false,
		loginLoading:true,
		roles: {},
		hmoList: [],
		user:{
		},
		profile:{
		}
	},
	username:null,
	token:null,
	hmoList: [],
	roles:{}
}

export default function sessionReducer(state = defaultState.session, action) {  
  switch(action.type) {
	  case 'SET_FB_INFO':
	  	return { ...state, fbInfo:action.fbInfo, username:action.fbInfo.email }
		  case 'SET_TOKEN':
	  	return { ...state, token:action.token }
		  case 'LOGIN_SUCCESSFUL':
	  	return { ...state, loginLoading:true }
		  case 'HIDE_LOGIN_LOADING':
	  	return { ...state, loginLoading:false }
	case 'SET_HMO_LIST':
	  	return { ...state, hmoList:action.hmoList }
	  case 'SIGNUP':
	  	return { ...state, signup:true}
	  case 'LOGIN': 
	  	return { ...state, username:action.user.username, user:action.user, profile:action.profile, loggedIn: true}
		case 'FB_LOGIN': 
	  	return { ...state, fbInfo:action.fbInfo, username:action.user.email, user:action.user, loggedIn: true}
	  case 'LOGOUT': 
	  	return { ...state, fbInfo:null, username:null, loggedIn:false, user:null}
	  case "LOGIN_SUCCESS":
	      return !!sessionStorage.jwt
	  case "SET_USER_INFO":
		  sessionStorage.username = action.username;
		  sessionStorage.roles = action.roles;
	  	  return {
		    ...state,
		    username:action.username,
		    roles:action.roles
	  }
    default: 
      return state;
  }
}

