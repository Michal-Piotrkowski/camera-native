import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList} from 'react-native';
import { Camera } from "expo-camera";
import MyButton from './MyButton';
import * as MediaLibrary from 'expo-media-library';

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,  // typ kamery
        };
    }

    componentDidMount = async () => {
        console.log("WITAM")
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });
    }

    changeCamera(){
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    takePicture = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
            alert(JSON.stringify(asset, null, 4))
        }
    }

    render() {
        console.log("CHUJ")
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return (<View />);
        } else if (hasCameraPermission == false) {
            return (<Text>brak dostępu do kamery</Text>);
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: "flex-end", flexDirection: 'row'}}>
                            <MyButton type="takePicture" testPress={() => this.takePicture()}/>
                            <MyButton type="changeCamera" testPress={() => this.changeCamera()}/>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255, 220, 212)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainText: {
        fontFamily: 'myfont',
        fontSize: 90,
        color: 'rgb(255, 120, 212)'
    },
    image: {
        width: 350,
        height: 350
    }
});

export default CameraScreen;