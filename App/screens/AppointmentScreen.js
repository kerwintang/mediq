import React, { Component } from 'react';
import { Alert, Platform, StyleSheet,  Linking, View, ScrollView, Text, TextInput, Image, TouchableWithoutFeedback, ActivityIndicator, Modal } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';
import ProfilePicture from '../components/ProfilePicture.js';
import SearchForm from '../forms/SearchForm.js';
import VitalsForm from '../forms/VitalsForm.js';
import NotesScreen from '../screens/NotesScreen.js';
import Styles from '../styles/Styles.js';
import { client } from '../actions'

const moment = require("moment");

const DumbAppointmentScreen = (props) => (
	<View containerStyle={{
  	    flexDirection:'column',
  	    alignItems:'center',
	}}>
		<View style={{
			flexDirection:'row',
			alignItems:'center',
			backgroundColor:"white",
			height:"15%"
		}}>
			<TouchableWithoutFeedback onPress={props.viewPatient}>
			<View style={{width:"20%", flexDirection: "column", alignItems:"center", paddingTop:10}}>
				<ProfilePicture profile={props.appointment.Patient} type="patient"/>
				<MediqText style={{backgroundColor:'transparent', textAlign:'left', paddingBottom:10, fontSize:10}}>{props.appointment.Patient.lastName}, {props.appointment.Patient.firstName}</MediqText>
			</View>
			</TouchableWithoutFeedback>
			<View style={{flexDirection:"column", alignItems:"center", width:"60%"}}>
				<MediqText style={props.appointment.status=="COMPLETED"?Styles.styles.completedStatus:props.appointment.status=="SCHEDULED"?Styles.styles.scheduledStatus:Styles.styles.cancelledStatus}>{props.appointment.status}</MediqText>
				<MediqText style={{backgroundColor:'transparent', textAlign:'center', fontSize:14}}>{moment(props.appointment.date).format("dddd, MMM D, YYYY")} {props.schedule.startTime}-{props.schedule.endTime} </MediqText>
				<Text adjustsFontSizeToFit={true} numberOfLines={1} style={{paddingTop:5, backgroundColor:'transparent', textAlign:'left', fontSize:14}}>{props.schedule.Clinic.name}, {props.schedule.Clinic.room}</Text>
			</View>
			<View style={{width:"20%", flexDirection: "column", alignItems:"center", paddingTop:10}}>
				<ProfilePicture profile={props.appointment.Doctor.Profile} type="doctor"/>
				<MediqText style={{backgroundColor:'transparent', textAlign:'left', paddingBottom:10, fontSize:10}}>Dr. {props.appointment.Doctor.Profile.firstName} {props.appointment.Doctor.Profile.lastName}</MediqText>
			</View>
		</View>
		<ScrollView style={{height:"85%"}}>
		<View style={Styles.styles.vitalsSection}>
			<View style={{flexDirection:"row"}}>
				<View style={{width:"60%"}}>
					<MediqText style={Styles.styles.sectionHeader}>Vitals</MediqText>
				</View>
				<View style={{width:"40%", flexDirection:"row", justifyContent:"flex-end"}}>
					<TouchableWithoutFeedback onPress={props.addNewVital}>
						<MediqText style={Styles.styles.sectionHeaderAdd}>+ ADD VITALS</MediqText>
					</TouchableWithoutFeedback>
				</View>
			</View>

			<View style={Styles.styles.procedureSectionContent}>
				{props.vitals.length>0?props.vitals:<MediqText style={{color:"#8F8E94", fontStyle:"italic"}}>No vitals added yet.</MediqText>}
			</View>
		</View>
		<View style={Styles.styles.notesSection}>
			<View style={{flexDirection:"row"}}>
				<View style={{width:"60%"}}>
					<MediqText style={Styles.styles.sectionHeader}>Procedures Done</MediqText>
				</View>
				<View style={{width:"40%", flexDirection:"row", justifyContent:"flex-end"}}>
					<TouchableWithoutFeedback onPress={()=>{props.searchProcedure()}}>
						<MediqText style={Styles.styles.sectionHeaderAdd}>+ ADD PROCEDURE</MediqText>
					</TouchableWithoutFeedback>
				</View>
			</View>

			<View style={Styles.styles.procedureSectionContent}>
				{props.procedures.length>0?props.procedures:<MediqText style={{color:"#8F8E94", fontStyle:"italic"}}>No procedures done.</MediqText>}
			</View>
		</View>
		<View style={Styles.styles.notesSection}>
			<View style={{flexDirection:"row"}}>
				<View style={{width:"60%"}}>
					<MediqText style={Styles.styles.sectionHeader}>Doctor's Notes</MediqText>
				</View>
				<View style={{width:"40%", flexDirection:"row", justifyContent:"flex-end"}}>
					<TouchableWithoutFeedback onPress={()=>{props.editNotes("doctor")}}>
						<MediqText style={Styles.styles.sectionHeaderAdd}>+ ADD NOTE</MediqText>
					</TouchableWithoutFeedback>
				</View>
			</View>
			<View style={Styles.styles.sectionContent}>
			{props.doctorNotes.length>0?props.doctorNotes:<MediqText style={{color:"#8F8E94", fontStyle:"italic"}}>No doctor's notes added yet.</MediqText>}
			</View>
		</View>
		<View style={Styles.styles.notesSection}>
			<View style={{flexDirection:"row"}}>
				<View style={{width:"60%"}}>
					<MediqText style={Styles.styles.sectionHeader}>Patient's Notes</MediqText>
				</View>
				<View style={{width:"40%", flexDirection:"row", justifyContent:"flex-end"}}>
					<TouchableWithoutFeedback onPress={()=>{props.editNotes("patient")}}>
						<MediqText style={Styles.styles.sectionHeaderAdd}>+ ADD NOTE</MediqText>
					</TouchableWithoutFeedback>
				</View>
			</View>
			<View style={Styles.styles.sectionContent}>
				{props.patientNotes.length>0?props.patientNotes:<MediqText style={{color:"#8F8E94", fontStyle:"italic"}}>No patient's notes added yet.</MediqText>}
			</View>
		</View>
		</ScrollView>

		<Modal
		animationType="slide"
		transparent={false}
		visible={props.showVitalModal}
		>
		<VitalsForm close={props.closeModal} saveVitals={props.saveVitals}/>
	  </Modal>
	  <Modal
          animationType="slide"
          transparent={false}
          visible={props.showProcedureModal}
          >
         <SearchForm saveVitals={props.saveVitals} onPress={props.select} close={props.closeModal}/>
        </Modal>
	  <Modal
          animationType="slide"
          transparent={false}
          visible={props.editingNotes}
          >
		  <NotesScreen editingNotes={true}/>
		</Modal>
	</View>
);

const DumbVitals = (props) => (
	<View style={Styles.styles.vitals}>
		<MediqText style={{fontSize:14, borderRightWidth:1, paddingRight:5}}><Text style={{fontWeight:"bold"}}>{props.vitals.name}:</Text> {props.vitals.value}</MediqText>
		<TouchableWithoutFeedback onPress={()=>{props.removeVitals(props.vitals.id)}}>
			<Image style={{height:12, width:12}} resizeMode="center" source={require('../img/delete.png')}/>
		</TouchableWithoutFeedback>
	</View>
);

const DumbProcedure = (props) => (
	<View style={Styles.styles.procedure}>
		<MediqText style={{fontSize:14, borderRightWidth:1, paddingRight:5}}>{props.procedure.name}</MediqText>
		<TouchableWithoutFeedback onPress={()=>{props.removeProcedure(props.appointment.id, props.procedure.id)}}>
			<Image style={{height:12, width:12}} resizeMode="center" source={require('../img/delete.png')}/>
		</TouchableWithoutFeedback>
	</View>
);

const DumbNotes = (props) => (
	<View style={{width:"100%"}}>
		{props.notes.notes?<MediqText style={{fontSize:15}}>{props.notes.notes}</MediqText>:null}
		{props.notes.picture?
			<View style={{height:500}}>
			<Image style={{width:"100%",height:"100%"}} resizeMode="center" source={{uri:'https://s3-ap-southeast-1.amazonaws.com/mediq-assets/notes/'+props.notes.picture}}/>
			</View>
			:null}
	</View>
);



class AppointmentScreen extends Component {
	static navigationOptions = {
	    title: 'Appointment',
		headerStyle: { backgroundColor:"#0F3D68" },
		headerTitleStyle: { color:"white" },
		headerBackTitleStyle: { color:"white" },
	  };

	  constructor(props) {
		super(props);
		this.viewPatient = this.viewPatient.bind(this);
		this.searchProcedure = this.searchProcedure.bind(this);
		this.selectProcedure = this.selectProcedure.bind(this);
		this.saveVitals = this.saveVitals.bind(this);
		this.removeVitals = this.removeVitals.bind(this);
		this.removeProcedure = this.removeProcedure.bind(this);
	}

	componentDidMount(){
		this.fetchVitals();
		this.fetchProcedures();
		this.fetchDoctorNotes();
		this.fetchPatientNotes();
	}

	fetchVitals(){
		client.get('/api/vitals/'+this.props.appointment.id,
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			this.props.setVitals(res.data);
		}).catch((err) => {
			alert("ERROR: "+err);
		});
	}

	fetchProcedures(){
		client.get('/api/vitals/'+this.props.appointment.id,
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			this.props.setVitals(res.data);
		}).catch((err) => {
			alert("ERROR: "+err);
		});
	}

	fetchProcedures(){
		client.get('/api/appointmentprocedures/'+this.props.appointment.id,
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			this.props.setProcedures(res.data);
		}).catch((err) => {
			alert("ERROR: "+err);
		});
	}

	fetchDoctorNotes(){
		client.get('/api/notes/doctor/'+this.props.appointment.id,
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			this.props.setDoctorNotes(res.data);
		}).catch((err) => {
			alert("ERROR: "+err);
		});
	}

	fetchPatientNotes(){
		client.get('/api/notes/patient/'+this.props.appointment.id,
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			this.props.setPatientNotes(res.data);
		}).catch((err) => {
			alert("ERROR: "+err);
		});
	}

	searchProcedure(){
		client.get('/api/procedures/',
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			this.props.setSearchTitle("Search Procedure");
			this.props.setSearchDescription("Please select a procedure.");
			this.props.setSearchList(res.data);
			this.props.searchProcedure();
		}).catch((err) => {
			alert("ERROR: "+err);
		});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.reloadDoctorNotes&&!this.props.reloadDoctorNotes){
			this.fetchDoctorNotes();
		}
		if(nextProps.reloadPatientNotes&&!this.props.reloadPatientNotes){
			this.fetchPatientNotes();
		}
	}

	viewPatient() {
		this.props.setProfile(this.props.appointment.Patient)
		this.props.navigation.navigate("Profile");
	}

	saveVitals(){
		client.post('/api/vital',{appointmentId:this.props.appointment.id, name:this.props.vitalName, value:this.props.vitalValue},
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			this.props.addVital(res.data);
		}).catch((err) => {
			alert("ERROR: "+err);
		});
		this.props.closeModal();
	}
	
	selectProcedure(item){
		client.post('/api/appointmentprocedure/'+this.props.appointment.id+'/'+item.id,{},
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			this.props.addProcedure(item);
		}).catch((err) => {
			alert("ERROR: "+err);
		});
		this.props.closeModal();
	}

	removeVitals(id){
		Alert.alert(
			"Remove Vitals",
			"Are you sure you want to remove this vital information?",
			[
				{text: 'Cancel', onPress: () => console.log("Cancelled"), style: 'cancel'},
				{text: 'OK', onPress: () => {
					client.delete('/api/vital/'+id,
					{headers:{"x-access-token": this.props.token}}).then((res) => {
						this.props.removeVitals(id);
					}).catch((err) => {
						alert("ERROR: "+err);
					});
				}},
			  ]
		)
	}
	
	removeProcedure(appointmentId, procedureId){
		Alert.alert(
			"Remove Procedure",
			"Are you sure you want to remove this procedure?",
			[
				{text: 'Cancel', onPress: () => console.log("Cancelled"), style: 'cancel'},
				{text: 'OK', onPress: () => {
					client.delete('/api/appointmentprocedure/'+appointmentId+'/'+procedureId,
					{headers:{"x-access-token": this.props.token}}).then((res) => {
						this.props.removeProcedure(appointmentId, procedureId);
					}).catch((err) => {
						alert("ERROR: "+err);
					});
				}},
			  ]
		)
	}
	
	render() {
		var vitals = [];
		//for(var i in this.props.appointments){
		for(var i in this.props.vitals){
			vitals.push(<DumbVitals key={i} vitals={this.props.vitals[i]} removeVitals={this.removeVitals}/>)
		}

		var procedures = [];
		for(var i in this.props.procedures){
			procedures.push(<DumbProcedure key={i} appointment={this.props.appointment} procedure={this.props.procedures[i]} removeProcedure={this.removeProcedure}/>)
		}

		var doctorNotes = [];
		for(var i in this.props.doctorNotes){
			if(i>0){
				doctorNotes.push(<View  key={1000+i} style={{marginTop:10, marginBottom:10,borderBottomWidth:1, borderColor:"#CECECE", width:"50%"}}></View>)
			}
			doctorNotes.push(<DumbNotes key={i} notes={this.props.doctorNotes[i]}/>)
		}

		var patientNotes = [];
		for(var i in this.props.patientNotes){
			if(i>0){
				patientNotes.push(<View  key={1000+i} style={{marginTop:10, marginBottom:10,borderBottomWidth:1, borderColor:"#CECECE", width:"50%"}}></View>)
			}
			patientNotes.push(<DumbNotes key={i} notes={this.props.patientNotes[i]}/>)
		}
		return (
			this.props.appointment?
				<DumbAppointmentScreen 
					appointment={this.props.appointment} 
					schedule={this.props.schedule}
					user={this.props.user}
					vitals={vitals} 
					procedures={procedures} 
					doctorNotes={doctorNotes} 
					patientNotes={patientNotes} 
					viewPatient={this.viewPatient} 
					searchProcedure={this.searchProcedure}
					addNewVital={this.props.addNewVital}
					saveVitals={this.saveVitals}
					showProcedureModal={this.props.showProcedureModal}
					showVitalModal={this.props.showVitalModal}
					closeModal={this.props.closeModal}
					select={this.selectProcedure}
					editVitals={this.props.editVitals} 
					editNotes={this.props.editNotes} 
					editingNotes={this.props.editingNotes}/> : null
		);
    }
}

const mapStateToProps = state => ({
	schedule: state.scheduleStore.schedule,
	profile: state.sessionStore.profile,
	user: state.sessionStore.profile,
	show: state.showAbout,
	fbInfo: state.fbInfo,
	appointment: state.appointmentStore.appointment,
	showVitalModal: state.appointmentStore.showVitalModal,
	showProcedureModal: state.appointmentStore.showProcedureModal,
	editingNotes: state.notesStore.editNotes,
	vitals: state.appointmentStore.vitals,
	vitalName: state.appointmentStore.vitalName,
	vitalValue: state.appointmentStore.vitalValue,
	procedures: state.appointmentStore.procedures,
	doctorNotes: state.notesStore.doctorNotes,
	patientNotes: state.notesStore.patientNotes,
	reloadDoctorNotes: state.notesStore.reloadDoctorNotes,
	reloadPatientNotes: state.notesStore.reloadPatientNotes,
	token: state.sessionStore.token,
})

const mapDispatchToProps = (dispatch) => ({
	setProfile: (profile) => { dispatch({ type: 'SET_PROFILE', profile:profile, role:"patient" }) },
	editVitals: () => { dispatch({ type: 'EDIT_VITALS' }) },
	editNotes: (category) => { dispatch({ type: 'EDIT_NOTES', category:category }) },
	setDoctorNotes: (notes) => { dispatch({ type: 'SET_DOCTOR_NOTES', notes:notes }) },
	setPatientNotes: (notes) => { dispatch({ type: 'SET_PATIENT_NOTES', notes:notes }) },
	searchProcedure: () => { dispatch({ type: 'SEARCH_PROCEDURE' }) },
	addNewVital: () => { dispatch({ type: 'ADD_NEW_VITAL' }) },
	addVital: (vital) => { dispatch({ type: 'ADD_VITAL', vital:vital }) },
	setVitals: (vitals) => { dispatch({ type: 'SET_VITALS', vitals:vitals }) },
	addProcedure: (procedure) => { dispatch({ type: 'ADD_PROCEDURE', procedure:procedure }) },
	setProcedures: (procedures) => { dispatch({ type: 'SET_PROCEDURES', procedures:procedures }) },
	removeVitals: (id) => { dispatch({ type: 'REMOVE_VITAL', id:id }) },
	removeProcedure: (appointmentId, procedureId) => { dispatch({ type: 'REMOVE_PROCEDURE', appointmentId:appointmentId, procedureId:procedureId }) },
	setSearchTitle: (title) => { dispatch({ type: 'SET_SEARCH_TITLE', title:title }) },
	setSearchDescription: (description) => { dispatch({ type: 'SET_SEARCH_DESCRIPTION', description:description }) },
	setSearchList: (list) => { dispatch({ type: 'SET_SEARCH_LIST', list:list }) },
	closeModal: () =>  { dispatch({ type: 'CLOSE_MODAL' }) },
})

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScreen)
