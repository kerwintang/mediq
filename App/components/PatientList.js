import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button, StyleSheet, ActivityIndicator } from 'react-native';
import MediqText from './MediqText.js';
import ProfilePicture from './ProfilePicture.js';
import { connect } from 'react-redux';
import Styles from '../styles/Styles.js';
import EmptyDataSet from './EmptyDataSet';
import SearchInput, { createFilter } from 'react-native-search-filter'

const styles = StyleSheet.create({
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

const DumbPatientList = (props) => (
    <View style={{flexDirection:'column', backgroundColor:"white", width:"100%"}}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
			flexWrap:'wrap'
        }}>
        {props.patients}
        </View>
    </View>
);

const DumbPatientListItemView = (props) => (
	<TouchableWithoutFeedback onPress={()=>{
			props.onPress(props.patient); 
			if(props.navigation)
				props.navigation.navigate("Profile")
			}
		}>
		<View style={{flexDirection: "column", alignItems:"center", paddingLeft:15, paddingRight:15, paddingBottom:10, paddingTop:10, width:"32%"}}>
		  <ProfilePicture profile={props.patient} type="patient" style={{height:70, width:70, borderRadius:35}}/>
			<Text style={{backgroundColor:'transparent', textAlign:'center', paddingBottom:10, fontSize:12, color:Styles.colors.twilightBlue}}>{props.patient.lastName}, {props.patient.firstName}</Text>
		</View>
	</TouchableWithoutFeedback>
);

class PatientList extends Component {
	constructor(props) {
		super(props);
		this.search.bind(this);
	}
	
	search(text) {
        this.props.setSearchTerm(text);
      }
  
	componentDidMount(){
		this.props.setSearchTerm("");
	}
	
	render() {
		var patients = [];
		const KEYS_TO_FILTERS = ['firstName','lastName'];
		const filtered = this.props.patientsList.filter(createFilter(this.props.term, KEYS_TO_FILTERS));
		  for(var i in filtered){
			patients.push(<DumbPatientListItemView key={i} patient={filtered[i]} navigation={this.props.navigation} onPress={this.props.onPress}/>)
        }
		return (
			<View style={{width:"100%"}}>
			<SearchInput style={{backgroundColor:"white", padding:5, borderBottomWidth:1, borderColor:Styles.colors.paleGrey, padding:5}} onChangeText={(term) => { this.search(term) }} />
			{patients.length>0?
				<DumbPatientList title={this.props.title} patients={patients}/>:
			<EmptyDataSet icon="list" title="No Patients Found" message="Tap on New Patient to add your first patient."/>
			}
			</View>
			
		);
    }
}

const mapStateToProps = state => ({
	patientsList: state.patientStore.patientsList,
	term: state.searchStore.term,
})

const mapDispatchToProps = (dispatch) => ({
	newPatient: () => { dispatch({ type: 'NEW_PATIENT'}) },
	setSearchTerm: (term) =>  { dispatch({ type: 'SET_SEARCH_TERM', term:term}) },
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientList)