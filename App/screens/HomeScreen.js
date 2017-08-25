import React, { Component } from 'react';
import { Platform, ScrollView, View, Text, Image, TouchableWithoutFeedback, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import AppointmentList from '../components/AppointmentList.js';
import PatientList from '../components/PatientList.js';
import PatientFormScreen from '../screens/PatientFormScreen.js';
import EmptyDataSet from '../components/EmptyDataSet.js';
import MediqText from '../components/MediqText.js';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

const styles = {
		navbar: {
		    width:"100%",
		    height:"10%",
		    opacity:0.75
		  },

		  selectedView: {
			backgroundColor:"blue",
			width:"50%", 
			padding:5
		},
		unselectedView: {
			width:"50%", 
			padding:5
		},
		selectedText: {
			backgroundColor:"transparent", color:"white", fontWeight:"bold", textAlign:"center"
		},
		unselectedText: {
			backgroundColor:"transparent", textAlign:"center"
		},
};

const DumbHomeScreen = (props) => (
	<View style={{
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
  	    right: 0,
  	    bottom: 0,
  	    backgroundColor:'white',
  	    flexDirection:'column',
  	    alignItems:'center',
  	    width:"100%"
	}}>
		<Image fadeDuration={0} style={{position:'absolute',height:'100%', width:'100%'}} source={require('../img/background.png')} />
		<View style={{flexDirection: "row", padding:10, width:"100%", height:"15%", backgroundColor:"white", justifyContent:"center"}}>
			<View style={{flexDirection: "column", width:"20%"}}>
				<TouchableWithoutFeedback onPress={()=>{ props.viewProfile(props.user); props.navigation.navigate("Doctor")}}>
					<Image style={{height:70, width:70}} resizeMode="center" source={require('../img/doctor.png')} />
				</TouchableWithoutFeedback>
			</View>
			<View style={{flexDirection: "column", padding:10, width:"80%"}}>
				<MediqText numberOfLines={2} style={{fontSize:18}}>Good afternoon, {props.user.role=="doctor"?"Dr. "+props.user.lastName:props.user.firstName}</MediqText>
				<View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", borderWidth:1, borderRadius:5, margin:15}}>
					<View style={props.appointmentListShow?styles.selectedView:styles.unselectedView}>
						<MediqText style={props.appointmentListShow?styles.selectedText:styles.unselectedText} onPress={props.showAppointmentList}>Appointments</MediqText>
					</View>
					<View style={props.patientListShow?styles.selectedView:styles.unselectedView}>
					<MediqText style={props.patientListShow?styles.selectedText:styles.unselectedText} onPress={props.showPatientList}>Patients</MediqText>
					</View>
				</View>
			</View>
		</View>
		{props.appointmentListShow?( 
			(!props.appointments||props.appointments.length==0)?
			<EmptyDataSet/>:
			<AppointmentList title={new Date().getDate()} appData={props.appointments} navigation={props.navigation} onPress={props.showAppointment}/>
			):null}
		{props.patientListShow?<PatientList navigation={props.navigation} onPress={props.showPatient}/>:null}
		<PatientFormScreen />
	</View>
);



class HomeScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return {
	    title: 'Home',
		headerRight: <Button title="Logout" onPress={() => params.confirmLogout()} />
		}
	  };
	
	constructor(props) {
		super(props);
		this.doLogout = this.doLogout.bind(this);
		this.confirmLogout = this.confirmLogout.bind(this);
	}

	componentDidMount(){
		this.props.hideLoginLoading();
		this.props.navigation.setParams({
			confirmLogout: this.confirmLogout
		  })
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
			{id:2, date: {day:"28", month: "Aug", weekday:"Monday"}, patient:{id:1, firstName:"Jamie", lastName:"Tang", address:"Residencias de Manila", birthday:"02/02/2016"}, doctor: {name:'Dr. Kwak'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM"}, status:"Scheduled" },
			{id:3, date: {day:"28", month: "Aug", weekday:"Monday"}, patient:{id:2, firstName:"Jasmine", lastName:"Tang", address:"Residencias de Manila", birthday:"11/28/2009"}, doctor: {name:'Dr. Kwak'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM"}, status:"Scheduled" }
		];
		
		return (
			<DumbHomeScreen appointments={this.props.appointments} patients={this.props.patients} navigation={this.props.navigation} showAppointment={this.props.showAppointment} showPatient={this.props.showPatient} tabLabel="Home"
			 showPatientList={this.props.showPatientList} 
			 showAppointmentList={this.props.showAppointmentList}
			 patientListShow={this.props.patientListShow} 
			 appointmentListShow={this.props.appointmentListShow}
			 viewProfile={this.props.viewProfile}
			 user={this.props.user}
			 />
		);
	}

}

const mapStateToProps = state => ({
	show: state.showAbout,
	username: state.sessionStore.username,
	user: state.sessionStore.user,
	fbInfo: state.fbInfo,
	patients: state.patientStore.patients,
	appointments: state.appointments,
	patientListShow: state.doctorStore.patientListShow,
	appointmentListShow: state.doctorStore.appointmentListShow,
})

const mapDispatchToProps = (dispatch) => ({
	showAppointment: (appointment) => { dispatch({ type: 'SHOW_APPOINTMENT', appointment:appointment}) },
	showPatient: (patient) => { dispatch({ type: 'SHOW_PATIENT', patient:patient }) },
	showAppointmentList: () => { dispatch({ type: 'SHOW_APPOINTMENT_LIST'}) },
	showPatientList: () => { dispatch({ type: 'SHOW_PATIENT_LIST'}) },
	viewProfile: (doctor) => { dispatch({ type: 'VIEW_DOCTOR_PROFILE', doctor:doctor}) },
	doLogout: () => { dispatch({ type: 'LOGOUT'}) },
	hideLoginLoading: () => { dispatch({ type:'HIDE_LOGIN_LOADING'})},
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
