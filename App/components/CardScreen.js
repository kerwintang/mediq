import React, { Component } from 'react';
import { Platform, Linking, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';


const DumbCardScreen = (props) => (
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
  	    justifyContent:'center'
	}}>
		<DumbCardImage/>
	</View>
);

const DumbCardImage = (props) => (
	<View style={{borderWidth:1}}>
	Z
	</View>
);



class CardScreen extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
				<DumbCardScreen/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardScreen)
