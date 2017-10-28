import React, { Component } from 'react';
import { Platform, Linking, Text, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import FBLogin from '../components/FBLogin.js';
import MediqText from '../components/MediqText.js';
import Login from 'react-native-simple-login'
import Styles from '../styles/Styles.js';
import { Field, reduxForm } from "redux-form";
import { Item, Input, Icon, Toast, Form, View, Button } from "native-base";
import { client } from '../actions'

const FBSDK = require('react-native-fbsdk');
const {
  AccessToken
} = FBSDK;

const required = value => (value ? undefined : "Required");
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const maxLength15 = maxLength(15);
const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const minLength8 = minLength(8);
const email = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;
const alphaNumeric = value => (value && /[^a-zA-Z0-9 ]/i.test(value) ? "Only alphanumeric characters" : undefined);


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
		<Image fadeDuration={0} style={{position:'absolute',height:'100%', width:'100%'}} source={require('../img/bg_login.png')} />
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
		{props.form}
		<View style={{width:"100%", padding:10, display:"flex", alignItems:"flex-end"}}>
		<Text textAlign="right" style={{backgroundColor:"transparent", color:"white"}}>Forgot Password?</Text>
		</View>
		<View style={{width:"100%", padding:15}}>
		<Button block style={{backgroundColor:Styles.colors.twilightBlue}} onPress={() => props.onLogin()}>
			<Text style={{color:"white", fontSize:18}}>Login</Text>
		</Button>
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

		this.fbLogin = this.fbLogin.bind(this);
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
	}

	async authenticate(username, password){
		// TODO: encrypt password
		client.post('/api/authenticate',{
			username:username,
			password:password
		}).then((res) => {
			if(res.data.success){
				this.props.setToken(res.data.token)
				this.props.doLogin(res.data.user, res.data.profile);
				this.props.setSchedules(res.data.schedules);
			}else{
				Toast.show({
					text: "Invalid username and/or password",
					duration: 2000,
					position: "bottom",
					textStyle: { textAlign: "center" },
				});
			}
		}).catch((err) => {
			Toast.show({
				text: "Error connecting to server. Please check that you have a stable internet connection.",
				duration: 2000,
				position: "bottom",
				textStyle: { textAlign: "center" },
			});
		});
	}

	fbLogin(fbInfo) {
		client.post('/api/authenticate',{
			username: fbInfo.email,
			fbInfo:fbInfo
		}).then((res) => {
			this.props.setToken(res.data.token)
			this.props.doLogin(res.data.user, res.data.profile);
			if(res.data.schedules)
				this.props.setSchedules(res.data.schedules);
			this.props.setFbInfo(fbInfo);
		}).catch((err) => {
			Toast.show({
				text: "Error logging in with your Facebook account. Please check that you have a stable internet connection.",
				duration: 2000,
				position: "bottom",
				textStyle: { textAlign: "center" },
			});
			this.props.hideLoginLoading();
		});
	  }

	  componentDidMount(){
		  // testing 
		  //var user = this.authenticate("kerwintang@gmail.com","password");
		  //var user = this.authenticate("Doctor@gmail.com","password");
//		  this.props.doLogin(user);
//		  this.props.setPatients(user.patients);
		}

		renderInput({ input, label, type, meta: { touched, error, warning } }) {
			return (
				<Item error={error && touched}>
					<Input
						ref={c => (this.textInput = c)}
						placeholder={input.name === "email" ? "Username or E-mail Address" : "Password"}
						secureTextEntry={input.name === "password" ? true : false}
						{...input}
					/>
				</Item>
			);
		}

	render() {
		const onLogin = () => {
			if (this.props.valid) {
				var email = this.props.loginForm.values.email;
				var password = this.props.loginForm.values.password;
				this.authenticate(email, password);
			} else {
				Toast.show({
					text: "Invalid username and/or password",
					duration: 2000,
					position: "bottom",
					textStyle: { textAlign: "center" },
				});
			}
		  }
		  
		  
		  const onResetPassword = (email) => {
			console.log(email)
		  }

		  const form = (
			  <View style={{width:"100%", opacity:0.8,marginTop:60, paddingRight:15, backgroundColor:"#FEFEFE"}}>
			<Form>
				<Field name="email" component={this.renderInput} validate={[email, required]} />
				<Field
					name="password"
					component={this.renderInput}
					validate={[required]}
				/>
			</Form>
			</View>
		);
		
		return (
			this.props.username?null:<DumbLoginScreen form={form} onLogin={onLogin} onFbLogin={this.fbLogin} onResetPassword={onResetPassword} loginLoading={this.props.loginLoading}/>
		);
    }
}

const LoginContainer = reduxForm({
	form: "login",
})(LoginScreen);

const mapStateToProps = state => ({
	show: state.showAbout,
	username: state.sessionStore.username,
	token: state.sessionStore.token,
	fbInfo: state.fbInfo,
	inventory: state.inventory,
	noLocation: state.noLocation,
	loginForm: state.form.login,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
