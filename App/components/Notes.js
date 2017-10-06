import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Image, ScrollView, Button, TextInput, Text } from 'react-native';
import MediqText from '../components/MediqText.js';
import Camera from 'react-native-camera';
import Sketch from 'react-native-sketch';
import { connect } from 'react-redux';
import SketchView from 'react-native-sketch-view';
import { uploadFile } from '../actions/upload-actions.js';
import { client } from '../actions'


const sketchViewConstants = SketchView.constants;

class Notes extends Component {

	constructor(props) {
        super(props);
        this.savePicture = this.savePicture.bind(this);
        this.reloadNotes = this.reloadNotes.bind(this);
	}
    
    handleFormFocus(e, component){
        //console.log(e, component);
      }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
          .then((data) => 
          this.props.setUploadPicture(data.path))
          .catch(err => console.error(err));
    }
    
    reloadNotes(){
        if(this.props.notesCategory=="doctor"){
            this.props.doReloadDoctorNotes();
        }
        if(this.props.notesCategory=="patient"){
            this.props.doReloadPatientNotes();
        }
    }

    savePicture(saveEvent){
                // TODO: Filename
        var filename = this.props.appointment.id+"_"+new Date().getTime();
        var image = saveEvent?saveEvent.localFilePath:this.props.uploadPicture
        uploadFile("notes/",filename, image, this.reloadNotes);
        client.post('/api/note/'+this.props.notesCategory+'/'+this.props.appointment.id, {picture:filename},
		{headers:{"x-access-token": this.props.token}}).then((res) => {
            this.props.closeNotes();
		}).catch((err) => {
			alert("ERROR: "+err);
            this.props.closeNotes();
		});
    }

    
    onSketchSave(saveEvent) {
        savePicture(saveEvent);
    }
    
    saveNotesType(){
        client.post('/api/note/'+this.props.notesCategory+'/'+this.props.appointment.id, {notes:this.props.notesText},
		{headers:{"x-access-token": this.props.token}}).then((res) => {
            this.reloadNotes();
            this.props.closeNotes();
		}).catch((err) => {
			alert("ERROR: "+err);
            this.props.closeNotes();
		});
    }

    

    render(){
        return (
            <View style={{width:"100%", height:"100%"}}>
                <View style={{flexDirection:"row", height:"10%"}}>
                    <View style={{width:"33%", alignItems:"center", justifyContent:"center", padding:5}}>
                    <TouchableWithoutFeedback onPress={this.props.showNotesType}><Image style={{height:30, width:30}} resizeMode="center" source={require('../img/notes.png')}/></TouchableWithoutFeedback>
                    </View>
                    <View style={{width:"33%", alignItems:"center", justifyContent:"center", padding:5}}>
                    <TouchableWithoutFeedback onPress={this.props.showNotesDraw}><Image style={{height:30, width:30}} resizeMode="center" source={require('../img/draw.png')}/></TouchableWithoutFeedback>
                    </View>
                    <View style={{width:"33%", alignItems:"center", justifyContent:"center", padding:5}}>
                    <TouchableWithoutFeedback onPress={this.props.showNotesCamera}><Image style={{height:30, width:30}} resizeMode="center" source={require('../img/camera.png')}/></TouchableWithoutFeedback>
                    </View>
                    {true?null:<View style={{width:"33%", alignItems:"center", justifyContent:"center", padding:5}}>
                    <TouchableWithoutFeedback onPress={this.props.showNotesUpload}><Image style={{height:30, width:30}} resizeMode="center" source={require('../img/camera.png')}/></TouchableWithoutFeedback>
                    </View>}
                </View>
                {this.props.notesType?<ScrollView style={{paddingLeft:10,paddingRight:10, height:"80%", width:"100%"}}>
                    <TextInput onChangeText={(text) => this.props.setNotesText(text)} autoFocus={true} multiline={true} style={{width:"100%", height:"100%", fontSize:20}}>{this.props.notes}</TextInput>
                </ScrollView>:null}
                {(this.props.notesCamera && !this.props.uploadPicture)?<View style={{paddingLeft:10,paddingRight:10, height:"80%", width:"100%"}}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        captureTarget={Camera.constants.CaptureTarget.disk}
                        style={{height:"100%", width:"100%"}}
                        aspect={Camera.constants.Aspect.fill}>
                    </Camera>
                </View>:null}
                {(this.props.notesCamera && this.props.uploadPicture)?<View style={{paddingLeft:10,paddingRight:10, height:"80%", width:"100%"}}>
                    <Image style={{height:"100%", width:"100%"}} resizeMode="center" source={{uri:this.props.uploadPicture}}/>
                </View>:null}
                {this.props.notesDraw?<View style={{paddingLeft:10,paddingRight:10, height:"80%", width:"100%"}}>
                <SketchView style={{flex: 1, backgroundColor: 'white'}} ref="sketchRef" 
                selectedTool={sketchViewConstants.toolType.pen.id} 
                onSaveSketch={this.savePicture}
                localSourceImagePath={this.props.localSourceImagePath}/>
                </View>:null}
                <View style={{height:"10%", width:"100%", justifyContent:"center", display:"flex",flexDirection:"row"}}>
                {(this.props.notesCamera && !this.props.uploadPicture)?<Button title="Take Picture" onPress={this.takePicture.bind(this)}/>:null}
                {(this.props.notesCamera && this.props.uploadPicture)?<Button title="Save" onPress={this.savePicture }/>:null}
                {this.props.notesDraw?<Button title="Save" onPress={() => { this.refs.sketchRef.saveSketch() }}/>:null}
                {this.props.notesType?<Button title="Save" onPress={this.saveNotesType.bind(this)}/>:null}
                <Button title="Cancel" onPress={this.props.closeNotes}/>
                </View>
            </View>
        );
    }
}
  
const mapStateToProps = state => ({
	appointment: state.appointmentStore.appointment,
	notesType: state.notesStore.notesType,
	notesDraw: state.notesStore.notesDraw,
    notesCamera: state.notesStore.notesCamera,
    notesCategory: state.notesStore.notesCategory,
    uploadPicture: state.notesStore.uploadPicture,
    notesCategory: state.notesStore.notesCategory,
    notesText: state.notesStore.notesText,
    token: state.sessionStore.token
})

const mapDispatchToProps = (dispatch) => ({
	showNotesType: () => { dispatch({ type: 'SHOW_NOTES_TYPE' }) },
	showNotesDraw: () => { dispatch({ type: 'SHOW_NOTES_DRAW' }) },
    showNotesCamera: () => { dispatch({ type: 'SHOW_NOTES_CAMERA' }) },
    setUploadPicture: (path) =>  { dispatch({ type: 'SET_UPLOAD_PICTURE', path:path }) },
	setNotesText: (text) => { dispatch({ type: 'SET_NOTES_TEXT', notesText:text }) },
    uploadComplete: () =>  { dispatch({ type: 'UPLOAD_COMPLETE'}) },
    doReloadDoctorNotes: () =>  { dispatch({ type: 'RELOAD_DOCTOR_NOTES'}) },
    doReloadPatientNotes: () =>  { dispatch({ type: 'RELOAD_PATIENT_NOTES'}) },
    uploadComplete: () =>  { dispatch({ type: 'UPLOAD_COMPLETE'}) },
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes)