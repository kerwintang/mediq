import React, { Component } from 'react';
import { Platform, Linking, View, Text, Image, TouchableWithoutFeedback, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import FBLogin from '../components/FBLogin.js';
import MediqText from '../components/MediqText.js';
import Login from 'react-native-simple-login'
import Styles from '../styles/Styles.js';
import { client } from '../actions'

const FBSDK = require('react-native-fbsdk');
const {
  AccessToken
} = FBSDK;



const DumbLoginScreen = (props) => (
	<View style={{
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
  	    right: 0,
  	    bottom: 0,
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'flex-start',
		width:"100%"
	}}>
		<Image fadeDuration={0} style={{position:'absolute',height:'100%', width:'100%'}} source={require('../img/bgLogin.png')} />
		<View style={{
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor:'transparent',
			opacity:0.5
		}}>
		</View>
		<Image fadeDuration={0} style={{height:50, width:50, padding: 100}} resizeMode="contain" source={require('../img/mediqLogo.png')} />

		<Login
		loginFormWrapperStyle={{width:"90%"}}
		loginResetPasswordLinkTextStyle={{backgroundColor:"transparent", color:Styles.colors.twilightBlue}}
		onLogin={props.onLogin}
		onResetPassword={props.onResetPassword}
		inputStyle={{color:"black", padding:10, marginLeft:20}}
		inputPlaceholderTextColor="#EEEEEE"
		/>
		<View style={{padding:10, width:"90%", backgroundColor:"white", flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
			<Text style={{fontSize:20, color:"#4267b2"}}>Sign-up</Text>
		</View>
		<FBLogin onLogin={props.onFbLogin}/>
		{(props.loginLoading)?
			<View fadeDuration={0} style={{position:'absolute', backgroundColor:"black",height:'100%', width:'100%', flexDirection:"column", alignItems:"center", justifyContent:"center", opacity:0.9}}>
			<ActivityIndicator size="large"
			style={{height:80, width:80, paddingTop:20}}
          	/>
			  <MediqText style={{color:"white"}}>Loading..</MediqText>
			</View>	
		:null}
	</View>
);

const DumbCardImage = (props) => (
	<View style={{borderWidth:1}}>
		
	</View>
);

const users = [
	{id:1, firstName:"Jamie Kiara", lastName:"Tang", address:"Residencias de Manila", email:"kerwintang2@gmail.com", mobile:"09778224980", birthday:"02/02/2016", age:"1yr 7mos", role:"patient"},
	{id:2, firstName:"Jasmine Micah", lastName:"Tang", address:"Residencias de Manila", email:"kerwintang2@gmail.com", mobile:"09778224980", birthday:"11/28/2009", age:"7y/o", role:"patient"},			
	{id:3, firstName:"Joy Emarie", lastName:"Tang", address:"Residencias de Manila", email:"kerwintang2@gmail.com", mobile:"09778224980", birthday:"09/04/1982", age:"35y/o", role:"patient"},
	{id:4, firstName:"Kerwin Anthony", lastName:"Tang", address:"Residencias de Manila", email:"kerwintang2@gmail.com", mobile:"09778224980", password:"password", birthday:"05/28/1982", age:"35y/o", role:"owner",
		patients:[
			{id:1, firstName:"Jamie Kiara", lastName:"Tang", address:"Residencias de Manila", email:"kerwintang2@gmail.com", mobile:"09778224980", birthday:"02/02/2016", age:"35y/o"},
			{id:2, firstName:"Jasmine Micah", lastName:"Tang", address:"Residencias de Manila", email:"kerwintang2@gmail.com", mobile:"09778224980", birthday:"11/28/2009", age:"35y/o"},			
			{id:3, firstName:"Joy Emarie", lastName:"Tang", address:"Residencias de Manila", email:"kerwintang2@gmail.com", mobile:"09778224980", birthday:"09/04/1982", age:"35y/o"},
		]
	},
	{id:5, firstName:"Jonathan", lastName:"Jones", address:"Makati City", email:"Doctor@gmail.com", mobile:"09171111111", password:"password", birthday:"09/04/1982", age:"35y/o",
		role:"doctor",
		specialization:"Pediatrics",
		experience:"20 years experience",
		hmo:[
			{ id:1, name:"Maxicare" },
			{ id:1, name:"Medicard" },
			{ id:1, name:"AsianLife" },
		],
		clinic:[
			{ id:1, name:"Makati Medical Center", room:"237", schedule:[
					{day:"Mon", startTime:"1:00PM", endTime:"4:00PM", cutoffTime:"3:00PM", maxPatients:20},
					{day:"Tue", startTime:"1:00PM", endTime:"4:00PM", cutoffTime:"3:00PM", maxPatients:20},
					{day:"Wed", startTime:"1:00PM", endTime:"4:00PM", cutoffTime:"3:00PM", maxPatients:20},
					{day:"Thu", startTime:"1:00PM", endTime:"4:00PM", cutoffTime:"3:00PM", maxPatients:20},
					{day:"Fri", startTime:"1:00PM", endTime:"4:00PM", cutoffTime:"3:00PM", maxPatients:20},
					{day:"Sat", startTime:"1:00PM", endTime:"4:00PM", cutoffTime:"3:00PM", maxPatients:20},
				]
			},
			{ id:2, name:"Asian Hospital", room:"120",
				schedule:[
					{day:"Mon", startTime:"10:00AM", endTime:"12:00PM", cutoffTime:"11:00PM", maxPatients:20},
					{day:"Tue", startTime:"10:00AM", endTime:"12:00PM", cutoffTime:"11:00PM", maxPatients:20},
					{day:"Wed", startTime:"10:00AM", endTime:"12:00PM", cutoffTime:"11:00PM", maxPatients:20},
					{day:"Thu", startTime:"10:00AM", endTime:"12:00PM", cutoffTime:"11:00PM", maxPatients:20},
					{day:"Fri", startTime:"10:00AM", endTime:"12:00PM", cutoffTime:"11:00PM", maxPatients:20},
					{day:"Sat", startTime:"10:00AM", endTime:"12:00PM", cutoffTime:"11:00PM", maxPatients:20},
				]
			},
		],
		patients:[
			{id:1, firstName:"Jamie Kiara", lastName:"Tang", address:"Residencias de Manila", email:"kerwintang2@gmail.com", mobile:"09778224980", birthday:"02/02/2016", role:"patient", age:"1yr 7mos"},
			{id:2, firstName:"Jasmine Micah", lastName:"Tang", address:"Residencias de Manila", email:"kerwintang2@gmail.com", mobile:"09778224980", birthday:"11/28/2009", role:"patient", age:"7y/o"},			
		]
	}
];


class LoginScreen extends Component {
	constructor(props) {
		super(props);

		AccessToken.getCurrentAccessToken().then((data) => {
			if(data){
					const { accessToken } = data
					fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
					.then((response) => response.json())
					.then((json) => {
						this.fbLogin(json);
					})
					.catch((e) => {
						alert(e);
						//reject('ERROR GETTING DATA FROM FACEBOOK')
					})
			}else{
				this.props.hideLoginLoading();
			}
		})
		this.fbLogin = this.fbLogin.bind(this);
	}

	async authenticate(username, password){
		// TODO: encrypt password
		client.post('/api/authenticate',{
			username:username,
			password:password
		}).then((res) => {
			this.props.setToken(res.data.token)
			this.props.doLogin(res.data.user, res.data.profile);
			this.props.setSchedules(res.data.schedules);
		}).catch((err) => {
			alert("ERR: "+err);
		});
	}

	fbLogin(fbInfo) {
		var user = this.getUser(fbInfo.email);
		if(user){
			//alert("FOUND");
			this.props.doFbLogin(fbInfo, user);
		}else{
			this.props.setFbInfo(fbInfo);
		}
	  }

	  componentDidMount(){
		  // testing 
		  var user = this.authenticate("Doctor@gmail.com","password");
//		  this.props.doLogin(user);
//		  this.props.setPatients(user.patients);
		}

	render() {
		const onLogin = (email, password) => {
			var user = this.authenticate(email, password);
			if(!user){
				alert("Invalid username/password.");
			}else{
				this.props.doLogin(user);
				this.props.setPatients(user.patients);
			}
		  }
		  
		  
		  const onResetPassword = (email) => {
			console.log(email)
		  }
		return (
			this.props.username?null:<DumbLoginScreen onLogin={onLogin} onFbLogin={this.fbLogin} onResetPassword={onResetPassword} loginLoading={this.props.loginLoading}/>
		);
    }
}

const mapStateToProps = state => ({
	show: state.showAbout,
	username: state.sessionStore.username,
	fbInfo: state.fbInfo,
	inventory: state.inventory,
	noLocation: state.noLocation,
	loginLoading: state.sessionStore.loginLoading
})

const mapDispatchToProps = (dispatch) => ({
	doLogin: (user, profile) => { dispatch({ type: 'LOGIN', user:user, profile:profile }) },
	doFbLogin: (fbInfo, user) => { dispatch({ type: 'FB_LOGIN', fbInfo:fbInfo, user:user }) },
	setFbInfo: (fbInfo) => { dispatch({ type: 'SET_FB_INFO', fbInfo:fbInfo }) },
	authenticated: () => { dispatch({ type: 'LOGIN_SUCCESSFUL' }) },
	hideLoginLoading: () => { dispatch({ type:'HIDE_LOGIN_LOADING'})},
	setToken: (token) => { dispatch({ type: 'SET_TOKEN', token:token }) },
	setPatients: (patients) => { dispatch({ type: 'SET_PATIENTS', patients:patients }) },
	setSchedules: (schedules) => { dispatch({ type: 'SET_SCHEDULES', schedules:schedules }) },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
