import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Image, ScrollView, Button, TextInput, Text } from 'react-native';
import MediqText from '../components/MediqText.js';
import Camera from 'react-native-camera';
import Sketch from 'react-native-sketch';
import { connect } from 'react-redux';
import SketchView from 'react-native-sketch-view';
import { RNS3 } from 'react-native-aws3';


const sketchViewConstants = SketchView.constants;

class UploadPicture extends Component {
    
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

    savePicture(){
                // TODO: Filename
        this.uploadNotes("notesPicture", this.props.uploadPicture);
        this.props.closeNotes();
    }
    
    onSketchSave(saveEvent) {
        // TODO: Filename
        this.uploadNotes("notesDraw",saveEvent.localFilePath);
        this.props.closeNotes();
        //this.props.onSave && this.props.onSave(saveEvent);
    }
    

    uploadNotes(name, path) {
        const file = {
            // `uri` can also be a file system path (i.e. file://)
            uri: path,
            name: name,
            type: "image/png"
          }
          
          const options = {
            keyPrefix: "uploads/",
            bucket: "mediq-assets",
            region: "ap-southeast-1",
            accessKey: "AKIAJPFJS6OMBTM5VUDA",
            secretKey: "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",
            successActionStatus: 201
          }
          
          RNS3.put(file, options).then(response => {
            if (response.status !== 201){
                alert(JSON.stringify(response));
              throw new Error("Failed to upload image to S3");
            }
            //alert(response.body);
            this.props.uploadComplete();
            /**
             * {
             *   postResponse: {
             *     bucket: "your-bucket",
             *     etag : "9f620878e06d28774406017480a59fd4",
             *     key: "uploads/image.png",
             *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
             *   }
             * }
             */
          });
    }

    render(){
        return (
            <View style={{width:"100%", height:"100%"}}>
                <View style={{flexDirection:"row", height:"10%"}}>
                    <View style={{width:"50%", alignItems:"center", justifyContent:"center", padding:5}}>
                    <TouchableWithoutFeedback onPress={this.props.showNotesCamera}><Image style={{height:30, width:30}} resizeMode="center" source={require('../img/camera.png')}/></TouchableWithoutFeedback>
                    </View>
                    <View style={{width:"50%", alignItems:"center", justifyContent:"center", padding:5}}>
                    <TouchableWithoutFeedback onPress={this.props.showNotesUpload}><Image style={{height:30, width:30}} resizeMode="center" source={require('../img/camera.png')}/></TouchableWithoutFeedback>
                    </View>
                </View>
                {this.props.notesType?<ScrollView style={{paddingLeft:10,paddingRight:10, height:"80%", width:"100%"}}>
                    <TextInput autoFocus={true} multiline={true} style={{width:"100%", height:"100%", fontSize:20}}>{this.props.notes}</TextInput>
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
                onSaveSketch={this.onSketchSave.bind(this)}
                localSourceImagePath={this.props.localSourceImagePath}/>
                </View>:null}
                <View style={{height:"10%", width:"100%", justifyContent:"center"}}>
                {(this.props.notesCamera && !this.props.uploadPicture)?<Button title="Take Picture" onPress={this.takePicture.bind(this)}/>:null}
                {(this.props.notesCamera && this.props.uploadPicture)?<Button title="Save" onPress={this.savePicture.bind(this) }/>:null}
                {this.props.notesDraw?<Button title="Save" onPress={() => { this.refs.sketchRef.saveSketch() }}/>:null}
                    <Button title="Cancel" onPress={this.props.closeNotes}/>
                </View>
            </View>
        );
    }
}
  
const mapStateToProps = state => ({
	notesType: state.appointmentStore.notesType,
	notesDraw: state.appointmentStore.notesDraw,
    notesCamera: state.appointmentStore.notesCamera,
    uploadPicture: state.appointmentStore.uploadPicture
})

const mapDispatchToProps = (dispatch) => ({
	showNotesType: () => { dispatch({ type: 'SHOW_NOTES_TYPE' }) },
	showNotesDraw: () => { dispatch({ type: 'SHOW_NOTES_DRAW' }) },
    showNotesCamera: () => { dispatch({ type: 'SHOW_NOTES_CAMERA' }) },
    setUploadPicture: (path) =>  { dispatch({ type: 'SET_UPLOAD_PICTURE', path:path }) },
    uploadComplete: () =>  { dispatch({ type: 'UPLOAD_COMPLETE'}) },
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadPicture)