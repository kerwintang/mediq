import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class MediqText extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const { style } = this.props;
		return (
			<Text { ...this.props } style={StyleSheet.flatten([{backgroundColor:'transparent'}, style])}/>
		);
    }
}