import React, { Component } from 'react';
import { Animated, Easing, Platform, StyleSheet,  Linking, View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';
import ProfileForm from '../forms/ProfileForm.js';
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
	<View style={{
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
  	    right: 0,
  	    bottom: 0,
  	    backgroundColor:'white',
  	    borderRadius:10,
  	    flexDirection:'column',
  	    alignItems:'center',
	}}>
		<ProfileForm onSubmit={showResults} saveProfile={props.saveProfile} closeProfileForm={props.closeProfileForm} handleFormChange={props.handleFormChange}/>
	</View>
);


class ProfileFormScreen extends Component {
	static navigationOptions = {
	    title: 'Patient',
	  };

	  constructor(props) { 
		super(props);

		this.saveProfile = this.saveProfile.bind(this)
	}


	saveProfile(){
		if(this.props.profileId){
			client.put('/api/profile/'+this.props.profileId, this.props.profileForm,
			{headers:{"x-access-token": this.props.token}}).then((res) => {
				this.props.saveProfile();
				this.props.reloadPatientList();
				this.props.closeProfileForm();
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
				if(this.props.selectPatient){
					this.props.selectPatient(res.data);
				}
				this.props.saveProfile();
				this.props.reloadPatientList();
				this.props.closeProfileForm();
			}).catch((err) => {
				alert("ERROR: "+err);
				this.props.closeProfileForm();
			});
		}
	}

	render() {
		return (
			<DumbProfileFormScreen profile={this.props.profile} handleFormChange={this.props.saveProfileForm} saveProfile={this.saveProfile} closeProfileForm={this.props.closeProfileForm}/>
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
