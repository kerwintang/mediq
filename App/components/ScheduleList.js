import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import MediqText from './MediqText.js';
import EmptyDataSet from './EmptyDataSet.js';
import moment from 'moment';	
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';


const DumbScheduleList = (props) => (
    <View style={{flexDirection:'column', width:"100%"}}>
		<View style={{flexDirection:'row', width:"100%", padding:10}}>
        	<MediqText style={{fontSize:15, backgroundColor:"transparent",color:"#8F8E94"}}>{moment(props.date).format("dddd, MMMM DD YYYY")}</MediqText>
			<TouchableWithoutFeedback onPress={props.doShowCalendar}>
				<Image style={{position:"absolute", right:10,top:5, height:20, width:20}} source={require('../img/icCalendar.png')}/>
			</TouchableWithoutFeedback>
		</View>
		{props.schedules.length>0?
        <View style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        }}>
        {props.schedules}
        </View>:
		<EmptyDataSet icon="list" title="No Clinic Schedule" message="You have no clinic scheduled for this day, doc. Enjoy your day!"/>
		}
		{props.showCalendar?
		<View style={{position:"absolute", width:"100%"}}>
			<Calendar
			current={moment(props.date).format('YYYY-MM-DD')}
			markedDates={{[moment(props.date).format('YYYY-MM-DD')]:{selected:true}}}
			onDayPress={(day)=>{props.setDate(day); props.doHideCalendar();}}
			/>
		</View>:null}
    </View>
);

const DumbScheduleView = (props) => (
	<TouchableWithoutFeedback onPress={()=>{props.onPress(props.schedule, props.cs); props.navigation.navigate("Schedule")}}>
	<View style={{
		flexDirection: 'row',
		height:60, 
		backgroundColor:"white",
		alignItems:'center',
		marginBottom:1
	}}>
		<View style={{flexDirection:"column", width:"75%", padding:20}}>
			<MediqText style={{fontSize:20, color:"#0F3D68"}}>{props.schedule.startTime} - {props.schedule.endTime}</MediqText>
			<MediqText style={{color:"#8F8E94"}}>{props.schedule.Clinic.name} {props.schedule.Clinic.room}</MediqText>
		</View>
		<View style={{flexDirection:"row", padding:20 , width:"25%", justifyContent:"flex-end"}}>
				<View style={{backgroundColor:"#5AA83E", borderRadius:20, padding:5, width:30}}>
					<MediqText style={{fontSize:18, color:"white", textAlign:'center'}}>{props.ac}</MediqText>
				</View>
			</View>
	</View>
	</TouchableWithoutFeedback>
);


class ScheduleList extends Component {
	constructor(props) {
		super(props);
	}
	
	getClinicSchedule(id){
		for(var i=0;i<this.props.clinicSchedules.length;i++){
			if(this.props.clinicSchedules[i].scheduleId==id){
				return this.props.clinicSchedules[i];
			}
		}
		return null;
	}

	setDate(date){
		this.props.setDate(date);
		setTimeout(()=>{this.props.reloadScheduleList()},10);
	}
	
		
	render() {
		var schedules = [];
		for(var i in this.props.schedules){
			if(this.props.schedules[i].dayOfWeek==moment(this.props.date).day()){
				var cs = this.getClinicSchedule(this.props.schedules[i].id);
				var ac = cs?cs.Appointments.length:0;
				schedules.push(<DumbScheduleView key={i} ac={ac} cs={cs} schedule={this.props.schedules[i]} navigation={this.props.navigation} onPress={this.props.onPress}/>)
			}
		}
		return (
				<DumbScheduleList title={this.props.title} date={this.props.date} schedules={schedules} showCalendar={this.props.showCalendar} doShowCalendar={this.props.doShowCalendar} doHideCalendar={this.props.doHideCalendar} setDate={this.setDate.bind(this)}/>
		);
    }
}

const mapStateToProps = state => ({
	schedules: state.scheduleStore.schedules,
	clinicSchedules: state.scheduleStore.clinicSchedules,
	date: state.scheduleStore.date,
	showCalendar: state.scheduleStore.showCalendar
})

const mapDispatchToProps = (dispatch) => ({
	doShowCalendar: () => { dispatch({ type: 'SHOW_CALENDAR'}) },
	doHideCalendar: () => { dispatch({ type: 'HIDE_CALENDAR'}) },
	reloadScheduleList: () => { dispatch({ type: 'RELOAD_SCHEDULE_LIST'}) },
	setDate: (date) => { 
		dispatch({ type: 'SET_SCHEDULE_DATE', date:moment(date.month+"/"+date.day+"/"+date.year, "MM/DD/YYYY").toDate()}) 
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList)