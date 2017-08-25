import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

class FBLogin extends Component{

	constructor(props) {
		super(props);
	}
	
    async postFbInfo(){
   // 	let response = await fetch(this.props.host+'api/fbInfo?deviceId='+this.props.deviceInfo.getUniqueID()+'&lat='+this.props.location.latitude+'&lng='+this.props.location.longitude+'&fbId='+this.props.fbInfo.id)
	//	    let responseJson = await response;
    }

	render() {
	    return (
	      <View style={{position:"absolute", bottom:20}}>
	        <LoginButton
	          readPermissions={["public_profile","email"]}
	          onLoginFinished={
	            (error, result) => {
	              if (error) {
	                alert("Login failed with error: " + result.error);
	              } else if (result.isCancelled) {
	                alert("Login was cancelled");
	              } else {
									this.props.loginSuccessful();
	                AccessToken.getCurrentAccessToken().then((data) => {
	                    const { accessToken } = data
											console.log(accessToken);
		          		  fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
		          		  .then((response) => response.json())
		          		  .then((json) => {
		          		    this.props.onLogin(json);
		          		    //this.postFbInfo();
		          		  })
		          		  .catch(() => {
		          		    reject('ERROR GETTING DATA FROM FACEBOOK')
		          		  })

	                  })
	              }
	            }
	          }
	          onLogoutFinished={() => this.props.doLogout() }/>
	      </View>
	    );
	  }
}


const mapStateToProps = state => ({
	show: state.showAbout,
	deviceInfo: state.deviceInfo,
	fbInfo: state.sessionStore.fbInfo,
	location: state.location,
	host: state.host
})

const mapDispatchToProps = (dispatch) => ({
	doLogout: () => { dispatch({ type: 'LOGOUT' }) },
	loginSuccessful: () => { dispatch({ type: 'LOGIN_SUCCESSFUL' }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(FBLogin)