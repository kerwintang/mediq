import React, { Component } from 'react';
import { Platform, StyleSheet,  Linking, View, ScrollView, Text, TextInput, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';
import AppointmentList from '../components/AppointmentList.js';
import ProfileFormScreen from '../screens/ProfileFormScreen.js';
import HmoFormScreen from '../screens/HmoFormScreen.js';
import Styles from '../styles/Styles.js';
import { client } from '../actions'

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const DumbProfileScreen = (props) => (
	<View style={{
 position: 'absolute',
  	    top: 0,
  	    left: 0,
		right: 0,
		bottom: 0,
	}}>
	<ScrollView contentContainerStyle={{
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
		right: 0,
  	    backgroundColor:Styles.styles.paleGrey,
  	    borderRadius:10,
  	    flexDirection:'column',
  	    alignItems:'center',
		padding:5,
	}}>
		<View style={{flexDirection: "column", padding:10, width:"100%", backgroundColor:"white", alignItems:"center"}}>
			{(props.profile.id==props.sessionProfile.id)?<View style={{position:"absolute",top:0, right:0}}>
			<TouchableWithoutFeedback onPress={props.editProfile}>
				<MediqText style={Styles.styles.sectionHeaderAdd}>EDIT</MediqText>
			</TouchableWithoutFeedback>
			</View>:null}
			<ActivityIndicator
				style={{position:"absolute", height:100, width:100, paddingTop:5}}
			/>
			{props.profile.id?<Image style={{height:100, width:100, borderRadius:50}} resizeMode="center" source={{uri:'https://s3-ap-southeast-1.amazonaws.com/mediq-assets/profile'+props.profile.id+'.png'}}/>:
			<Image style={{height:100, width:100}} resizeMode="center" source={require('../img/user.png')}/>}
			<MediqText style={{color:Styles.colors.twilightBlue, padding:5, fontSize:20}}>{props.profile.lastName}, {props.profile.firstName}</MediqText>
			{props.role=="doctor"?
				<View style={{flexDirection:"column", alignItems:"center"}}>
					<MediqText style={{color:Styles.colors.purpleyGrey, padding:5, fontSize:15}}>{props.profile.specialization}</MediqText>
					<MediqText style={{color:Styles.colors.purpleyGrey, padding:5, fontSize:15}}>{props.profile.experience}</MediqText>
				</View>
			:
				<View style={{flexDirection:"column", alignItems:"center"}}>
					<MediqText style={{color:Styles.colors.purpleyGrey, padding:5, fontSize:15}}>{props.profile.address}</MediqText>
					<MediqText style={{color:Styles.colors.purpleyGrey, padding:5, fontSize:15}}>{props.profile.birthday}</MediqText>
				</View>
			}
		</View>
		{props.role=="doctor"?<View style={{flexDirection: "column", width:"100%"}}>
			<View style={{flexDirection:"row", width:"100%"}}>
				<View style={{width:"60%"}}>
				<MediqText style={Styles.styles.sectionHeader}>HMO</MediqText>
				</View>
				{props.profile.id==props.sessionProfile.id?<View style={{width:"40%", justifyContent:"flex-end"}}>
					<TouchableWithoutFeedback onPress={props.editHmo}>
						<MediqText style={Styles.styles.sectionHeaderAdd}>EDIT</MediqText>
					</TouchableWithoutFeedback>
				</View>:null}
			</View>
			{props.hmo.length>0?
			<View style={{flexDirection: "row", width:"100%", backgroundColor:"white", padding:10, marginBottom:2, flexWrap:"wrap"}}>
				{props.hmo}
			</View>
			:<View style={Styles.styles.sectionContent}>
			<MediqText style={{color:Styles.colors.purpleyGrey, fontStyle:"italic"}}>No HMOs accepted.</MediqText>
			</View>}
		</View>:null}
		{(props.role=="doctor")?
		<View style={{flexDirection: "column", width:"100%"}}>
			<View style={{flexDirection:"row", width:"100%"}}>
				<View style={{width:"50%"}}>
				<MediqText style={Styles.styles.sectionHeader}>Clinic Schedule</MediqText>
				</View>
				{props.profile.id==props.sessionProfile.id?<View style={{width:"50%", justifyContent:"flex-end"}}>
					<TouchableWithoutFeedback onPress={props.editVitals}>
						<MediqText style={Styles.styles.sectionHeaderAdd}>EDIT</MediqText>
					</TouchableWithoutFeedback>
				</View>:null}
			</View>
				<View style={Styles.styles.sectionContent}>
					{props.clinics}
				</View>
		</View>:null}
		<View style={{flexDirection: "column", width:"100%"}}>
			<View style={{flexDirection:"row", width:"100%"}}>
				<View style={{width:"50%"}}>
				<MediqText style={Styles.styles.sectionHeader}>Appointment History</MediqText>
				</View>
			</View>
			<View style={Styles.styles.sectionContent}>
			{props.appointments.length>0?<AppointmentList appData={props.appointments}/>:<MediqText style={{color:Styles.colors.purpleyGrey, fontStyle:"italic"}}>No appointments yet.</MediqText>}
			</View>
			
		</View>
	</ScrollView>
	{props.showProfileForm?<ProfileFormScreen onSubmit={props.showResults} savePatient={props.savePatient} handleFormChange={props.handleFormChange}/>:null}
	{props.showHmoForm?<HmoFormScreen onSubmit={props.showResults} savePatient={props.savePatient} handleFormChange={props.handleFormChange}/>:null}
	</View>
);

const DumbHmoView = (props) => (
	<View style={{flexDirection: "row", justifyContent:"center", alignItems:"center", width:"50%", paddingBottom:5}}>
		<MediqText style={{width:"100%", textAlign:"center", color:Styles.colors.purpleyGrey}}>{'\u2022'} {props.hmo.name}</MediqText>
	</View>
);

const DumbScheduleView = (props) => (
	<View style={{flexDirection: "row", width:"100%", padding:2}}>
		<MediqText style={{width:"25%", fontSize:13, color:Styles.colors.purpleyGrey}}>{DAYS[props.schedule.dayOfWeek]}</MediqText>
		<MediqText style={{width:"75%", fontSize:13, color:Styles.colors.purpleyGrey }}>{props.schedule.startTime} - {props.schedule.endTime}</MediqText>
		</View>
);

const DumbClinicView = (props) => (
	<View style={{flexDirection: "column", width:"100%", backgroundColor:"white", paddingBottom:5}}>
		<MediqText style={{color:Styles.colors.twilightBlue, fontSize:15, paddingBottom:5}}>{props.clinic.name} {props.clinic.room?props.clinic.room:""}</MediqText>
	</View>
);


class ProfileScreen extends Component {
	static navigationOptions = {
		title: 'Profile',
		headerStyle: { backgroundColor:"#0F3D68" },
		headerTitleStyle: { color:"white" },
		headerBackTitleStyle: { color:"white" },
	  };

	  constructor(props) {
		super(props);
	}

	editProfile() {
		this.props.saveProfileForm(this.props.profile);
		this.props.editProfile();
	}

	componentDidMount(){
		//load HMOs
		client.get('/api/hmos/',
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			hmos = [];
			for(var i=0;i<res.data.length;i++){
				hmos.push(res.data[i].Hmo);
			}
			this.props.setHmos(hmos);
		}).catch((err) => {
			alert("ERROR: "+err);
		});

	}

	render() {
		var clinics = [];
		var hmo = [];
		if(this.props.schedules){
			var schedules = [];
			var clinicId = null;
			for(var i in this.props.schedules){
				var s = this.props.schedules[i];
				if(clinicId!=s.Clinic.id){
					clinics.push(<DumbClinicView key={i} clinic={s.Clinic}/>);
					clinicId=s.Clinic.id;
				}
				clinics.push(<DumbScheduleView key={1000+i} schedule={s}/>);
				
			}
		}
		if(this.props.hmos)
			for(var i in this.props.hmos){
				hmo.push(<DumbHmoView key={i} hmo={this.props.hmos[i]}/>)
			}
		return (
			
			this.props.profile?
				<DumbProfileScreen 
					profile={this.props.profile} 
					role={this.props.role}
					sessionUser={this.props.sessionUser} 
					sessionProfile={this.props.sessionProfile} 
					clinics={clinics} 
					hmo={hmo} 
					appointments={this.props.appointments}
					saveProfile={this.props.saveProfile}
					handleFormChange={this.props.saveProfileForm}
					editProfile={this.editProfile.bind(this)}
					editHmo={this.props.editHmo}
					showProfileForm={this.props.showProfileForm}
					showHmoForm={this.props.showHmoForm}

					/> : null
		);
    }

}

const mapStateToProps = state => ({
	show: state.showAbout,
	fbInfo: state.fbInfo,
	profile: state.profileStore.profile,
	hmos: state.profileStore.hmos,
	role: state.profileStore.role,
	appointments: state.profileStore.appointments,
	schedules: state.scheduleStore.schedules,
	sessionUser: state.sessionStore.user,
	sessionProfile: state.sessionStore.profile,
	token: state.sessionStore.token,
	showProfileForm: state.profileStore.showProfileForm,
	showHmoForm: state.profileStore.showHmoForm
})

const mapDispatchToProps = (dispatch) => ({
	saveProfileForm: (profileForm) => { dispatch({ type: 'SAVE_PROFILE_FORM', profileForm:profileForm}) },
	saveHmoForm: (hmoForm) => { dispatch({ type: 'SAVE_HMO_FORM', hmoForm:hmoForm}) },
	saveProfile: () => { dispatch({ type: 'SAVE_PROFILE'}) },
	saveHmo: () => { dispatch({ type: 'SAVE_HMO'}) },
	setHmos: (hmos) => { dispatch({ type: 'SET_HMOS', hmos:hmos}) },
	editProfile: () => { dispatch({ type: 'SHOW_PROFILE_FORM'}) },
	editHmo: () => { dispatch({ type: 'SHOW_HMO_FORM'}) },
	showAppointment: (appointment) => { dispatch({ type: 'SHOW_APPOINTMENT', appointment:appointment}) }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
