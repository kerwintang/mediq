const defaultState = {
	session:{
		username:null,
		fbInfo:null,
		signup:false,
		fbLoginLoading:false,
		loginLoading:true,
		roles: {},
		user:{
			id:1,
			firstName:"Josephine",
			lastName:"Apostol",
			email:"josephineapostol@gmail.com",
			mobile:"09171111111",
			schedule:[
				{day:"Mon", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"},
				{day:"Tues", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"},
				{day:"Wed", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"},
				{day:"Thurs", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"},
				{day:"Fri", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"},
				{day:"Sat", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"}
			]
		}
	},
	username:null,
	roles:{}
}

export default function sessionReducer(state = defaultState.session, action) {  
  switch(action.type) {
	  case 'SET_FB_INFO':
	  	return { ...state, fbInfo:action.fbInfo, username:action.fbInfo.email }
		  case 'LOGIN_SUCCESSFUL':
	  	return { ...state, loginLoading:true }
		  case 'HIDE_LOGIN_LOADING':
	  	return { ...state, loginLoading:false }
	  case 'SIGNUP':
	  	return { ...state, signup:true}
	  case 'LOGIN': 
	  	return { ...state, username:action.user.email, user:action.user, loggedIn: true}
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

