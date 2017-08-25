import React, { Component } from 'react';
import { Animated, Easing, Platform, StyleSheet,  Linking, View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';
import PatientForm from '../components/PatientForm.js';
import showResults from './ShowResults.js';

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


const DumbPatientFormScreen = (props) => (
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
		<PatientForm onSubmit={showResults} savePatient={props.savePatient} cancelPatient={props.cancelPatient} handleFormChange={props.handleFormChange}/>
	</Animated.View>
);


class PatientFormScreen extends Component {
	static navigationOptions = {
	    title: 'Patient',
	  };

	  constructor(props) { 
		super(props);

		this.state = {
			bounceValue: new Animated.Value(1000)
		}

		this.closePatientForm = this.closePatientForm.bind(this)
		this.savePatient = this.savePatient.bind(this)
	}

	showPatientForm(){
		Animated.timing(
			this.state.bounceValue,
			{
			  toValue: 0,
			  easing: Easing.ease,
			  duration:500
			}
		  ).start();
	}

	closePatientForm(){
		Animated.timing(
			this.state.bounceValue,
			{
			  toValue:1000,
			  easing: Easing.ease,
			  duration:500
			}
		  ).start();
		setTimeout(() => { this.props.cancelPatient(); },500);
	}

	componentWillReceiveProps(nextProps){
		if(!this.props.showPatientForm && nextProps.showPatientForm){
		this.showPatientForm();
		}
	}

	savePatient(){
		this.props.savePatient();
		this.closePatientForm();
	}

	render() {
		return (
			this.props.showPatientForm?<DumbPatientFormScreen patient={this.props.patient} bounceValue={this.state.bounceValue} handleFormChange={this.props.savePatientForm} savePatient={this.savePatient} cancelPatient={this.closePatientForm}/>:null
		);
    }
}

const mapStateToProps = state => ({
	fbInfo: state.fbInfo,
	patient: state.patientStore.patient,
	showPatientForm: state.patientStore.showPatientForm
})

const mapDispatchToProps = (dispatch) => ({
	savePatientForm: (patientForm) => { dispatch({ type: 'SAVE_PATIENT_FORM', patientForm:patientForm}) },
	savePatient: () => { dispatch({ type: 'SAVE_PATIENT'}) },
	cancelPatient: () => { dispatch({ type: 'CANCEL_PATIENT'}) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientFormScreen)
