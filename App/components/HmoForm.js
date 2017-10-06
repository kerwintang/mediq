import React, { Component } from 'react';
import { View, ScrollView, Image, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import MediqText from '../components/MediqText.js';
import { Form,
    Separator, SwitchField
  } from 'react-native-form-generator';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from '../styles/Styles.js';
import PhotoUpload from 'react-native-photo-upload';
import ImagePicker from 'react-native-image-picker';
import { uploadFile } from '../actions/upload-actions.js';
import { connect } from 'react-redux';

class HmoForm extends Component {
    
    handleFormFocus(e, component){
        //console.log(e, component);
      }

      constructor(props) {
        super(props);
        this.closeHmoForm.bind(this);
    }
    
      closeHmoForm(){
          this.props.closeHmoForm();
      }

      handleFormFocus(event, reactNode){
        this.refs.scroll.scrollToFocusedInput(reactNode)
     }
    render(){
        var hmos = [];
        for(var i=0;i<this.props.hmoList.length;i++){
            var val = false;
            for(var j=0;j<this.props.hmos.length;j++){
                if(this.props.hmos[j].id==this.props.hmoList[i].id){
                    val = true;
                }
            }
            hmos.push(<SwitchField label={this.props.hmoList[i].name} key={i} ref={"hmo_"+this.props.hmoList[i].id} value={val}/>)
        }
        return (
            <View style={{width:"100%",height:"100%"}}>
            <KeyboardAwareScrollView ref='scroll'>
                <MediqText style={{fontSize:20, textAlign:"center", padding:10, color:Styles.colors.twilightBlue}}>{this.props.role=="doctor"?"Doctor":"Patient"} Hmo</MediqText>
                    <Form
                    label="Patient Hmo"
                    onChange={this.props.handleFormChange}
                    >
                    <Separator />
                    {hmos}

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
                        <TouchableOpacity onPress={this.props.saveHmo}>
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
                                    {text: 'OK', onPress: () => {this.closeHmoForm() }},
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
    hmo: state.profileStore.hmo,
    hmoList: state.sessionStore.hmoList,
    hmos: state.profileStore.hmos,
    role: state.profileStore.role
})

const mapDispatchToProps = (dispatch) => ({
    uploadComplete: () =>  { dispatch({ type: 'UPLOAD_COMPLETE'}) },
})

export default connect(mapStateToProps, mapDispatchToProps)(HmoForm);