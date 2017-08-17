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
	      <View>
	        <LoginButton
	          readPermissions={["public_profile"]}
	          onLoginFinished={
	            (error, result) => {
	              if (error) {
	                alert("Login failed with error: " + result.error);
	              } else if (result.isCancelled) {
	                alert("Login was cancelled");
	              } else {
	                AccessToken.getCurrentAccessToken().then((data) => {
	                    const { accessToken } = data
		          		  fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
		          		  .then((response) => response.json())
		          		  .then((json) => {
		          		    this.props.setFbInfo(json);
		          		    //this.postFbInfo();
		          		  })
		          		  .catch(() => {
		          		    reject('ERROR GETTING DATA FROM FACEBOOK')
		          		  })

	                  })
	              }
	            }
	          }
	          onLogoutFinished={() => this.props.setFbInfo(null) }/>
	      </View>
	    );
	  }
}


const mapStateToProps = state => ({
	show: state.showAbout,
	deviceInfo: state.deviceInfo,
	fbInfo: state.fbInfo,
	location: state.location,
	host: state.host
})

const mapDispatchToProps = (dispatch) => ({
	setFbInfo: (info) => { dispatch({ type: 'LOGIN', info:info }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(FBLogin)