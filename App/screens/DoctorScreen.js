import React, { Component } from 'react';
import { Platform, StyleSheet,  Linking, View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';
import AppointmentList from '../components/AppointmentList.js';

const styles = StyleSheet.create({
	vitalsSection: {
		flexDirection:'column',
		alignItems:'center',
		width:"100%",
		padding:10,
		backgroundColor:"#EFEFEF"
	},
	notesSection: {
		flexDirection:'column',
		alignItems:'center',
		width:"100%",
		padding:10,
	},
	  sectionHeader: {
	    fontWeight:"bold",
	    fontSize:15,
	  },
	  vitals: {
		  flexDirection:"column",
		  alignItems:"center",
		  paddingLeft:8,
		  paddingRight:8
	  },
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


const DumbDoctorScreen = (props) => (
	<View style={{
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
  	    right: 0,
  	    bottom: 0,
  	    backgroundColor:'white',
  	    borderRadius:10,
  	    flexDirection:'column',
  	    alignItems:'center',
	}}>
		<Image fadeDuration={0} style={{position:'absolute',height:'100%', width:'100%'}} source={require('../img/background.png')} />
		<View style={{flexDirection: "row", padding:10, width:"100%", backgroundColor:"white"}}>
			<Image style={{height:100, width:100}} resizeMode="center" source={require('../img/doctor.png')}/>
			<View style={{flexDirection: "column", padding:10, width:"100%"}}>
				<MediqText style={{textAlign:'left', padding:5, fontSize:20}}>{props.doctor.lastName}, {props.doctor.firstName}</MediqText>
				<Text style={{backgroundColor:'transparent', textAlign:'left', padding:5, fontSize:15}}>{props.doctor.mobile}</Text>
				<Text adjustsFontSizeToFit={true} numberOfLines={1}  style={{backgroundColor:'transparent', textAlign:'left', padding:5, fontSize:18}}>{props.doctor.email}</Text>
				</View>
		</View>
		<View style={{flexDirection: "column", padding:10, width:"100%", backgroundColor:"white"}}>
			<MediqText style={{textAlign:"center",fontSize:15, fontWeight:"bold"}}>Clinic Schedule</MediqText>
			{props.schedule}
		</View>
	</View>
);

const DumbScheduleView = (props) => (
	<View style={{flexDirection: "row", alignItems:"center", padding:15, width:"100%"}}>
		<MediqText style={{width:"20%",backgroundColor:'transparent', textAlign:'center', }}>{props.schedule.day}</MediqText>
		<MediqText style={{width:"20%",backgroundColor:'transparent', textAlign:'center', }}>{props.schedule.time}</MediqText>
		<MediqText style={{width:"60%",backgroundColor:'transparent', textAlign:'center', }}>{props.schedule.clinic}</MediqText>
		</View>
);


class DoctorScreen extends Component {
	static navigationOptions = {
	    title: 'Doctor',
	  };

	  constructor(props) {
		super(props);
	}

	render() {
		var schedule = [];
		for(var i in this.props.doctor.schedule){
			schedule.push(<DumbScheduleView key={i} schedule={this.props.doctor.schedule[i]}/>)
        }
		return (
			this.props.doctor?<DumbDoctorScreen doctor={this.props.doctor} schedule={schedule}/> : null
		);
    }

}

const mapStateToProps = state => ({
	show: state.showAbout,
	fbInfo: state.fbInfo,
	doctor: state.doctorStore.doctor,
})

const mapDispatchToProps = (dispatch) => ({
	showAppointment: (appointment) => { dispatch({ type: 'SHOW_APPOINTMENT', appointment:appointment}) }
})

export default connect(mapStateToProps, mapDispatchToProps)(DoctorScreen)
