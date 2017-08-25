import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';

class EmptyDataSet extends Component{

	constructor(props) {
		super(props);
	}
	
    async postFbInfo(){
   // 	let response = await fetch(this.props.host+'api/fbInfo?deviceId='+this.props.deviceInfo.getUniqueID()+'&lat='+this.props.location.latitude+'&lng='+this.props.location.longitude+'&fbId='+this.props.fbInfo.id)
	//	    let responseJson = await response;
    }

	render() {
	    return (
	      <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center", height:"80%", width:"100%"}}>
	        <MediqText style={{color:"white", padding:20}}>You have no appointments scheduled.</MediqText>
            <Button title="Schedule an Appointment"/>
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