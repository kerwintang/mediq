import React, { Component } from 'react';
import { Platform, Linking, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';


const DumbAppointmentScreen = (props) => (
	<View style={{
  	    position: 'absolute',
  	    top: 30,
  	    left: 20,
  	    right: 20,
  	    bottom: 30,
  	    backgroundColor:'white',
  	    borderRadius:10,
  	    flexDirection:'column',
  	    alignItems:'center',
	}}>
		<View style={{
			flexDirection:'column',
			alignItems:'center',
		}}>
			<Text style={{fontSize:30}}>Sun., Aug. 13, 2017</Text>
			<Text>Dr. Apostol</Text>
		</View>
		<View style={{
			flexDirection:'row',
			alignItems:'center',
			borderWidth:1
		}}>
			<Text>Take medicine 3x a day before bedtime</Text>
		</View>
	</View>
);

const DumbCardImage = (props) => (
	<View style={{borderWidth:1}}>
		Hello!
	</View>
);



class AppointmentScreen extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
				<DumbAppointmentScreen/>
		);
    }
}

const mapStateToProps = state => ({
	show: state.showAbout,
	fbInfo: state.fbInfo,
	inventory: state.inventory,
	noLocation: state.noLocation
})

const mapDispatchToProps = (dispatch) => ({
	hideAbout: () => { dispatch({ type: 'HIDE_ABOUT' }) },
	showAbout: () => { dispatch({ type: 'SHOW_ABOUT' }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScreen)
