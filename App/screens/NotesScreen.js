import React, { Component } from 'react';
import { Animated, Easing, Platform, StyleSheet,  Linking, View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import MediqText from '../components/MediqText.js';
import Notes from '../components/Notes.js';

const DumbNotesScreen = (props) => (
	<Animated.View style={{
  	    position: 'absolute',
  	    top: 0,
  	    left: 0,
  	    right: 0,
  	    bottom: 0,
  	    backgroundColor:'white',
  	    flexDirection:'column',
  	    alignItems:'center',
		transform: [{translateY: props.bounceValue}]
	}}>
		<Notes closeNotes={props.closeNotes}/>
	</Animated.View>
);


class NotesScreen extends Component {

	constructor(props) { 
			super(props);

			this.state = {
				bounceValue: new Animated.Value(1000)
			}

			this.showNotes = this.showNotes.bind(this)
			this.closeNotes = this.closeNotes.bind(this)
		}

	showNotes(){
		Animated.timing(
			this.state.bounceValue,
			{
			  toValue: 0,
			  easing: Easing.ease,
			  duration:0
			}
		  ).start();
	}

	closeNotes(){
		Animated.timing(
			this.state.bounceValue,
			{
			  toValue:1000,
			  easing: Easing.easeInOut,
			  duration:0
			}
		  ).start();
		setTimeout(() => { this.props.closeNotes(); },500);
	}

	componentWillReceiveProps(nextProps){
		if(!this.props.editingNotes && nextProps.editingNotes){
		this.showNotes();
		}
	}

	componentDidMount(){
		this.showNotes();
	}

	saveNotes(){
		this.props.saveNotes();
		this.props.closeNotes();
	}

	render() {
		return (
			this.props.editingNotes?<DumbNotesScreen bounceValue={this.state.bounceValue} saveNotes={this.saveNotes} closeNotes={this.closeNotes}/>:null
		);
    }
}

const mapStateToProps = state => ({
	editingNotes: state.notesStore.editNotes,
})

const mapDispatchToProps = (dispatch) => ({
	closeNotes: () => { dispatch({ type: 'CLOSE_NOTES' }) },
})

export default connect(mapStateToProps, mapDispatchToProps)(NotesScreen)
