import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, FlatList } from 'react-native';
import * as Font from "expo-font";
import MyButton from './MyButton';

class Menu extends Component {
    render() {
        <View style={styles.container}>
            <View>
                <MyButton></MyButton>
                <MyButton></MyButton>
                <MyButton></MyButton>
            </View>
        </View>
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

export default Menu;
