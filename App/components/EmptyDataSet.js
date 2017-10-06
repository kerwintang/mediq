import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';

class EmptyDataSet extends Component{

	constructor(props) {
		super(props);
	}
	
	render() {
		const images = {
			list:require("../img/list.png")
		}
	    return (
	      <View style={{flexDirection:"column", paddingTop:"20%", alignItems:"center", height:"100%", width:"100%", backgroundColor:"#EEEEEE"}}>
	        <Image style={{height:100, width:100}} resizeMode="center" source={images[this.props.icon]}/>
	        <MediqText style={{color:"gray", padding:20, fontSize:18}}>{this.props.title}</MediqText>
	        <MediqText style={{color:"gray", padding:20, textAlign:"center"}}>{this.props.message}</MediqText>
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

export default connect(mapStateToProps, mapDispatchToProps)(EmptyDataSet)