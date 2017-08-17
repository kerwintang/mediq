import React, { Component } from 'react';
import { Platform, ScrollView, View, Text, Image, TouchableWithoutFeedback, Button } from 'react-native';
import { connect } from 'react-redux';

const styles = {
		navbar: {
		    width:"100%",
		    height:"10%",
		    opacity:0.75
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
		<Text style={{fontSize:20, padding:20, backgroundColor:"transparent",color:"white"}}>My Appointments</Text>
		<ScrollView contentContainerStyle={{
		}}>
			<View style={{
		        flexDirection: 'column',
		        justifyContent: 'flex-start',
		        alignItems: 'flex-start'
			}}>
			{props.appointments}
			</View>
		</ScrollView>
	</View>
);

const DumbAppointment = (props) => (
	<TouchableWithoutFeedback onPress={()=>{props.onPress(props.appointment); props.navigation.navigate("Appointment")}}>
	<View style={{
		flexDirection: 'row',
		height:80, 
		backgroundColor:"white",
		alignItems:'center',
		marginBottom:1
	}}>
		<View style={{flexDirection:"column", alignItems:"center", width:"25%"}}>
			<Text style={{backgroundColor:'transparent', textAlign:'left', fontSize:22, color:"#BE33FF"}}>{props.appointment.date.month} {props.appointment.date.day}</Text>
			<Text style={{backgroundColor:'transparent', textAlign:'left', fontSize:12, color:"#BE33FF"}}>{props.appointment.date.weekday}</Text>
		</View>
		<Text style={{backgroundColor:'transparent', width:"55%", textAlign:'left', padding:10, fontSize:15}}>{props.appointment.patient.name}'s Appointment</Text>
		<View style={{width:"20%", flexDirection: "column", alignItems:"center", paddingTop:10}}>
			<Image style={{height:50, width:50}} resizeMode="center" source={require('../img/doctor.png')}/>
			<Text style={{backgroundColor:'transparent', textAlign:'left', paddingBottom:10, fontSize:10}}>{props.appointment.doctor.name}</Text>
		</View>
	</View>
	</TouchableWithoutFeedback>
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
		const { navigate } = this.props.navigation;
		const appData = [
			{id:1, date: {day:"8", month: "Aug", weekday:"Tuesday"}, patient:{name:"Jasmine"}, doctor: {name:'Dr. Kerwin'}, status:"Completed", vitals:[{name:"height",value:"100cm"},{name:"width",value:"100lbs"}], notes:"Bedrest for 2 weeks" },
			{id:2, date: {day:"28", month: "Aug", weekday:"Monday"}, patient:{name:"Jamie"}, doctor: {name:'Dr. Kerwin'}, status:"Scheduled" }
		];
		var appointments = [];
		//for(var i in this.props.appointments){
		for(var i in appData){
			appointments.push(<DumbAppointment key={i} appointment={appData[i]} navigation={this.props.navigation} onPress={this.props.showAppointment}/>)
		}
		return (
			this.props.username?<DumbHomeScreen appointments={appointments}/>:<DumbHomeScreen appointments={appointments}/>
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
