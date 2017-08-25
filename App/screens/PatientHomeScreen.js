import React, { Component } from 'react';
import { Platform, ScrollView, View, Text, Image, TouchableWithoutFeedback, Button } from 'react-native';
import { connect } from 'react-redux';
import AppointmentList from '../components/AppointmentList.js';
import PatientList from '../components/PatientList.js';
import PatientFormScreen from '../screens/PatientFormScreen.js';
import MediqText from '../components/MediqText.js';


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
				<TouchableWithoutFeedback onPress={()=>{ props.viewProfile(props.sessionUser); props.navigation.navigate("Doctor")}}>
					<Image style={{height:70, width:70}} resizeMode="center" source={require('../img/doctor.png')} />
				</TouchableWithoutFeedback>
			</View>
			<View style={{flexDirection: "column", padding:10, width:"80%"}}>
				<MediqText numberOfLines={2} style={{fontSize:18}}>Good afternoon, Dr. Apostol</MediqText>
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
		<ScrollView contentContainerStyle={{
			flexDirection:'column',
	  	    alignItems:'center',
		}}>
			<AppointmentList title="Upcoming Appointments" appData={props.scheduled} navigation={props.navigation} onPress={props.onPress}/>
			<AppointmentList title="Past Appointments" appData={props.past} navigation={props.navigation} onPress={props.onPress}/>
		</ScrollView>
	</View>
);



class HomeScreen extends Component {
	static navigationOptions = {
	    title: 'Medi-Q',
	    headerRight: <Button title="Logout" />,
	  };
	
	constructor(props) {
		super(props);
	}
	
	
	render() {
		const appData = [
			{id:2, date: {day:"28", month: "Aug", weekday:"Monday"}, patient:{id:1, firstName:"Jamie", lastName:"Tang"}, doctor: {name:'Dr. Apostol'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM"}, status:"Scheduled" },
			{id:3, date: {day:"28", month: "Aug", weekday:"Monday"}, patient:{id:2, firstName:"Jasmine", lastName:"Tang"}, doctor: {name:'Dr. Apostol'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM"}, status:"Scheduled" }
		];
		const pastData = [
			{id:1, date: {day:"8", month: "Aug", weekday:"Tuesday"}, patient:{id:1, firstName:"Jamie", lastName:"Tang"}, doctor: {name:'Dr. Apostol'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM"}, status:"Completed", vitals:[{name:"height",value:"100cm"},{name:"width",value:"100lbs"}], notes:"Bedrest for 2 weeks" },
			{id:4, date: {day:"8", month: "Aug", weekday:"Tuesday"}, patient:{id:2, firstName:"Jasmine", lastName:"Tang"}, doctor: {name:'Dr. Apostol'}, clinic: {name:"Makati Medical Center Rm. 237", schedule:"1-5PM"}, status:"Completed" }
		];
		return (
			<DumbHomeScreen scheduled={appData} past={pastData} navigation={this.props.navigation} onPress={this.props.showAppointment}/>
		);
    }
}

const mapStateToProps = state => ({
	show: state.showAbout,
	username: state.sessionStore.username,
	fbInfo: state.fbInfo,
	appointments: state.appointments
})

const mapDispatchToProps = (dispatch) => ({
	showAppointment: (appointment) => { dispatch({ type: 'SHOW_APPOINTMENT', appointment:appointment}) }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
