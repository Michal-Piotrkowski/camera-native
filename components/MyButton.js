import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image, Button } from 'react-native';

class MyButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.type == "layout") {
            return (
                <TouchableOpacity onPress={() => this.props.testPress()}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'myfont',
                        fontSize: 28,
                        marginLeft: 20,
                    }}>LAYOUT</Text>
                </TouchableOpacity>
            );
        }
        else if (this.props.type == "camera") {
            return (
                <TouchableOpacity onPress={() => this.props.testPress()}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'myfont',
                        fontSize: 28,
                        marginLeft: 20,
                    }}>CAMERA</Text>
                </TouchableOpacity>
            );
        }
        else if (this.props.type == "delete") {
            return (
                <TouchableOpacity onPress={() => this.props.testPress()}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'myfont',
                        fontSize: 28,
                        marginLeft: 20,
                    }}>DELETE</Text>
                </TouchableOpacity>
            );
        }
        else if (this.props.type == "changeCamera") {
            return (
                <TouchableOpacity onPress={() => this.props.testPress()}>
                    <Image source={require('../assets/switch-camera.png')} style={styles.cameraSwitch}/>
                </TouchableOpacity>
            );
        }
        else if (this.props.type == "takePicture") {
            return (
                <TouchableOpacity onPress={() => this.props.testPress()}>
                    <View style={styles.takePictureButton} title="" onPress={() => this.props.testPress()}></View>
                </TouchableOpacity>
            );
        }
        else if (this.props.type == "Bshare") {
            return (
                <TouchableOpacity onPress={() => this.props.testPress()}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'myfont',
                        fontSize: 28,
                        marginLeft: 20,
                    }}>SHARE</Text>
                </TouchableOpacity>
            );
        }
        else if (this.props.type == "Bdelete") {
            return (
                <TouchableOpacity onPress={() => this.props.testPress()}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'myfont',
                        fontSize: 28,
                        marginLeft: 20,
                    }}>DELETE</Text>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_main: {
        width: 400,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'myfont',
        fontSize: 18,
        color: 'white',
    },
    image: {
        width: 150,
        height: 150,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    cameraSwitch: {
        width: 50,
        height: 50,
        bottom: 0,
    },
    takePictureButton: {
        width: 100,
        height: 100,
        backgroundColor: 'gray',
        opacity: 0.5,
        borderWidth: 5,
        borderRadius: 100, 
        marginRight: 105
    }
});

export default MyButton;
