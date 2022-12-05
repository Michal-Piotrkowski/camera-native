import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

class MyButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        <View style={styles.container}>
            <TouchableOpacity onPress={() => this.props.testPress()}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'myfont',
                    fontSize: 90
                }}>WIWWIWIW</Text>
            </TouchableOpacity>
            <Text>SSSSS</Text>
        </View>
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
    }
});

export default MyButton;
