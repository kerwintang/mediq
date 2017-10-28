import React, { Component } from 'react';
import { View, ScrollView, Image, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import MediqText from '../components/MediqText.js';
import { Form,
    Separator, InputField
  } from 'react-native-form-generator';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from '../styles/Styles.js';
import PhotoUpload from 'react-native-photo-upload';
import ImagePicker from 'react-native-image-picker';
import { uploadFile } from '../actions/upload-actions.js';
import { connect } from 'react-redux';

class ClinicScheduleForm extends Component {
    
    handleFormFocus(e, component){
        //console.log(e, component);
      }

      constructor(props) {
        super(props);
    }

    saveClinicSchedule(){
        //TODO :Convert csForm to schedules.
		client.post('/api/schedules', {csForm:this.props.csForm},
		{headers:{"x-access-token": this.props.token}}).then((res) => {
            this.props.addSchedules(res.data);
			this.props.closeModal();
		}).catch((err) => {
			alert("ERROR: "+err);
			this.props.closeModal();
		});
	}
    
      handleFormFocus(event, reactNode){
        this.refs.scroll.scrollToFocusedInput(reactNode)
     }
    render(){
        return (
            <View style={{width:"100%",height:"100%", marginTop:"10%"}}>
            <KeyboardAwareScrollView ref='scroll'>
                <MediqText style={{fontSize:20, textAlign:"center", padding:10, color:Styles.colors.twilightBlue}}>Clinic Schedule</MediqText>
                    <Form
                    label="Clinic Schedule"
                    onChange={this.handleFormChange}
                    >
                    <MediqText style={{fontSize:18, width:"100%", textAlign:"center", color:Styles.colors.twilightBlue}}>Where do you hold your clinic?</MediqText>
                    <InputField ref='name' placeholder='Hospital Name, Building, or Address'/>
                    <InputField ref='room' placeholder='Room No. (Optional)'/>
                    <MediqText style={{paddingTop:20,fontSize:18, width:"100%", textAlign:"center", color:Styles.colors.twilightBlue}}>Which days do you hold clinic here?</MediqText>
                    <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center"}}>
                        <TouchableOpacity onPress={() => {this.props.setMonday()}}>
                            <MediqText style={this.props.csForm.mon?Styles.styles.scheduleDaySelected:Styles.styles.scheduleDay}>Monday</MediqText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.props.setTuesday()}}>
                            <MediqText style={this.props.csForm.tues?Styles.styles.scheduleDaySelected:Styles.styles.scheduleDay}>Tuesday</MediqText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.props.setWednesday()}}>
                            <MediqText style={this.props.csForm.wed?Styles.styles.scheduleDaySelected:Styles.styles.scheduleDay}>Wednesday</MediqText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.props.setThursday(3)}}>
                            <MediqText style={this.props.csForm.thurs?Styles.styles.scheduleDaySelected:Styles.styles.scheduleDay}>Thursday</MediqText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.props.setFriday(3)}}>
                            <MediqText style={this.props.csForm.fri?Styles.styles.scheduleDaySelected:Styles.styles.scheduleDay}>Friday</MediqText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.props.setSaturday(3)}}>
                           <MediqText style={this.props.csForm.sat?Styles.styles.scheduleDaySelected:Styles.styles.scheduleDay}>Saturday</MediqText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.props.setSunday(3)}}>
                            <MediqText style={this.props.csForm.sun?Styles.styles.scheduleDaySelected:Styles.styles.scheduleDay}>Sunday</MediqText>
                        </TouchableOpacity>
                    </View>

                    <MediqText style={{paddingTop:10,fontSize:18, width:"100%", textAlign:"center", color:Styles.colors.twilightBlue}}>What time?</MediqText>
                    <InputField ref='startTime' placeholder='Start Time in 24H format (e.g. 14:00)'/>
                    <InputField ref='endTime' placeholder='End Time in 24H format (e.g. 17:00)'/>
                    <View style={{
                        padding:10,
                        height:40,
                        backgroundColor:"white",
                        width:"100%",
                        flexDirection:"row",
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                    <View style={Styles.styles.pageFooterButtonLeft}>
                        <TouchableOpacity onPress={this.saveClinicSchedule}>
                            <MediqText style={Styles.styles.pageFooterButtonText}>SAVE</MediqText>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.styles.pageFooterButtonRight}>
                        <TouchableOpacity onPress={() => {
                            Alert.alert(
                                "Changes not saved",
                                "Are you sure you want to discard your changes?",
                                [
                                    {text: 'Cancel', onPress: () => console.log("Cancelled"), style: 'cancel'},
                                    {text: 'OK', onPress: () => {this.props.closeModal() }},
                                ]
                            )
                            }
                        }>
                            <MediqText style={Styles.styles.pageFooterButtonTextRed}>CANCEL</MediqText>
                        </TouchableOpacity>
                    </View>
                </View>
                    </Form>
            </KeyboardAwareScrollView>
            
            </View>
        );
    }
}
  

const mapStateToProps = state => ({
    csForm: state.clinicScheduleStore.csForm,
	profileId: state.profileStore.profileId,
	token: state.sessionStore.token
})

const mapDispatchToProps = (dispatch) => ({
    setMonday: () => { dispatch({ type:'SET_MONDAY'})},
    setTuesday: () => { dispatch({ type:'SET_TUESDAY'})},
    setWednesday: () => { dispatch({ type:'SET_WEDNESDAY'})},
    setThursday: () => { dispatch({ type:'SET_THURSDAY'})},
    setFriday: () => { dispatch({ type:'SET_FRIDAY'})},
    setSaturday: () => { dispatch({ type:'SET_SATURDAY'})},
    setSunday: () => { dispatch({ type:'SET_SUNDAY'})},
    addSchedules: (schedules) => { dispatch({ type:'ADD_SCHEDULES', schedules:schedules})},
	closeModal: () => { dispatch({ type: 'CLOSE_MODAL'}) }
})


export default connect(mapStateToProps, mapDispatchToProps)(ClinicScheduleForm);