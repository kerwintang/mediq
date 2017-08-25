import React, { Component } from 'react';
import { Platform, Linking, View, Text, Image, TouchableWithoutFeedback, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import FBLogin from '../components/FBLogin.js';
import MediqText from '../components/MediqText.js';
import Login from 'react-native-simple-login'

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
		<Image fadeDuration={0} style={{position:'absolute',height:'100%', width:'100%'}} source={require('../img/doctor.jpg')} />
		<View style={{
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor:'black',
			opacity:0.7
		}}>
		</View>
		<Image fadeDuration={0} style={{height:50, width:50, padding: 100}} source={require('../img/mediq.png')} />

		<Login
		loginFormWrapperStyle={{width:"90%"}}
		loginResetPasswordLinkTextStyle={{backgroundColor:"transparent", color:"white"}}
		onLogin={props.onLogin}
		onResetPassword={props.onResetPassword}
		inputStyle={{color:"white", padding:10, marginLeft:20}}
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
	{ id:1, 
		firstName:"Kerwin",
		lastName:"Tang",
		email:"kerwintang@gmail.com", 
		mobile:"09778224980",
		password:"password", 
		role:"patient"},
	{
		id:2,
		firstName:"Kwak",
		lastName:"Kwak",
		email:"Doctor@gmail.com",
		mobile:"09171111111",
		password:"password",
		role:"doctor",
		schedule:[
			{day:"Mon", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"},
			{day:"Tues", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"},
			{day:"Wed", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"},
			{day:"Thurs", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"},
			{day:"Fri", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"},
			{day:"Sat", time:"1-4PM", clinic:"Makati Medical Center Rm. 237"}
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

	authenticate(username, password){
		var user = this.getUser(username);
		if(user.password==password){
			this.props.authenticated();
			return user;
		}
		return null;
	}

	getUser(username){
		for(var i=0;i<users.length;i++){
			var user = users[i];
			if(users[i].email==username){
				return users[i];
			}
		}
		return null;
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

	render() {
		const onLogin = (email, password) => {
			var user = this.authenticate(email, password);
			this.props.doLogin(user);
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
	doLogin: (user) => { dispatch({ type: 'LOGIN', user:user }) },
	doFbLogin: (fbInfo, user) => { dispatch({ type: 'FB_LOGIN', fbInfo:fbInfo, user:user }) },
	setFbInfo: (fbInfo) => { dispatch({ type: 'SET_FB_INFO', fbInfo:fbInfo }) },
	authenticated: () => { dispatch({ type: 'LOGIN_SUCCESSFUL' }) },
	hideLoginLoading: () => { dispatch({ type:'HIDE_LOGIN_LOADING'})},
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
