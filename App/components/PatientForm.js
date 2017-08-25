import React, { Component } from 'react';
import { ScrollView, Button, TextInput } from 'react-native';
import MediqText from '../components/MediqText.js';
import { Form,
    Separator,InputField, DatePickerField
  } from 'react-native-form-generator';

class PatientForm extends Component {
    
    handleFormFocus(e, component){
        //console.log(e, component);
      }
    render(){
        return (
            <ScrollView style={{paddingLeft:10,paddingRight:10, height:200, width:"100%"}}>
                <MediqText style={{fontSize:20, fontWeight:"bold", textAlign:"center", paddingTop:10}}>Patient Information</MediqText>
        <Form
        label="Patient Information"
        onChange={this.props.handleFormChange}
        >
        <Separator />
            <InputField ref='firstName' placeholder='First Name'/>
            <InputField ref='lastName' placeholder='Last Name'/>
            <InputField ref='address' placeholder='Address'/>
            <InputField ref='mobile' placeholder='Mobile Number'/>
            <InputField ref='email' placeholder='E-mail'/>
            <DatePickerField ref='birthday'
            minimumDate={new Date('1/1/1900')}
            maximumDate={new Date()}
            mode="date"
            prettyPrint={true}
            dateTimeFormat={(date, mode)=>{
                if(!date) return "";
                let value=date.toLocaleDateString();
                return value;
                }
            }
            placeholder='Birthday'/>

            <Button title="Submit" onPress={this.props.savePatient}/>
            <Button title="Cancel" onPress={this.props.cancelPatient}/>
            </Form>
        </ScrollView>
        );
    }
}
  
export default PatientForm;