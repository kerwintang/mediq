import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button, StyleSheet, ActivityIndicator } from 'react-native';
import MediqText from './MediqText.js';
import { connect } from 'react-redux';

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
	<TouchableWithoutFeedback onPress={()=>{props.onPress(props.patient); props.navigation.navigate("Patient")}}>
		<View style={{flexDirection: "column", alignItems:"center", padding:15, width:"32%"}}>
		<ActivityIndicator
			style={{position:"absolute", height:50, width:50, paddingTop:20}}
          />
			{props.patient.id?<Image style={{height:70, width:70, borderRadius:35}} resizeMode="center" source={{uri:'https://s3-ap-southeast-1.amazonaws.com/mediq-assets/patient'+props.patient.id+'.png'}}/>:
			<Image style={{height:70, width:70}} resizeMode="center" source={require('../img/user.png')}/>}
			<Text adjustsFontSizeToFit={true} numberOfLines={2} style={{backgroundColor:'transparent', textAlign:'center', paddingBottom:10, fontSize:15}}>{props.patient.lastName}, {props.patient.firstName}</Text>
		</View>
	</TouchableWithoutFeedback>
);

class PatientList extends Component {
	constructor(props) {
		super(props);
	}
	
	
	render() {
		var patients = [];
		for(var i in this.props.patientsList){
			patients.push(<DumbPatientListItemView key={i} patient={this.props.patientsList[i]} navigation={this.props.navigation} onPress={this.props.onPress}/>)
        }
		return (
			<View style={{width:"100%"}}>
			<DumbPatientList title={this.props.title} patients={patients}/>
			<Button title="New Patient" onPress={this.props.newPatient}/>
			</View>
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