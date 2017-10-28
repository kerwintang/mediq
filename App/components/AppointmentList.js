import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableWithoutFeedback, Button, StyleSheet, ActivityIndicator } from 'react-native';
import MediqText from './MediqText.js';
import ProfilePicture from './ProfilePicture.js';
import Styles from '../styles/Styles.js';
import EmptyDataSet from './EmptyDataSet';

const moment = require("moment");

const DumbAppointmentList = (props) => (
    <ScrollView style={{flexDirection:'column', paddingTop:5}} contentContainerStyle={{paddingBottom:40}}>
        <View style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        }}>
        {props.appointments}
        </View>
    </ScrollView>
);

const DumbAppointmentUserView = (props) => (
	<TouchableWithoutFeedback onPress={()=>{props.onPress(props.appointment); props.navigation.navigate("Appointment")}}>
	<View style={{
		flexDirection: 'row',
		height:80, 
		backgroundColor:"white",
		alignItems:'center',
		marginBottom:1
	}}>
		<View style={{flexDirection:"column", alignItems:"center", width:"25%"}}>
			<MediqText style={{backgroundColor:'transparent', textAlign:'left', fontSize:22, color:"#3333FF"}}>{props.appointment.date.month} {props.appointment.date.day}</MediqText>
			<MediqText style={{backgroundColor:'transparent', textAlign:'left', fontSize:12, color:"#3333FF"}}>{props.appointment.date.weekday}</MediqText>
		</View>
        <View style={{flexDirection:"column", width:"55%"}}>
    		<MediqText style={{backgroundColor:'transparent', textAlign:'left', fontSize:15}}>{props.appointment.Patient.name}'s Appointment</MediqText>
        </View>
		<View style={{width:"20%", flexDirection: "column", alignItems:"center", paddingTop:10}}>
			<Image style={{height:50, width:50}} resizeMode="center" source={require('../img/doctor.png')}/>
			<MediqText style={{backgroundColor:'transparent', textAlign:'left', paddingBottom:10, fontSize:10}}>{props.appointment.doctor.name}</MediqText>
		</View>
	</View>
	</TouchableWithoutFeedback>
);

const DumbAppointmentHistoryView = (props) => (
	<TouchableWithoutFeedback onPress={()=>{props.onPress(props.appointment); props.navigation.navigate("Appointment")}}>
	<View style={{
		flexDirection: 'row',
		backgroundColor:"white",
		borderBottomWidth:1,
		borderColor:Styles.colors.paleGrey,
		padding:5
	}}>
        <View style={{flexDirection:"column", alignItems:"center", width:"25%"}}>
			<ProfilePicture profile={props.appointment.Doctor.Profile} type="doctor" />
			<MediqText style={{fontSize:10}}>Dr. {props.appointment.Doctor.Profile.lastName}</MediqText>
        </View>
        <View style={{flexDirection:"column", width:"75%"}}>
			<View style={{flexDirection:"row"}}>
	            <MediqText style={{backgroundColor:'transparent', textAlign:'left', fontSize:18, color:"#0F3D68"}}>{moment(props.appointment.date).format("MM/DD/YYYY")} </MediqText>
				<MediqText style={props.appointment.status=="COMPLETED"?Styles.styles.completedStatus:props.appointment.status=="SCHEDULED"?Styles.styles.scheduledStatus:Styles.styles.cancelledStatus}>{props.appointment.status}</MediqText>
			</View>
            <MediqText adjustsFontSizeToFit={true} numberOfLines={1} style={{paddingTop:5, backgroundColor:'transparent', textAlign:'left', fontSize:14}}>{props.appointment.ClinicSchedule.Clinic.name}, {props.appointment.ClinicSchedule.Clinic.room}</MediqText>
            <MediqText adjustsFontSizeToFit={true} numberOfLines={1} style={{paddingTop:5, backgroundColor:'transparent', textAlign:'left', fontSize:14}}>{props.appointment.ClinicSchedule.Schedule.startTime} - {props.appointment.ClinicSchedule.Schedule.endTime}</MediqText>
			</View>
	</View>
	</TouchableWithoutFeedback>
);

const DumbAppointmentScheduleView = (props) => (
	<TouchableWithoutFeedback onPress={()=>{props.onPress(props.appointment); props.navigation.navigate("Appointment")}}>
	<View style={{
		flexDirection: 'row',
		backgroundColor:"white",
		borderBottomWidth:1,
		borderColor:Styles.colors.paleGrey,
		padding:5
	}}>
        <View style={{flexDirection:"column", alignItems:"center", width:"25%"}}>
			<ProfilePicture profile={props.appointment.Patient} style={{height:60, width:60, borderRadius:30}} type="patient" />
        </View>
        <View style={{flexDirection:"column", width:"75%"}}>
			<MediqText style={props.appointment.status=="COMPLETED"?Styles.styles.completedStatus:props.appointment.status=="SCHEDULED"?Styles.styles.scheduledStatus:Styles.styles.cancelledStatus}>{props.appointment.status}</MediqText>
			<MediqText style={{paddingTop:5, textAlign:'left', color:Styles.colors.twilightBlue, fontSize:18}}>{props.appointment.Patient.firstName} {props.appointment.Patient.lastName}</MediqText>
			<MediqText style={{paddingTop:5, textAlign:'left', color:Styles.colors.purpleyGrey, fontSize:14}}>{props.appointment.Patient.birthday?moment().diff(props.appointment.Patient.birthday,'years') +" years old":"No birthday specified"}</MediqText>
			</View>
	</View>
	</TouchableWithoutFeedback>
);

const DumbAppointmentHomeView = (props) => (
	<TouchableWithoutFeedback onPress={()=>{props.onPress(props.appointment); props.navigation.navigate("Appointment")}}>
	<View style={{
		flexDirection: 'row',
		backgroundColor:"white",
		borderBottomWidth:1,
		borderColor:Styles.colors.paleGrey,
		padding:5
	}}>
        <View style={{flexDirection:"column", alignItems:"center", width:"25%"}}>
			<ProfilePicture profile={props.appointment.Patient} style={{height:60, width:60, borderRadius:30}} type="patient" />
			<MediqText style={{fontSize:10}}>{props.appointment.Patient.firstName} {props.appointment.Patient.lastName}</MediqText>
        </View>
        <View style={{flexDirection:"column", width:"75%"}}>
			<MediqText style={props.appointment.status=="COMPLETED"?Styles.styles.completedStatus:props.appointment.status=="SCHEDULED"?Styles.styles.scheduledStatus:Styles.styles.cancelledStatus}>{props.appointment.status}</MediqText>
			<MediqText style={{paddingTop:5, textAlign:'left', color:Styles.colors.twilightBlue, fontSize:18}}>Dr. {props.appointment.Doctor.Profile.firstName} {props.appointment.Doctor.Profile.lastName}</MediqText>
			<View style={{flexDirection:"row"}}>
	            <MediqText style={{backgroundColor:'transparent', textAlign:'left', fontSize:15, color:"#0F3D68"}}>{moment(props.appointment.date).format("MM/DD/YYYY")} {props.appointment.ClinicSchedule.Schedule.startTime} - {props.appointment.ClinicSchedule.Schedule.endTime}</MediqText>
			</View>
            <MediqText adjustsFontSizeToFit={true} numberOfLines={1} style={{paddingBottom:5, backgroundColor:'transparent', textAlign:'left', fontSize:14}}>{props.appointment.ClinicSchedule.Clinic.name}, {props.appointment.ClinicSchedule.Clinic.room}</MediqText>
			</View>
	</View>
	</TouchableWithoutFeedback>
);

export default class AppointmentList extends Component {
	
	constructor(props) {
		super(props);
	}
	
	
	render() {
		var appointments = [];
		//for(var i in this.props.appointments){
		for(var i in this.props.appData){
            if(this.props.type=="history"){
                appointments.push(<DumbAppointmentHistoryView key={i} schedule={this.props.schedule} appointment={this.props.appData[i]} navigation={this.props.navigation} onPress={this.props.onPress}/>)
            }else if(this.props.type=="schedule"){
				appointments.push(<DumbAppointmentScheduleView key={i} schedule={this.props.schedule} appointment={this.props.appData[i]} navigation={this.props.navigation} onPress={this.props.onPress}/>)
			}else if(this.props.type=="home"){
                appointments.push(<DumbAppointmentHomeView key={i} schedule={this.props.schedule} appointment={this.props.appData[i]} navigation={this.props.navigation} onPress={this.props.onPress}/>)
            }
		}
		return (
			<DumbAppointmentList title={this.props.title} appointments={appointments}/>
		);
    }
}
