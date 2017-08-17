import React, { Component } from 'react';
import { Platform, Linking, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import FBLogin from './FBLogin.js';


const DumbLoginScreen = (props) => (
	<View style={{
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
  	    right: 0,
  	    bottom: 0,
  	    backgroundColor:'white',
  	    flexDirection:'column',
  	    alignItems:'center',
  	    justifyContent:'center'
	}}>
		<Text>Doctor App</Text>
		<FBLogin/>
	</View>
);

const DumbCardImage = (props) => (
	<View style={{borderWidth:1}}>
		
	</View>
);



class LoginScreen extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			this.props.username?null:<DumbLoginScreen/>
		);
    }
}

const mapStateToProps = state => ({
	show: state.showAbout,
	username: state.sessionStore.username,
	fbInfo: state.fbInfo,
	inventory: state.inventory,
	noLocation: state.noLocation
})

const mapDispatchToProps = (dispatch) => ({
	hideAbout: () => { dispatch({ type: 'HIDE_ABOUT' }) },
	showAbout: () => { dispatch({ type: 'SHOW_ABOUT' }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
