import React, { Component } from 'react';
import { View, ScrollView, Image, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import MediqText from '../components/MediqText.js';
import ProfilePicture from '../components/ProfilePicture.js';
import { Form,
    Separator,InputField, DatePickerField
  } from 'react-native-form-generator';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from '../styles/Styles.js';
import ImagePicker from 'react-native-image-picker';
import { uploadFile } from '../actions/upload-actions.js';
import { connect } from 'react-redux';
import { client } from '../actions'

class ProfileForm extends Component {
    
    handleFormFocus(e, component){
        //console.log(e, component);
      }

      constructor(props) {
        super(props);
        this.closeProfileForm.bind(this);
	}

      closeProfileForm(){
          this.props.closeProfileForm();
      }

      handleFormFocus(event, reactNode){
        this.refs.scroll.scrollToFocusedInput(reactNode)
     }

    render(){
        return (
            <View style={{width:"100%",height:"100%",paddingTop:"5%"}}>
            <KeyboardAwareScrollView ref='scroll'>
            <MediqText style={{fontSize:20, textAlign:"center", padding:10, color:Styles.colors.twilightBlue}}>Profile Form</MediqText>
                {this.props.profile.id?<View style={{flexDirection:"column",alignItems:"center", width:"100%"}}>
                    <TouchableOpacity onPress={ () => {
                        ImagePicker.showImagePicker(null, (response) => {

                            if (response.error) {
                                alert('Error encountered, please try again.');
                            }
                            else if(!response.didCancel){
                                var filename = "profile"+this.props.profile.id+"_"+new Date().getTime();
                                uploadFile("profiles/",filename,response.uri, this.props.uploadComplete);
                                client.put('/api/profile/'+this.props.profile.id, {picture:filename},
                                    {headers:{"x-access-token": this.props.token}}).then((res) => {
                                        this.props.setPicture(filename);
                                    }).catch((err) => {
                                        alert("ERROR: "+err);
                                    });
                            }
                        })
                    }}>
                        <ProfilePicture profile={this.props.profile} type={this.props.role} style={{height:100, width:100, borderRadius:50}}/>
                    </TouchableOpacity>
                    <MediqText style={{color:Styles.colors.purpleyGrey, fontSize:12}}>(Tap to set picture)</MediqText>
                </View>:null}
                    <Form
                    label="Patient Profile"
                    onChange={this.props.handleFormChange}
                    >
                    <Separator />
                    <InputField ref='firstName' placeholder='First Name' value={this.props.profile.firstName}/>
                    <InputField ref='lastName' placeholder='Last Name' value={this.props.profile.lastName}/>
                    <DatePickerField ref='birthday'
                    date={this.props.profile.birthday}
                    minimumDate={new Date('1/1/1900')}
                    maximumDate={new Date()}
                    mode="date"
                    prettyPrint={true}
                    placeholderStyle={{color:"#C7C7CC"}}
                    valueStyle={{color:"black"}}
                    dateTimeFormat={(date, mode)=>{
                        if(!date) return "";
                        let value=date.toLocaleDateString();
                        return value;
                        }
                    }
                    placeholder='Birthday'/>
                    <InputField ref='address' placeholder='Address' value={this.props.profile.address}/>
                    <InputField ref='mobile' placeholder='Mobile Number' value={this.props.profile.mobile}/>
                    <InputField ref='email' placeholder='E-mail' autoCapitalize="none" value={this.props.profile.email}/>

                    <InputField ref='id' placeholder='' value={""+this.props.profile.id} style={{display:"none"}}/>
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
                        <TouchableOpacity onPress={this.props.saveProfile}>
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
                                    {text: 'OK', onPress: () => {this.closeProfileForm() }},
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
    profile: state.profileStore.profile,
    role: state.profileStore.role,
    token: state.sessionStore.token
})

const mapDispatchToProps = (dispatch) => ({
    uploadComplete: () =>  { dispatch({ type: 'UPLOAD_COMPLETE'}) },
    setPicture: (picture) =>  { dispatch({ type: 'SET_PICTURE', picture:picture}) },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);