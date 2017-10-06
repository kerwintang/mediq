import React, { Component } from 'react';
import { Animated, Easing, Platform, StyleSheet,  Linking, View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';
import ProfileForm from '../components/ProfileForm.js';
import showResults from './ShowResults.js';
import { client } from '../actions'

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


const DumbProfileFormScreen = (props) => (
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
		<ProfileForm onSubmit={showResults} saveProfile={props.saveProfile} closeProfileForm={props.closeProfileForm} handleFormChange={props.handleFormChange}/>
	</Animated.View>
);


class ProfileFormScreen extends Component {
	static navigationOptions = {
	    title: 'Patient',
	  };

	  constructor(props) { 
		super(props);

		this.state = {
			bounceValue: new Animated.Value(1000)
		}

		this.closeProfileForm = this.closeProfileForm.bind(this)
		this.saveProfile = this.saveProfile.bind(this)
	}

	showProfileForm(){
		Animated.timing(
			this.state.bounceValue,
			{
			  toValue: 0,
			  easing: Easing.ease,
			  duration:500
			}
		  ).start();
	}

	showProfileFormQuick(){
		Animated.timing(
			this.state.bounceValue,
			{
			  toValue: 0,
			  easing: Easing.ease,
			  duration:1
			}
		  ).start();
	}

	closeProfileForm(){
		Animated.timing(
			this.state.bounceValue,
			{
			  toValue:1000,
			  easing: Easing.ease,
			  duration:500
			}
		  ).start();
		setTimeout(() => { this.props.closeProfileForm(); },500);
	}


	componentWillReceiveProps(nextProps){
		if(!this.props.showProfileForm && nextProps.showProfileForm){
		this.showProfileForm();
		}
	}

	componentDidMount(){
		this.showProfileForm();
	}

	saveProfile(){
		if(this.props.profileId){
			client.put('/api/profile/'+this.props.profileId, this.props.profileForm,
			{headers:{"x-access-token": this.props.token}}).then((res) => {
				this.props.saveProfile();
				this.props.reloadPatientList();
				this.closeProfileForm();
			}).catch((err) => {
				alert("ERROR: "+err);
				this.closeProfileForm();
			});

		}else{
			client.post('/api/profile',{
				...this.props.profileForm,
				doctorId:this.props.user.id
			},
			{headers:{"x-access-token": this.props.token}}).then((res) => {
				this.props.saveProfile();
				this.props.reloadPatientList();
				this.closeProfileForm();
			}).catch((err) => {
				alert("ERROR: "+err);
				this.closeProfileForm();
			});
		}
	}

	render() {
		return (
			<DumbProfileFormScreen profile={this.props.profile} bounceValue={this.state.bounceValue} handleFormChange={this.props.saveProfileForm} saveProfile={this.saveProfile} closeProfileForm={this.closeProfileForm}/>
		);
    }
}

const mapStateToProps = state => ({
	fbInfo: state.fbInfo,
	profile: state.profileStore.profile,
	profileId: state.profileStore.profileId,
	profileForm: state.profileStore.profileForm,
	token: state.sessionStore.token,
	user: state.sessionStore.user
})

const mapDispatchToProps = (dispatch) => ({
	saveProfileForm: (profileForm) => { dispatch({ type: 'SAVE_PROFILE_FORM', profileForm:profileForm}) },
	saveProfile: () => { dispatch({ type: 'SAVE_PROFILE'}) },
	showPatientList: () => { dispatch({ type: 'SHOW_PATIENT_LIST'}) },
	reloadPatientList: () => { dispatch({ type: 'RELOAD_PATIENT_LIST'}) },
	closeProfileForm: () => { dispatch({ type: 'CLOSE_PROFILE_FORM'}) }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFormScreen)
