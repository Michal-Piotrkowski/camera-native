import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList} from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        <Image
            style={{
                width: this.props.width,
                height: this.props.height,
                
            }}
            source={{ uri: this.props.uri }}
        />
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
    }
});

export default Item;
