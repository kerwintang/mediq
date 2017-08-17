const defaultState = {
	session:{
		username:null,
		roles: {}
	},
	username:null,
	roles:{}
}

export default function sessionReducer(state = defaultState.session, action) {  
  switch(action.type) {
	  case 'SET_HOST':
	  	return { ...state, host:action.host}
	  case 'LOGIN': 
	  	return { ...state, fbInfo:action.fbInfo, username:action.fbInfo.id, loggedIn: true}
	  case 'LOGOUT': 
	  	return { ...state, fbInfo:action.info}
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

