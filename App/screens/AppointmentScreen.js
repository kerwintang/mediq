import React, { Component } from 'react';
import { Platform, StyleSheet,  Linking, View, Text, TextInput, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';

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


const DumbAppointmentScreen = (props) => (
	<View style={{
  	    position: 'absolute',
  	    top: 5,
  	    left: 5,
  	    right: 5,
  	    bottom: 5,
  	    backgroundColor:'white',
  	    borderRadius:10,
  	    flexDirection:'column',
  	    alignItems:'center',
	}}>
		<View style={{
			flexDirection:'row',
			alignItems:'center',
		}}>
			<TouchableWithoutFeedback onPress={props.viewPatient}>
			<View style={{width:"20%", flexDirection: "column", alignItems:"center", paddingTop:10}}>
			<ActivityIndicator
			style={{position:"absolute", height:50, width:50, paddingTop:5}}
          />
				{props.appointment.patient.id?<Image style={{height:50, width:50, borderRadius:25}} resizeMode="center" source={{uri:'https://s3-ap-southeast-1.amazonaws.com/mediq-assets/patient'+props.appointment.patient.id+'.png'}}/>:
				<Image style={{height:50, width:50}} resizeMode="center" source={require('../img/user.png')}/>}
				<MediqText style={{backgroundColor:'transparent', textAlign:'left', paddingBottom:10, fontSize:10}}>{props.appointment.patient.firstName}</MediqText>
			</View>
			</TouchableWithoutFeedback>
			<View style={{flexDirection:"column", alignItems:"center", width:"60%"}}>
				<MediqText style={{backgroundColor:'transparent', textAlign:'left', fontSize:14}}>{props.appointment.date.weekday}, {props.appointment.date.month} {props.appointment.date.day}</MediqText>
				<MediqText style={props.appointment.status=="Completed"?styles.completedStatus:props.appointment.status=="Scheduled"?styles.scheduledStatus:styles.cancelledStatus}>{props.appointment.status}</MediqText>
				<Text adjustsFontSizeToFit={true} numberOfLines={1} style={{paddingTop:5, backgroundColor:'transparent', textAlign:'left', fontSize:14}}>{props.appointment.clinic.name}, {props.appointment.clinic.schedule}</Text>
			</View>
			<View style={{width:"20%", flexDirection: "column", alignItems:"center", paddingTop:10}}>
				<Image style={{height:50, width:50}} resizeMode="center" source={require('../img/doctor.png')}/>
				<MediqText style={{backgroundColor:'transparent', textAlign:'left', paddingBottom:10, fontSize:10}}>{props.appointment.doctor.name}</MediqText>
			</View>
		</View>
		<View style={styles.vitalsSection}>
			<TouchableWithoutFeedback onPress={props.editVitals}>
				<View>
					<MediqText style={styles.sectionHeader}>
						Vitals <Image style={{height:15, width:15}} resizeMode="center" source={require('../img/edit.png')}/>
					</MediqText>
				</View>
			</TouchableWithoutFeedback>
			<View style={{flexDirection:"row"}}>
			{props.vitals}
			</View>
		</View>
		<View style={styles.notesSection}>
			<TouchableWithoutFeedback onPress={props.editNotes}>
			<View>
				<MediqText style={styles.sectionHeader}>
					Doctor's Notes <Image style={{height:15, width:15}} resizeMode="center" source={require('../img/edit.png')}/>
				</MediqText>
			</View>
			</TouchableWithoutFeedback>
			{props.editingNotes?<TextInput autoFocus={true} multiline={true} style={{width:"100%"}}>{props.appointment.notes}</TextInput>:<MediqText>{props.appointment.notes}</MediqText>}
		</View>
	</View>
);

const DumbVitals = (props) => (
	<View style={styles.vitals}>
		<MediqText style={{fontSize:12, fontWeight:"bold"}}>{props.vitals.name}</MediqText>
		<MediqText style={{fontSize:20}}>{props.vitals.value}</MediqText>
	</View>
);



class AppointmentScreen extends Component {
	static navigationOptions = {
	    title: 'Appointment',
	  };

	  constructor(props) {
		super(props);
		this.viewPatient = this.viewPatient.bind(this);
	}

	viewPatient() {
		this.props.showPatient(this.props.appointment.patient)
		this.props.navigation.navigate("Patient");
	}
	
	render() {
		var vitals = [];
		//for(var i in this.props.appointments){
		for(var i in this.props.appointment.vitals){
			vitals.push(<DumbVitals key={i} vitals={this.props.appointment.vitals[i]}/>)
		}

		return (
			this.props.appointment?<DumbAppointmentScreen appointment={this.props.appointment} vitals={vitals} viewPatient={this.viewPatient} editVitals={this.props.editVitals} editNotes={this.props.editNotes} editingVitals={this.props.editingVitals} editingNotes={this.props.editingNotes}/> : null
		);
    }
}

const mapStateToProps = state => ({
	show: state.showAbout,
	fbInfo: state.fbInfo,
	editingVitals: state.appointmentStore.editVitals,
	editingNotes: state.appointmentStore.editNotes,
	appointment: state.appointmentStore.appointment
})

const mapDispatchToProps = (dispatch) => ({
	showPatient: (patient) => { dispatch({ type: 'SHOW_PATIENT', patient:patient }) },
	editVitals: () => { dispatch({ type: 'EDIT_VITALS' }) },
	editNotes: () => { dispatch({ type: 'EDIT_NOTES' }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScreen)
