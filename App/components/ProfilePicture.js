import React, { Component } from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image'

export default class ProfilePicture extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<View>
			<ActivityIndicator
			style={StyleSheet.flatten([{position:"absolute", paddingTop:5, height:50, width:50, borderRadius:25}, this.props.style])} 
			/>
			{this.props.profile.picture?
			<FastImage { ...this.props } style={StyleSheet.flatten([{height:50, width:50, borderRadius:25}, this.props.style])} source={{uri:'https://s3-ap-southeast-1.amazonaws.com/mediq-assets/profiles/'+this.props.profile.picture}}/>:
			this.props.type=="patient"?<Image { ...this.props } style={StyleSheet.flatten([{height:50, width:50, borderRadius:25}, this.props.style])} resizeMode="center" source={require('../img/patient.png')}/>:
			<Image { ...this.props } style={StyleSheet.flatten([{height:50, width:50, borderRadius:25}, this.props.style])} resizeMode="center" source={require('../img/doctor.png')}/>}	
			</View>
		);
    }
}