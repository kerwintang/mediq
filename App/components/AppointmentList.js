import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button, StyleSheet, ActivityIndicator } from 'react-native';
import MediqText from './MediqText.js';

const styles = StyleSheet.create({
	  completedStatus: {
		color:"#00B300",
		fontSize:20
	},
	scheduledStatus: {
		color:"#3333FF",
		fontSize:20
	},
	cancelledStatus: {
		color:"#FF0000",
		fontSize:20
	}
});

const DumbAppointmentList = (props) => (
    <View style={{flexDirection:'column', alignItems:'center'}}>
        <MediqText style={{fontSize:20, padding:20, backgroundColor:"transparent",color:"white"}}>{props.title}</MediqText>
        <View style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        }}>
        {props.appointments}
        </View>
    </View>
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
    		<MediqText style={{backgroundColor:'transparent', textAlign:'left', fontSize:15}}>{props.appointment.patient.name}'s Appointment</MediqText>
        </View>
		<View style={{width:"20%", flexDirection: "column", alignItems:"center", paddingTop:10}}>
			<Image style={{height:50, width:50}} resizeMode="center" source={require('../img/doctor.png')}/>
			<MediqText style={{backgroundColor:'transparent', textAlign:'left', paddingBottom:10, fontSize:10}}>{props.appointment.doctor.name}</MediqText>
		</View>
	</View>
	</TouchableWithoutFeedback>
);

const DumbAppointmentDoctorView = (props) => (
	<TouchableWithoutFeedback onPress={()=>{props.onPress(props.appointment); props.navigation.navigate("Appointment")}}>
	<View style={{
		flexDirection: 'row',
		height:80, 
		backgroundColor:"white",
		alignItems:'center',
		marginBottom:1
	}}>
        <View style={{width:"20%", flexDirection: "column", alignItems:"center", paddingTop:10}}>
		<ActivityIndicator
			style={{position:"absolute", height:50, width:50, paddingTop:5}}
          />
			{props.appointment.patient.id?<Image style={{height:50, width:50, borderRadius:25}} resizeMode="center" source={{uri:'https://s3-ap-southeast-1.amazonaws.com/mediq-assets/patient'+props.appointment.patient.id+'.png'}}/>:
			<Image style={{height:50, width:50}} resizeMode="center" source={require('../img/user.png')}/>}
			<MediqText style={{backgroundColor:'transparent', textAlign:'left', paddingBottom:10, fontSize:10}}>{props.appointment.patient.firstName}</MediqText>
		</View>
        <View style={{flexDirection:"column", width:"60%"}}>
            <MediqText style={props.appointment.status=="Completed"?styles.completedStatus:props.appointment.status=="Scheduled"?styles.scheduledStatus:styles.cancelledStatus}>{props.appointment.status}</MediqText>
            <MediqText style={{backgroundColor:'transparent', textAlign:'left', fontSize:15}}>{props.appointment.patient.lastName}, {props.appointment.patient.firstName} </MediqText>
            <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{paddingTop:5, backgroundColor:'transparent', textAlign:'left', fontSize:14}}>{props.appointment.clinic.name}, {props.appointment.clinic.schedule}</Text>
	    </View>
		<View style={{width:"20%", flexDirection: "column", alignItems:"center", paddingTop:10}}>
			<Image style={{height:50, width:50}} resizeMode="center" source={require('../img/doctor.png')}/>
			<MediqText style={{backgroundColor:'transparent', textAlign:'left', paddingBottom:10, fontSize:10}}>{props.appointment.doctor.name}</MediqText>
		</View>
	</View>
	</TouchableWithoutFeedback>
);

const DumbAppointmentProfileView = (props) => (
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
        <View style={{flexDirection:"column", width:"75%"}}>
            <MediqText style={props.appointment.status=="Completed"?styles.completedStatus:props.appointment.status=="Scheduled"?styles.scheduledStatus:styles.cancelledStatus}>{props.appointment.status}</MediqText>
            <MediqText style={{backgroundColor:'transparent', textAlign:'left', fontSize:15}}>{props.appointment.patient.lastName}, {props.appointment.patient.firstName} </MediqText>
            <MediqText adjustsFontSizeToFit={true} numberOfLines={1} style={{paddingTop:5, backgroundColor:'transparent', textAlign:'left', fontSize:14}}>{props.appointment.clinic.name}, {props.appointment.clinic.schedule}</MediqText>
    </View>
	</View>
	</TouchableWithoutFeedback>
);

export default class AppointmentList extends Component {
	static navigationOptions = {
	    title: 'Medi-Q',
	    headerRight: <Button title="Logout" />,
	  };
	
	constructor(props) {
		super(props);
	}
	
	
	render() {
		var appointments = [];
		//for(var i in this.props.appointments){
		for(var i in this.props.appData){
            if(this.props.type=="profile"){
                appointments.push(<DumbAppointmentProfileView key={i} appointment={this.props.appData[i]} navigation={this.props.navigation} onPress={this.props.onPress}/>)
            }else{
                appointments.push(<DumbAppointmentDoctorView key={i} appointment={this.props.appData[i]} navigation={this.props.navigation} onPress={this.props.onPress}/>)
            }
		}
		return (
			<DumbAppointmentList title={this.props.title} appointments={appointments}/>
		);
    }
}
