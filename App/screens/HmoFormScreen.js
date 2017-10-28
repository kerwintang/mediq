import React, { Component } from 'react';
import { Animated, Easing, Platform, StyleSheet,  Linking, View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';
import HmoForm from '../forms/HmoForm.js';
import showResults from './ShowResults.js';
import { client } from '../actions'

const DumbHmoFormScreen = (props) => (
	<View style={{
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
  	    right: 0,
  	    bottom: 0,
  	    backgroundColor:'white',
  	    borderRadius:10,
  	    flexDirection:'column',
  	    alignItems:'center',
	}}>
		<HmoForm onSubmit={showResults} saveHmo={props.saveHmo} closeHmoForm={props.closeHmoForm} handleFormChange={props.handleFormChange}/>
	</View>
);


class HmoFormScreen extends Component {
	static navigationOptions = {
	    title: 'Patient',
	  };

	  constructor(props) { 
		super(props);

		this.saveHmo = this.saveHmo.bind(this)
	}


	componentDidMount(){
		if(this.props.hmoList.length==0){
			client.get('/api/hmo/list',
			{headers:{"x-access-token": this.props.token}}).then((res) => {
				this.props.setHmoList(res.data);
			}).catch((err) => {
				alert("ERROR: "+err);
			});
		}
	}

	saveHmo(){
		var hmos = [];
		var hmosRemove = [];
		for(hmo in this.props.hmoForm){
			var id = hmo.substring(hmo.length-1);
			if(this.props.hmoForm[hmo]){
				hmos.push(id);
			}else{
				hmosRemove.push(id);
			}
		}
		client.put('/api/profile/hmo/'+this.props.profileId, {hmos:hmos, hmosRemove:hmosRemove},
		{headers:{"x-access-token": this.props.token}}).then((res) => {
			hmos = [];
			for(var i=0;i<res.data.length;i++){
				hmos.push(res.data[i].Hmo);
			}
			this.props.setHmos(hmos);
			this.props.closeHmoForm();
		}).catch((err) => {
			alert("ERROR: "+err);
			this.closeHmoForm();
		});
	}

	render() {
		return (
			<DumbHmoFormScreen handleFormChange={this.props.saveHmoForm} saveHmo={this.saveHmo} closeHmoForm={this.props.closeHmoForm}/>
		);
    }
}

const mapStateToProps = state => ({
	fbInfo: state.fbInfo,
	hmoForm: state.profileStore.hmoForm,
	hmoList: state.sessionStore.hmoList,
	profileId: state.profileStore.profileId,
	token: state.sessionStore.token
})

const mapDispatchToProps = (dispatch) => ({
	saveHmoForm: (hmoForm) => { dispatch({ type: 'SAVE_HMO_FORM', hmoForm:hmoForm}) },
	saveHmo: () => { dispatch({ type: 'SAVE_HMO'}) },
	setHmoList: (hmoList) => { dispatch({ type: 'SET_HMO_LIST', hmoList:hmoList}) },
	setHmos: (hmos) => { dispatch({ type: 'SET_HMOS', hmos:hmos}) },
	closeHmoForm: () => { dispatch({ type: 'CLOSE_HMO_FORM'}) }
})

export default connect(mapStateToProps, mapDispatchToProps)(HmoFormScreen)
