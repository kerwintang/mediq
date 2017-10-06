import React, { Component } from 'react';
import { Animated, Easing, Platform, StyleSheet, Button, TouchableOpacity, View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';
import PatientList from '../components/PatientList.js';
import ProfileFormScreen from '../screens/ProfileFormScreen.js';
import showResults from './ShowResults.js';
import Styles from '../styles/Styles.js';
import { client } from '../actions'


const DumbAppointmentFormScreen = (props) => (
	<Animated.View style={{
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
  	    right: 0,
  	    bottom: 0,
  	    backgroundColor:'white',
  	    borderRadius:10,
  	    flexDirection:'column',
  	    alignItems:'center',
		transform: [{translateY: props.bounceValue}]
	}}>
		{props.showProfileForm?null:<MediqText style={{padding:10}}>Please select patient or add a new patient.</MediqText>}
		{props.showProfileForm?
			<ProfileFormScreen onSubmit={props.showResults} savePatient={props.savePatient} cancelPatient={props.closeProfileForm} handleFormChange={props.handleFormChange}/>
		: <PatientList navigation={props.navigation} onPress={props.selectPatient}/>}
		{props.showProfileForm?null:
			<View style={Styles.styles.pageFooterButton}>
                <View style={Styles.styles.pageFooterButtonLeft}>
                    <TouchableOpacity onPress={props.newPatient}>
                        <MediqText style={Styles.styles.pageFooterButtonText}>+NEW PATIENT</MediqText>
                    </TouchableOpacity>
                </View>
                <View style={Styles.styles.pageFooterButtonRight}>
                    <TouchableOpacity onPress={props.closeAppointment}>
                        <MediqText style={Styles.styles.pageFooterButtonTextRed}>CANCEL</MediqText>
                    </TouchableOpacity>
                </View>
            </View>
		}
	</Animated.View>
);


class AppointmentFormScreen extends Component {
	static navigationOptions = {
	    title: 'Patient',
	  };

	  constructor(props) { 
		super(props);

		this.state = {
			bounceValue: new Animated.Value(1000)
		}

		this.closeAppointmentForm = this.closeAppointmentForm.bind(this)
		this.saveAppointment = this.saveAppointment.bind(this)
	}

	showAppointmentForm(){
		Animated.timing(
			this.state.bounceValue,
			{
			  toValue: 0,
			  easing: Easing.ease,
			  duration:500
			}
		  ).start();
	}

	closeAppointmentForm(){
		Animated.timing(
			this.state.bounceValue,
			{
			  toValue:1000,
			  easing: Easing.ease,
			  duration:500
			}
		  ).start();
		setTimeout(() => { this.props.closeAppointmentForm(); },500);
	}

	componentWillReceiveProps(nextProps){
		if(!this.props.showAppointmentForm && nextProps.showAppointmentForm){
		this.showAppointmentForm();
		}
	}

	componentDidMount(){
		this.showAppointmentForm();
	}

	saveAppointment(){
		this.props.saveAppointment();
		this.closeAppointmentForm();
	}

	savePatient(){
		this.props.savePatient();
		this.props.saveAppointment(this.props.profileForm, this.props.doctor, this.props.schedule);
		this.closeAppointmentForm();
	}

	selectPatient(patient){
		client.post('/api/appointment', {
			schedule:this.props.schedule,
			date: this.props.date,
			patient:patient
		},
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			this.props.setClinicSchedule(res.data.clinicSchedule);
			setTimeout(()=>{this.props.reloadScheduleList()},10);
			this.closeAppointmentForm();
		}).catch((err) => {
			alert("ERROR: "+err);
			this.closeAppointmentForm();
		});
	}
	render() {
		return (
			this.props.showAppointmentForm?<DumbAppointmentFormScreen appointment={this.props.appointment} 
			newPatient={this.props.newPatient} bounceValue={this.state.bounceValue} 
			showProfileForm={this.props.showProfileForm}
			closeProfileForm={this.props.closeProfileForm}
			selectPatient={this.selectPatient.bind(this)} 
			savePatient={this.savePatient.bind(this)}
			handleFormChange={this.props.saveProfileForm} 
			closeAppointment={this.closeAppointmentForm}/>:null
		);
    }
}

const mapStateToProps = state => ({
	fbInfo: state.fbInfo,
	schedule: state.scheduleStore.schedule,
	appointment: state.appointmentStore.appointment,
	showAppointmentForm: state.appointmentStore.showAppointmentForm,
	showProfileForm: state.appointmentStore.showProfileForm,
	profileForm: state.patientStore.profileForm,
	date: state.scheduleStore.date,
	token: state.sessionStore.token
})

const mapDispatchToProps = (dispatch) => ({
	saveAppointmentForm: (appointmentForm) => { dispatch({ type: 'SAVE_APPOINTMENT_FORM', appointmentForm:appointmentForm}) },
	saveAppointment: (patient, doctor, schedule) => { dispatch({ type: 'SAVE_APPOINTMENT_TO_SCHEDULE', patient:patient, doctor:doctor, schedule:schedule}) },
	closeAppointmentForm: () => { dispatch({ type: 'CLOSE_APPOINTMENT_FORM'}) },
	newPatient: () => { dispatch({ type: 'NEW_APPOINTMENT_PATIENT' }) },
	closeProfileForm: () => { dispatch({ type: 'APPOINTMENT_CLOSE_PATIENT_FORM' }) },
	saveProfileForm: (profileForm) => { dispatch({ type: 'SAVE_PATIENT_FORM', profileForm:profileForm}) },
	savePatient: () => { dispatch({ type: 'SAVE_PATIENT'}) },
	setClinicSchedule: (clinicSchedule) => { dispatch({ type: 'SET_CLINIC_SCHEDULE', clinicSchedule:clinicSchedule}) },
	addAppointment: (appointment) => { dispatch({ type: 'ADD_APPOINTMENT', appointment:appointment}) },
	reloadScheduleList: () => { dispatch({ type: 'RELOAD_SCHEDULE_LIST'}) },
})

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentFormScreen)
