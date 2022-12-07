import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList} from 'react-native';
import { Camera } from "expo-camera";
import MyButton from './MyButton';
import * as MediaLibrary from 'expo-media-library';
import { BackHandler } from "react-native"
import { Dimensions} from "react-native";
import { Animated } from "react-native";
import { ScrollView } from 'react-native';
import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,  // typ kamery
            pos: new Animated.Value(Dimensions.get("window").height),
            ratio:null,
            wb:'auto',
            ps:null,
            fm:'auto',
            sizes:null,
            options:[]
        };
    }

    componentDidMount = async () => {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = async() => {
        await this.props.route.params.refresh()
        this.props.navigation.goBack()
    }

    getSizes = async (ratio) => {
      if (this.camera) {
          const sizes = await this.camera.getAvailablePictureSizesAsync(ratio)
          let fm = Object.keys(Camera.Constants.FlashMode);
          let wb = Object.keys(Camera.Constants.WhiteBalance);
          this.setState({
              options:[{"ratio":['16:9','4:3']},{"FlashMode":fm},{'WhiteBalance':wb},{'sizes': sizes}],
          })
      }
    };

    setOptions = (optionName,optionToSet)=>{
        if(optionName=="ratio"){
            this.getSizes(optionToSet)
            this.setState({ratio:optionToSet})
        }else if(optionName=="FlashMode"){
            this.setState({fm:optionToSet})
        }else if(optionName=="WhiteBalance"){
            this.setState({wb:optionToSet})
        }else if(optionName=="sizes"){
            this.setState({ps:optionToSet})
        }
    }

    toggle() {
        let toPos=0;
        if (this.isHidden) toPos = 0; else toPos = Dimensions.get("window").height
        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver:true
            }
        ).start();
        this.isHidden = !this.isHidden;
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
                        onCameraReady={() => {                           
                            this.getSizes('16:9')      
                            this.setState({ratio:'16:9', wb:'auto', fm:"auto"})
                            console.log(this.state.options)
                        }}
                        getSizes={this.state.ratio}
                        ratio={this.state.ratio}
                        whiteBalance={this.state.wb}
                        pictureSize={this.state.ps}
                        flashMode={this.state.fm}
                        style={
                            [{flex: 1},
                            this.state.ratio == "16:9"
                            ?
                            {height: Dimensions.get("window").width * 16/9, width: Dimensions.get("window").width}
                            :
                            {height: Dimensions.get("window").width * 4/3 , width: Dimensions.get("window").width}]
                        }
                        type={this.state.type}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: "flex-end", flexDirection: 'row'}}>
                            <Animated.View
                                style={[
                                    styles.animatedView,
                                    {
                                        transform: [
                                            { translateY: this.state.pos }
                                        ]
                                    }]} >
                                    <Text title="start" style={styles.button} onPress={() => { this.toggle() }}>SETTINGS</Text>
                                    {
                                        this.state.options.length>0?
                                        <ScrollView>
                                            <RadioGroup data={this.state.options[0].ratio} title={"ratio"} onPress={this.setOptions}  />
                                            <RadioGroup data={this.state.options[1].FlashMode} title={"FlashMode"} onPress={this.setOptions}  />
                                            <RadioGroup data={this.state.options[2].WhiteBalance} title={"WhiteBalance"} onPress={this.setOptions}  />
                                            <RadioGroup data={this.state.options[3].sizes} title={"sizes"} onPress={this.setOptions}  />
                                            <Text title="start" style={styles.button} onPress={() => { this.toggle() }}>SETTINGS</Text>
                                        </ScrollView>:
                                        <Text>Wait...</Text>
                                    }
                            </Animated.View>
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
    },
    button: {
        fontSize: 20,
        marginLeft: 20,
        color: 'white',
    }
});

export default CameraScreen;