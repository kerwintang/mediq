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


const DumbPatientScreen = (props) => (
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
			{props.patient.id?<Image style={{height:100, width:100, borderRadius:50}} resizeMode="center" source={{uri:'https://s3-ap-southeast-1.amazonaws.com/mediq-assets/patient'+props.patient.id+'.png'}}/>:
			<Image style={{height:100, width:100}} resizeMode="center" source={require('../img/user.png')}/>}
			<View style={{flexDirection: "column", padding:10, width:"100%"}}>
				<MediqText style={{backgroundColor:'transparent', textAlign:'left', padding:5, fontSize:20}}>{props.patient.lastName}, {props.patient.firstName}</MediqText>
				<Text adjustsFontSizeToFit={true} numberOfLines={1} style={{backgroundColor:'transparent', textAlign:'left', padding:5, fontSize:15}}>{props.patient.address}</Text>
				<Text adjustsFontSizeToFit={true} numberOfLines={1}  style={{backgroundColor:'transparent', textAlign:'left', padding:5, fontSize:18}}>Birthday: {props.patient.birthday}</Text>
			</View>
		</View>
		<AppointmentList title="Appointments" appData={props.appointments} type={"profile"} navigation={props.navigation} onPress={props.onPress}/>
		<View style={{flexDirection: "row", padding:10, width:"100%"}}>
		</View>
	</View>
);

const DumbVitals = (props) => (
	<View style={styles.vitals}>
		<MediqText style={{fontSize:12, fontWeight:"bold"}}>{props.vitals.name}</MediqText>
		<MediqText style={{fontSize:20}}>{props.vitals.value}</MediqText>
	</View>
);



class PatientScreen extends Component {
	static navigationOptions = {
	    title: 'Patient',
	  };

	  constructor(props) {
		super(props);
		this.viewPatient = this.viewPatient.bind(this);
	}

	viewPatient() {
		this.props.navigation.navigate("Patient");
	}
	
	render() {
		const appData = [
			{id:2, date: {day:"28", month: "Aug", weekday:"Monday"}, patient:{firstName:"Jamie", lastName:"Tang"}, doctor: {name:'Dr. Apostol'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM"}, status:"Scheduled" },
			{id:1, date: {day:"8", month: "Aug", weekday:"Tuesday"}, patient:{firstName:"Jamie", lastName:"Tang"}, doctor: {name:'Dr. Apostol'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM"}, status:"Completed", vitals:[{name:"height",value:"100cm"},{name:"weight",value:"100lbs"}], notes:"Bedrest for 2 weeks" },
			{id:1, date: {day:"15", month: "Jul", weekday:"Tuesday"}, patient:{firstName:"Jamie", lastName:"Tang"}, doctor: {name:'Dr. Apostol'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM"}, status:"Completed", vitals:[{name:"height",value:"95cm"},{name:"weight",value:"90lbs"}], notes:"OK" },
			{id:1, date: {day:"7", month: "Jun", weekday:"Tuesday"}, patient:{firstName:"Jamie", lastName:"Tang"}, doctor: {name:'Dr. Apostol'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM"}, status:"Completed", vitals:[{name:"height",value:"92cm"},{name:"weight",value:"85lbs"}], notes:"" },
			{id:1, date: {day:"5", month: "May", weekday:"Tuesday"}, patient:{firstName:"Jamie", lastName:"Tang"}, doctor: {name:'Dr. Apostol'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM"}, status:"Completed", vitals:[{name:"height",value:"90cm"},{name:"weight",value:"80lbs"}], notes:"Done" },
		];

		return (
			this.props.patient?<DumbPatientScreen patient={this.props.patient} viewPatient={this.viewPatient} appointments={appData} navigation={this.props.navigation} onPress={this.props.showAppointment}/> : null
		);
    }

}

const mapStateToProps = state => ({
	show: state.showAbout,
	fbInfo: state.fbInfo,
	patient: state.patientStore.patient
})

const mapDispatchToProps = (dispatch) => ({
	showAppointment: (appointment) => { dispatch({ type: 'SHOW_APPOINTMENT', appointment:appointment}) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientScreen)
