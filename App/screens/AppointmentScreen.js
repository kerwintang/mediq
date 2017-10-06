import React, { Component } from 'react';
import { Platform, StyleSheet,  Linking, View, ScrollView, Text, TextInput, Image, TouchableWithoutFeedback, ActivityIndicator, Modal } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';
import SearchForm from '../components/SearchForm.js';
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
			<ActivityIndicator
			style={{position:"absolute", height:50, width:50, paddingTop:5}}
          />
				{props.appointment.Patient.id?<Image style={{height:50, width:50, borderRadius:25}} resizeMode="center" source={{uri:'https://s3-ap-southeast-1.amazonaws.com/mediq-assets/patient'+props.appointment.Patient.id+'.png'}}/>:
				<Image style={{height:50, width:50}} resizeMode="center" source={require('../img/user.png')}/>}
				<MediqText style={{backgroundColor:'transparent', textAlign:'left', paddingBottom:10, fontSize:10}}>{props.appointment.Patient.lastName}, {props.appointment.Patient.firstName}</MediqText>
			</View>
			</TouchableWithoutFeedback>
			<View style={{flexDirection:"column", alignItems:"center", width:"60%"}}>
				<MediqText style={props.appointment.status=="COMPLETED"?Styles.styles.completedStatus:props.appointment.status=="SCHEDULED"?Styles.styles.scheduledStatus:Styles.styles.cancelledStatus}>{props.appointment.status}</MediqText>
				<MediqText style={{backgroundColor:'transparent', textAlign:'center', fontSize:14}}>{moment(props.appointment.date).format("dddd, MMM D, YYYY")} {props.schedule.startTime}-{props.schedule.endTime} </MediqText>
				<Text adjustsFontSizeToFit={true} numberOfLines={1} style={{paddingTop:5, backgroundColor:'transparent', textAlign:'left', fontSize:14}}>{props.schedule.Clinic.name}, {props.schedule.Clinic.room}</Text>
			</View>
			<View style={{width:"20%", flexDirection: "column", alignItems:"center", paddingTop:10}}>
				<Image style={{height:50, width:50}} resizeMode="center" source={require('../img/doctor.png')}/>
				<MediqText style={{backgroundColor:'transparent', textAlign:'left', paddingBottom:10, fontSize:10}}>Dr. {props.doctor.firstName} {props.doctor.lastName}</MediqText>
			</View>
		</View>
		<ScrollView style={{height:"85%"}}>
		<View style={Styles.styles.vitalsSection}>
			<View style={{flexDirection:"row"}}>
				<View style={{width:"60%"}}>
					<MediqText style={Styles.styles.sectionHeader}>Vitals</MediqText>
				</View>
				<View style={{width:"40%", flexDirection:"row", justifyContent:"flex-end"}}>
					<TouchableWithoutFeedback onPress={props.editVitals}>
						<MediqText style={Styles.styles.sectionHeaderAdd}>+ ADD VITALS</MediqText>
					</TouchableWithoutFeedback>
				</View>
			</View>

			<View style={Styles.styles.sectionContent}>
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
          visible={props.editingNotes}
          >
		  <NotesScreen editingNotes={true}/>
		</Modal>
		<Modal
          animationType="slide"
          transparent={false}
          visible={props.showProcedureModal}
          >
         <SearchForm onPress={props.select}/>
        </Modal>
	</View>
);

const DumbVitals = (props) => (
	<View style={Styles.styles.vitals}>
		<MediqText style={{fontSize:12, fontWeight:"bold"}}>{props.vitals.name}</MediqText>
		<MediqText style={{fontSize:20}}>{props.vitals.value}</MediqText>
	</View>
);

const DumbProcedure = (props) => (
	<View style={Styles.styles.procedure}>
		<MediqText style={{fontSize:12, fontWeight:"bold"}}>{props.procedure.name}</MediqText>
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
	}

	componentDidMount(){
		this.fetchProcedures();
		this.fetchDoctorNotes();
		this.fetchPatientNotes();
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

	selectProcedure(item){
		client.post('/api/appointmentprocedure/'+this.props.appointment.id+'/'+item.id,{},
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			this.props.addProcedure(item);
		}).catch((err) => {
			alert("ERROR: "+err);
		});
		this.props.closeModal();
	}
	
	render() {
		var vitals = [];
		//for(var i in this.props.appointments){
		for(var i in this.props.vitals){
			vitals.push(<DumbVitals key={i} vitals={this.props.appointment.vitals[i]}/>)
		}

		var procedures = [];
		for(var i in this.props.procedures){
			procedures.push(<DumbProcedure key={i} procedure={this.props.procedures[i]}/>)
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
					doctor={this.props.profile}
					vitals={vitals} 
					procedures={procedures} 
					doctorNotes={doctorNotes} 
					patientNotes={patientNotes} 
					viewPatient={this.viewPatient} 
					searchProcedure={this.searchProcedure}
					showProcedureModal={this.props.showProcedureModal}
					closeModal={this.props.closeModal}
					select={this.selectProcedure}
					editVitals={this.props.editVitals} 
					editNotes={this.props.editNotes} 
					editingVitals={this.props.editingVitals} 
					editingNotes={this.props.editingNotes}/> : null
		);
    }
}

const mapStateToProps = state => ({
	schedule: state.scheduleStore.schedule,
	profile: state.sessionStore.profile,
	show: state.showAbout,
	fbInfo: state.fbInfo,
	appointment: state.appointmentStore.appointment,
	editingVitals: state.notesStore.editVitals,
	showProcedureModal: state.appointmentStore.showProcedureModal,
	editingNotes: state.notesStore.editNotes,
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
	addProcedure: (procedure) => { dispatch({ type: 'ADD_PROCEDURE', procedure:procedure }) },
	setProcedures: (procedures) => { dispatch({ type: 'SET_PROCEDURES', procedures:procedures }) },
	setSearchTitle: (title) => { dispatch({ type: 'SET_SEARCH_TITLE', title:title }) },
	setSearchDescription: (description) => { dispatch({ type: 'SET_SEARCH_DESCRIPTION', description:description }) },
	setSearchList: (list) => { dispatch({ type: 'SET_SEARCH_LIST', list:list }) },
	closeModal: () =>  { dispatch({ type: 'CLOSE_MODAL' }) },
})

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScreen)
