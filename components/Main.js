import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, FlatList } from 'react-native';
import * as Font from "expo-font";
import { screensEnabled } from 'react-native-screens';
import { AutoFocus } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { fontloaded: false };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../fonts/Staatliches-Regular.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ fontloaded: true })
    }

    render() {
        return (this.state.fontloaded ?
            <View style={styles.container}>
                <Text style={styles.mainText} onPress={() => this.props.navigation.navigate("s2")}>CAM</Text>
                <Image
                    style={styles.image}
                    source={require('../assets/cam.png')}
                    onPress={() => this.props.navigation.navigate("s2")}
                />
                <Text style={styles.mainText} onPress={() => this.props.navigation.navigate("s2")}>APP</Text>
                <Text style={[styles.mainText, { fontSize: 30 }]}>by Miłosz Buba Gołąb</Text>
            </View>
            : null
        );
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
        width: '60%',
        height: '18%'
    }
});

export default Main;
