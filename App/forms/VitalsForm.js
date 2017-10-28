import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableWithoutFeedback, ScrollView, ActivityIndicator } from 'react-native';
import MediqText from '../components/MediqText.js';
import { connect } from 'react-redux';
import Styles from '../styles/Styles.js';

class VitalsForm extends Component {
    
      constructor(props) {
        super(props);
        this.search = this.search.bind(this);
	}

      search(text) {
        this.props.setSearchTerm(text);
      }
  
    render(){
        return (
            <View style={{ flex: 1, padding:5, paddingTop:40, opacity:0.9}}>
              <View style={{width:"100%", padding:10}}>
                <Text style={{fontWeight:"bold", fontSize:20}}>Add Vitals</Text>
                <Text style={{marginBottom:10}}>Please specify the vital information you want to add.</Text>
              </View>
            
              <TextInput placeholder="Name" onChangeText={this.props.setName}/>
              <TextInput placeholder="Value" onChangeText={this.props.setValue}/>
                <View style={{display:"flex", flexDirection:"row"}}>
                  <Button onPress={this.props.saveVitals} title="Save"/>
                  <Button onPress={this.props.close} title="Cancel"/>
                </View>
              </View>
        );
    }
}
  

const mapStateToProps = state => ({
})

const mapDispatchToProps = (dispatch) => ({
  setName: (name) =>  { dispatch({ type: 'SET_VITALS_NAME', name:name}) },
  setValue: (value) =>  { dispatch({ type: 'SET_VITALS_VALUE', value:value}) },
})

export default connect(mapStateToProps, mapDispatchToProps)(VitalsForm)