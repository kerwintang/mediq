import React, { Component } from 'react';
import { Animated, Easing, Alert, StyleSheet,  Button, View, Text, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';
import AppointmentList from '../components/AppointmentList.js';
import AppointmentFormScreen from '../screens/AppointmentFormScreen.js';
import Styles from '../styles/Styles.js';

const moment = require("moment");

const DumbScheduleScreen = (props) => (
	<View style={{
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor:'#F2F4F8',
		borderRadius:10,
		flexDirection:'column',
		alignItems:'center',
		padding:5
  }}>
	  <View style={{flexDirection: "row", padding:10, width:"100%", backgroundColor:"white"}}>
		  <View style={{flexDirection: "column", width:"100%"}}>
			  <MediqText style={{backgroundColor:'transparent', textAlign:'left', padding:3, fontSize:20, color:Styles.colors.twilightBlue}}>Dr. {props.doctor.lastName}'s clinic</MediqText>
			  <MediqText style={{backgroundColor:'transparent', textAlign:'left', padding:3, fontSize:15, color:Styles.colors.purpleyGrey}}>{moment(props.date).format("dddd, MMMM D, YYYY")}, {props.schedule.startTime} to {props.schedule.endTime}</MediqText>
			  <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{backgroundColor:'transparent', textAlign:'left', padding:5, fontSize:15, color:Styles.colors.purpleyGrey}}>{props.schedule.Clinic.name} {props.schedule.Clinic.room}</Text>
		  </View>
	  </View>
	  <View style={{flexDirection: "row", width:"100%", backgroundColor:"white", marginTop:1}}>
  				<TouchableOpacity onPress={()=>{ 
					  // TODO: Cancel Clinic
					Alert.alert(
							"Cancel Clinic",
							"Are you sure you want to cancel this clinic schedule?",
							[
								{text: 'Cancel', onPress: () => console.log("Cancelled"), style: 'cancel'},
								{text: 'OK', onPress: props.doCancelClinic},
							]
						)
				}} style={{width:"50%", justifyContent:"center", alignItems:"center", padding:10}}>
					<Text style={Styles.styles.pageHeaderButton}>CANCEL CLINIC</Text>
				</TouchableOpacity>
  				<TouchableOpacity onPress={()=>{ 
					  //TODO: Push Notification to Patients
				}} style={{width:"50%", justifyContent:"center", alignItems:"center", padding:10}}>
					<Text style={Styles.styles.pageHeaderButton}>SEND MESSAGE</Text>
				</TouchableOpacity>
			</View>
	  <AppointmentList title="Appointments" appData={props.appointments} type={"doctor"} navigation={props.navigation} onPress={props.onPress}/>
	  <View style={Styles.styles.pageFooterButton}>
		<TouchableOpacity onPress={props.newAppointment}>
			<MediqText style={Styles.styles.pageFooterButtonText}>+NEW APPOINTMENT</MediqText>
		</TouchableOpacity>
            </View>
		{props.showAppointmentForm?<AppointmentFormScreen schedule={props.schedule} doctor={props.doctor}/>:null}
  </View>
);


class ScheduleScreen extends Component {
	static navigationOptions = {
	    title: 'Schedule',
		headerStyle: { backgroundColor:"#0F3D68" },
		headerTitleStyle: { color:"white" },
		headerBackTitleStyle: { color:"white" },
	  };
	constructor(props) { 
			super(props);
		this.cancelClinic = this.cancelClinic.bind(this);
	}

	cancelClinic(){
		// TODO: Cancel Clinic
		alert("Cancel Clinic");
	}


	render() {
		return (
			<DumbScheduleScreen navigation={this.props.navigation} 
				schedule={this.props.schedule} 
				appointments={this.props.appointments}
				doctor={this.props.profile}
				date={this.props.date}
				showAppointmentForm={this.props.showAppointmentForm} 
				newAppointment={this.props.newAppointment} 
				onPress={this.props.showAppointment} 
				doCancelClinic={this.cancelClinic}/>
		);
    }
}

const mapStateToProps = state => ({
	schedule: state.scheduleStore.schedule,
	clinicSchedule: state.scheduleStore.clinicSchedule,
	appointments: state.scheduleStore.appointments,
	showAppointmentForm: state.scheduleStore.showAppointmentForm,
	date: state.scheduleStore.date,
	profile: state.sessionStore.profile
})

const mapDispatchToProps = (dispatch) => ({
	showAppointment: (appointment) => { dispatch({ type: 'SHOW_APPOINTMENT', appointment:appointment}) },
	newAppointment: () => { dispatch({ type: 'NEW_APPOINTMENT'}) },
})

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen)
