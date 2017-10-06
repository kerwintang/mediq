import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, ActivityIndicator } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter'
import MediqText from '../components/MediqText.js';
import { connect } from 'react-redux';
import Styles from '../styles/Styles.js';

const DumbSearchItem = (props) => (
	<TouchableWithoutFeedback onPress={()=>{props.onPress(props.item)}}>
		<View style={{flexDirection:"column", width:"100%", padding:10, margin:1, borderBottomWidth:1, borderBottomColor:"#EEEEEE"}}>
			<MediqText style={{fontSize:14, color:"#0F3D68"}}>{props.name}</MediqText>
		</View>
	</TouchableWithoutFeedback>
);
class SearchForm extends Component {
    
      constructor(props) {
        super(props);
        this.search = this.search.bind(this);
	}

  

      search(text) {
        this.props.setSearchTerm(text);
      }
  
    render(){
      const KEYS_TO_FILTERS = ['name'];
      const filtered = this.props.searchList.filter(createFilter(this.props.term, KEYS_TO_FILTERS));
        return (
            <View style={{ flex: 1, padding:5, paddingTop:40, opacity:0.9}}>
              <View style={{width:"100%", padding:10}}>
                <Text style={{fontWeight:"bold", fontSize:20}}>{this.props.title}</Text>
                <Text style={{marginBottom:10}}>{this.props.description}</Text>
              </View>
            <SearchInput style={{backgroundColor:"white", borderBottomWidth:1, padding:5}} onChangeText={(term) => { this.search(term) }} />
            
            {this.props.loaded?<ScrollView>
            {filtered.map(item => {
            return (
              <DumbSearchItem key={item.id} item={item} onPress={this.props.onPress} name={item.name}/>
            )
          })}
              </ScrollView>:<ActivityIndicator
				style={{height:70, width:70, paddingTop:5}}
			/>}
          </View>
        );
    }
}
  

const mapStateToProps = state => ({
  title: state.searchStore.title,
  description: state.searchStore.description,
  loaded: state.searchStore.loaded,
  searchList: state.searchStore.searchList,
  term: state.searchStore.term,
    token: state.sessionStore.token
})

const mapDispatchToProps = (dispatch) => ({
  setSearchTerm: (term) =>  { dispatch({ type: 'SET_SEARCH_TERM', term:term}) },
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)