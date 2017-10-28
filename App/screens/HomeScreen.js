import React, { Component } from 'react';
import { Platform, ScrollView, View, Text, Modal, Image, TouchableWithoutFeedback, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import AppointmentList from '../components/AppointmentList.js';
import PatientList from '../components/PatientList.js';
import ScheduleList from '../components/ScheduleList.js';
import ProfilePicture from '../components/ProfilePicture.js';
import ProfileFormScreen from '../screens/ProfileFormScreen.js';
import EmptyDataSet from '../components/EmptyDataSet.js';
import MediqText from '../components/MediqText.js';
import Styles from '../styles/Styles.js';
import { client } from '../actions'

var moment = require("moment");
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;


const DumbHomeScreen = (props) => (
	<View style={{
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
  	    right: 0,
  	    bottom: 0,
  	    backgroundColor:'#F2F4F8',
  	    flexDirection:'column',
  	    alignItems:'center',
  	    width:"100%"
	}}>
		<View style={{flexDirection: "row", padding:10, margin:5, height:100, backgroundColor:"white", justifyContent:"center"}}>
			<View style={{flexDirection: "column", width:"22%"}}>
				<TouchableWithoutFeedback onPress={()=>{ props.viewProfile(props.profile, props.user.role); props.navigation.navigate("Profile")}}>
					<ProfilePicture profile={props.profile} type={props.user.role} style={{height:70, width:70, borderRadius:35}}/>
				</TouchableWithoutFeedback>
			</View>
			<View style={{flexDirection: "column", padding:10, width:"78%"}}>
				<MediqText numberOfLines={2} style={{fontSize:18}}>Hi, {props.user.role=="doctor"?"Dr. "+props.profile.lastName:props.profile.firstName}</MediqText>
				<View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", borderWidth:1, borderRadius:5, margin:15}}>
					{props.user.role=="patient"?<View style={props.appointmentListShow?Styles.styles.selectedView:Styles.styles.unselectedView}>
						<MediqText style={props.appointmentListShow?Styles.styles.selectedText:Styles.styles.unselectedText} onPress={props.showAppointmentList}>Appointments</MediqText>
					</View>:null}
					{props.user.role=="doctor"?<View style={props.scheduleListShow?Styles.styles.selectedView:Styles.styles.unselectedView}>
						<MediqText style={props.scheduleListShow?Styles.styles.selectedText:Styles.styles.unselectedText} onPress={props.showScheduleList}>Clinic</MediqText>
					</View>:null}
					<View style={props.patientListShow?Styles.styles.selectedView:Styles.styles.unselectedView}>
					<MediqText style={props.patientListShow?Styles.styles.selectedText:Styles.styles.unselectedText} onPress={props.showPatientList}>Patients</MediqText>
					</View>
				</View>
			</View>
		</View>
		{(props.scheduleListShow && props.user.role=="doctor")?
			<ScheduleList navigation={props.navigation} onPress={props.showSchedule} onPress={props.showSchedule}/>
			:null}
		{(props.appointmentListShow && props.user.role=="patient")?( 
			(!props.appointments||props.appointments.length==0)?
			<EmptyDataSet icon="list" title="No Appointments Scheduled" message="You have no appointments scheduled."/>:
			<AppointmentList title={new Date().getDate()} appData={props.appointments} navigation={props.navigation} onPress={props.showAppointment} type="home"/>
			):null}
		{props.patientListShow?
			<ScrollView style={{width:"100%"}} contentContainerStyle={{width:"100%", paddingBottom:40}}>
			<PatientList navigation={props.navigation} onPress={props.showProfile}/>
			</ScrollView>
		:null}
		{props.patientListShow?<View style={Styles.styles.pageFooterButton}>
		<TouchableOpacity onPress={props.newPatient}>
			<MediqText style={Styles.styles.pageFooterButtonText}>+NEW PATIENT</MediqText>
		</TouchableOpacity>
		</View>:null}
		{(props.appointmentListShow && props.user.role=="patient")?<View style={Styles.styles.pageFooterButton}>
		<TouchableOpacity onPress={props.newAppointment}>
			<MediqText style={Styles.styles.pageFooterButtonText}>+NEW APPOINTMENT</MediqText>
		</TouchableOpacity>
		</View>:null}
		<Modal
          animationType="slide"
          transparent={false}
          visible={props.showProfileForm}
          >
		  <ProfileFormScreen/>
		</Modal>
	</View>
);



class HomeScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return {
	    title: 'Home',
		headerStyle: { backgroundColor:"#0F3D68" },
		headerTitleStyle: { color:"white" },
		headerRight: <Text style={{color:"white", paddingRight:15, fontSize:17}} onPress={() => params.confirmLogout()} >Logout</Text>
		}
	  };
	
	constructor(props) {
		super(props);
		this.doLogout = this.doLogout.bind(this);
		this.confirmLogout = this.confirmLogout.bind(this);

	}

	componentDidMount(){
		const schedules = [
			{
				date:{month:"Aug", day:28, weekday:"Mon"}, 
				schedule:{day:"Mon", startTime:"1:00PM", endTime:"4:00PM", clinic:"Makati Medical Center Rm. 237", cutoffTime:"3:00PM", maxPatients:20}, 
				appointments:[
					{id:2, date: {day:"28", month: "Aug", weekday:"Monday"}, patient:{id:1, firstName:"Jamie", lastName:"Tang", address:"Residencias de Manila", birthday:"02/02/2016", age:"1yr 7mos"}, doctor: {name:'Dr. Kwak'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM", day:1}, status:"SCHEDULED" },
					{id:3, date: {day:"28", month: "Aug", weekday:"Monday"}, patient:{id:2, firstName:"Jasmine", lastName:"Tang", address:"Residencias de Manila", birthday:"11/28/2009", age:"7y/o"}, doctor: {name:'Dr. Kwak'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM", day:1}, status:"SCHEDULED" }
				],
				count:2
			}
		]

//		this.props.setSchedules(schedules);
		this.loadPatients();
		if(this.props.user.role=="doctor")
			this.loadSchedules();
		if(this.props.user.role=="patient")
			this.loadAppointments();
		this.props.hideLoginLoading();
		this.props.navigation.setParams({
			confirmLogout: this.confirmLogout
		  })
	}

	loadPatients(){
		client.get("/api/profile/patients/"+this.props.user.role,{headers:{"x-access-token": this.props.token}})
		.then(res => {
			var patients = [];
			for(var i=0;i<res.data.length;i++){
				patients.push(res.data[i]);
			}
			this.props.setPatients(patients);
		});
	}

	loadSchedules(){
		client.get("/api/clinicSchedules/"+moment(this.props.currentDate).format("MMDDYYYY"),{headers:{"x-access-token": this.props.token}})
		.then(res => {
			this.props.setClinicSchedules(res.data);
		});
	}

	loadAppointments(){
		client.get("/api/appointments/"+moment().format("MMDDYYYY"),{headers:{"x-access-token": this.props.token}})
		.then(res => {
			this.props.setAppointments(res.data);
		});
	}

	confirmLogout() {
		Alert.alert(
			"Logout",
			"Are you sure you want to logout?",
			[
				{text: 'Cancel', onPress: () => console.log("Cancelled"), style: 'cancel'},
				{text: 'OK', onPress: this.doLogout},
			  ]
		)
	}

	doLogout() {
		LoginManager.logOut(); 
		this.props.doLogout();
	}
	
	
	render() {
		const { navigate } = this.props.navigation;
		const appData = [
			{id:2, date: {day:"28", month: "Aug", weekday:"Monday"}, patient:{id:1, firstName:"Jamie", lastName:"Tang", address:"Residencias de Manila", birthday:"02/02/2016", age:"7y/o"}, doctor: {name:'Dr. Kwak'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM", day:1}, status:"Scheduled" },
			{id:3, date: {day:"28", month: "Aug", weekday:"Monday"}, patient:{id:2, firstName:"Jasmine", lastName:"Tang", address:"Residencias de Manila", birthday:"11/28/2009", age:"1yr 7mos"}, doctor: {name:'Dr. Kwak'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM", day:1}, status:"Scheduled" }
		];
		
		return (
			<DumbHomeScreen 
			 navigation={this.props.navigation} 
			 showAppointment={this.props.showAppointment} 
			 newPatient={this.props.newPatient}
			 newAppointment={this.props.newAppointment}
			 showProfile={this.props.showProfile} 
			 showSchedule={this.props.showSchedule} 
			 appointments={this.props.appointments} 
			 patients={this.props.patients} 
			 showPatientList={this.props.showPatientList} 
			 showAppointmentList={this.props.showAppointmentList}
			 showScheduleList={this.props.showScheduleList}
			 patientListShow={this.props.patientListShow} 
			 appointmentListShow={this.props.appointmentListShow}
			 scheduleListShow={this.props.scheduleListShow}
			 viewProfile={this.props.viewProfile}
			 showProfileForm={this.props.showProfileForm}
			 user={this.props.user}
			 profile={this.props.profile}
			 />
		);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.reloadPatientList && !this.props.reloadPatientList){
			this.loadPatients();
		}
		if(nextProps.reloadScheduleList && !this.props.reloadScheduleList){
			this.loadSchedules();
		}
	}
}

const mapStateToProps = state => ({
	show: state.showAbout,
	username: state.sessionStore.username,
	user: state.sessionStore.user,
	profile: state.sessionStore.profile,
	fbInfo: state.fbInfo,
	patients: state.patientStore.patients,
	showProfileForm: state.profileStore.showProfileForm,
	appointments: state.appointmentStore.appointments,
	patientListShow: state.homeStore.patientListShow,
	reloadPatientList: state.homeStore.reloadPatientList,
	appointmentListShow: state.homeStore.appointmentListShow,
	scheduleListShow: state.homeStore.scheduleListShow,
	reloadScheduleList: state.homeStore.reloadScheduleList,
	currentDate: state.scheduleStore.date,
	token: state.sessionStore.token
})

const mapDispatchToProps = (dispatch) => ({
	showAppointment: (appointment) => { dispatch({ type: 'SHOW_APPOINTMENT', appointment:appointment}) },
	showProfile: (patient) => { dispatch({ type: 'SET_PROFILE', profile:patient, role:"patient" }) },
	showSchedule: (schedule, clinicSchedule) => { dispatch({ type: 'SHOW_SCHEDULE', schedule:schedule, clinicSchedule:clinicSchedule }) },
	showAppointmentList: () => { dispatch({ type: 'SHOW_APPOINTMENT_LIST'}) },
	showPatientList: () => { dispatch({ type: 'SHOW_PATIENT_LIST'}) },
	showScheduleList: () => { dispatch({ type: 'SHOW_SCHEDULE_LIST'}) },
	viewProfile: (profile, role) => { dispatch({ type: 'SET_PROFILE', profile:profile, role:role}) },
	doLogout: () => { dispatch({ type: 'LOGOUT'}) },
	hideLoginLoading: () => { dispatch({ type:'HIDE_LOGIN_LOADING'})},
	setSchedules: (schedules) => { dispatch({ type:'SET_SCHEDULES', schedules:schedules})},
	newPatient: () => { dispatch({ type: 'NEW_PATIENT'}) },
	newAppointment: () => { dispatch({ type: 'NEW_APPOINTMENT'}) },
	setPatients: (patients) => { dispatch({ type: 'SET_PATIENTS', patients:patients }) },
	setSchedules: (schedules) => { dispatch({ type: 'SET_SCHEDULES', schedules:schedules }) },
	setClinicSchedules: (clinicSchedules) => { dispatch({ type: 'SET_CLINIC_SCHEDULES', clinicSchedules:clinicSchedules }) },
	setAppointments: (appointments) => { dispatch({ type: 'SET_APPOINTMENTS', appointments:appointments }) },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
