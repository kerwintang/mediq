import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button, StyleSheet, ActivityIndicator } from 'react-native';
import MediqText from './MediqText.js';
import { connect } from 'react-redux';
import Styles from '../styles/Styles.js';
import EmptyDataSet from './EmptyDataSet';

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
		<View style={{flexDirection: "column", alignItems:"center", padding:15, width:"32%"}}>
		<ActivityIndicator
			style={{position:"absolute", height:50, width:50, paddingTop:20}}
          />
			{props.patient.id?<Image style={{height:70, width:70, borderRadius:35}} resizeMode="center" source={{uri:'https://s3-ap-southeast-1.amazonaws.com/mediq-assets/profile'+props.patient.id+'.png'}}/>:
			<Image style={{height:70, width:70}} resizeMode="center" source={require('../img/user.png')}/>}
			<Text numberOfLines={2} style={{backgroundColor:'transparent', textAlign:'center', paddingBottom:10, fontSize:12, color:Styles.colors.twilightBlue}}>{props.patient.lastName}, {props.patient.firstName}</Text>
		</View>
	</TouchableWithoutFeedback>
);

class PatientList extends Component {
	constructor(props) {
		super(props);
	}
	
	
	render() {
		var patients = [];
		console.log("PATIENTS LIST: "+this.props.patientsList.length);
		for(var i in this.props.patientsList){
			patients.push(<DumbPatientListItemView key={i} patient={this.props.patientsList[i]} navigation={this.props.navigation} onPress={this.props.onPress}/>)
        }
		return (
			patients.length>0?
			<DumbPatientList title={this.props.title} patients={patients}/>:
			<EmptyDataSet icon="list" title="No Patients Found" message="Tap on New Patient to add your first patient."/>
			
		);
    }
}

const mapStateToProps = state => ({
	patientsList: state.patientStore.patientsList,
})

const mapDispatchToProps = (dispatch) => ({
	newPatient: () => { dispatch({ type: 'NEW_PATIENT'}) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientList)